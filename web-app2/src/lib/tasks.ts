import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/task";
import { ObjectId } from "mongodb";
import {
  IDashboardTask,
  ITask,
  ITaskAction,
  TaskResponse,
} from "@/utils/@types/task";
import CustomError from "@/utils/CustomError";
import { HttpStatusCode } from "@/utils/HttpStatusCode";

async function init() {
  await connectMongoDB();
}
const createTask = async ({
  workspace,
  title,
  columnId,
  participants,
  comments,
  labels,
  dueDate,
  dueTime,
  priority,
  description,
  attachments,
  created_by,
}: ITask | ITaskAction) => {
  await init();
  try {
    // Create the task
    const task = await Task.create({
      workspace,
      title,
      columnId,
      participants,
      comments,
      labels,
      dueDate,
      dueTime,
      priority,
      description,
      attachments,
      created_by,
      updated_by: created_by,
    });

    // Return the created task
    console.log("new task created", task?._id);
    return task?._id;
  } catch (error) {
    // Handle error
    console.error("Error creating task:", error);
    throw new CustomError(
      "Failed to create task",
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

async function getTaskId(taskId: ObjectId) {
  await init(); // Assuming this is your initialization function
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new CustomError("Task ID not found", 404);
  }
  return task;
}

async function updateColumnId(taskId: ObjectId, columnId: ObjectId) {
  await init(); // Assuming this is your initialization function
  const result = await Task.updateOne({ _id: taskId }, { $set: { columnId } });

  if (result.matchedCount === 0) {
    throw new CustomError("Task ID not found", 404);
  }

  if (result.modifiedCount === 0) {
    throw new CustomError("Update failed, column ID might be the same", 400);
  }

  return result.modifiedCount;
}

async function getTaskIdPopulated(taskId: ObjectId) {
  await init();
  const task = (await Task.findOne({ _id: taskId })
    .populate({
      path: "participants",
      select: "_id username email photoURL",
    })
    .populate({
      path: "comments.created_by",
      select: "_id username email photoURL",
    })
    .lean()
    .exec()) as TaskResponse;
  if (!task) {
    throw new CustomError("Task ID not found", 404);
  }
  return task;
}

async function getTasksByWorkspaceId(workspaceId: ObjectId) {
  await init();
  return Task.find({ workspace: workspaceId })
    .populate({
      path: "participants",
      select: "_id username email photoURL",
    })
    .lean();
}

async function getMetaTasksByWorkspaceId(workspaceId: ObjectId) {
  await init();
  return Task.find({ workspace: workspaceId })
    .select(
      "_id workspace title columnId dueDate participants labels._id labels.color commentsCount"
    )
    .populate({
      path: "participants",
      select: "_id username photoURL",
      options: { limit: 5 },
    });
}

async function getTasksByWorkspaceIdForCalendar(workspaceId: ObjectId) {
  await init();
  return Task.find({ workspace: workspaceId })
    .populate({
      path: "workspace",
      select: "title",
    })
    .select("_id title workspace dueDate");
}

async function getTasksByWorkspaceIdAndColumnId(
  workspaceId: ObjectId,
  columnId: ObjectId
) {
  await init();
  return Task.find({ $and: [{ workspace: workspaceId }, { columnId }] });
}

async function deleteTasksByWorkspaceId(workspaceId: ObjectId) {
  await init();
  const { deletedCount } = await Task.deleteMany({ workspace: workspaceId });
  return deletedCount;
}

const updateTask = async (taskId: string, updateData: any) => {
  await init();
  try {
    return await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });
  } catch (error) {
    // Handle error
    console.error("Error updating task:", error);
    throw new CustomError(
      "Failed to update task",
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

// Function to delete a task
const deleteTask = async (taskId: ObjectId) => {
  try {
    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // Return the deleted task
    return deletedTask;
  } catch (error) {
    // Handle error
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};

const getAllTasksCreatedByUserOrParticipated = async (
  userId: ObjectId,
  communityId: ObjectId,
  workspaceId: ObjectId | null,
  page: number = 1,
  limit: number = 10
): Promise<{ data: IDashboardTask[]; count: number }> => {
  await init();
  try {
    const query: any = {
      $or: [{ created_by: userId }, { participants: userId }],
    };

    // If workspaceId is provided, add it to the query
    if (workspaceId) {
      query.workspace = workspaceId;
    }
    const totalTasks = await Task.countDocuments(query);
    const tasks = (await Task.find(query)
      .populate({
        path: "workspace",
        match: {
          $and: [{ community: communityId }, { "participants.user": userId }],
        },
        select: "_id title",
      })
      .select("_id workspace title participants labels._id labels.color")
      .populate({
        path: "participants",
        select: "_id username email photoURL",
        options: { limit: 5 },
      })
      .lean()
      .skip((page - 1) * limit) // Skip to the appropriate page
      .limit(limit)
      .exec()) as IDashboardTask[];

    // Filter out tasks that do not have a populated workspace
    const filteredTasks = tasks.filter((task) => task.workspace !== null);
    return { data: filteredTasks, count: totalTasks };
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error(error.message);
  }
};

const getAllTasksCreatedByUserOrParticipatedCount = async (
  userId: ObjectId,
  communityId: ObjectId
) => {
  await init();
  try {
    const totalTasks = await Task.countDocuments(
      {
        $or: [{ created_by: userId }, { participants: userId }],
        // "workspace.community": communityId,
        // "workspace.participants.user": userId,
      },
      { hint: "_id_" }
    );
    return totalTasks;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error(error.message);
  }
};

const getAllTasksCreatedParticipated = async (
  userId: ObjectId,
  communityId: ObjectId,
  workspaceId: ObjectId | null,
  page: number = 1,
  limit: number = 10
) => {
  await init();
  try {
    const query: any = {
      $and: [{ participants: userId }],
    };
    if (workspaceId) {
      query.$and.push({ workspace: workspaceId });
    }
    const totalTasks = await Task.countDocuments(query);
    const tasks = (await Task.find(query)
      .populate({
        path: "workspace",
        match: {
          $and: [{ community: communityId }, { "participants.user": userId }],
        },
        select: "_id title",
      })
      .select("_id workspace title participants labels._id labels.color")
      .populate({
        path: "participants",
        select: "_id username email photoURL",
        options: { limit: 5 },
      })
      .lean()
      .skip((page - 1) * limit) // Skip to the appropriate page
      .limit(limit)
      .exec()) as IDashboardTask[];

    // Filter out tasks that do not have a populated workspace
    const filteredTasks = tasks.filter((task) => task.workspace !== null);
    return { data: filteredTasks, count: totalTasks };
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error(error.message);
  }
};

const getAllTasksDeadLineByToday = async (
  userId: ObjectId,
  communityId: ObjectId,
  page: number = 1,
  limit: number = 10
) => {
  await init();
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  try {
    const query: any = {
      dueDate: formattedToday,
    };
    const totalTasks = await Task.countDocuments(query);
    const tasks = (await Task.find(query)
      .populate({
        path: "workspace",
        match: {
          $and: [{ community: communityId }, { "participants.user": userId }],
        },
        select: "_id title",
      })
      .select("_id workspace title participants labels._id labels.color")
      .populate({
        path: "participants",
        select: "_id username email photoURL",
        options: { limit: 5 },
      })
      .lean()
      .skip((page - 1) * limit) // Skip to the appropriate page
      .limit(limit)
      .exec()) as IDashboardTask[];

    // Filter out tasks that do not have a populated workspace
    const filteredTasks = tasks.filter((task) => task.workspace !== null);
    return { data: filteredTasks, count: totalTasks };
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error(error.message);
  }
};

async function getCommentsTaskId(taskId: ObjectId) {
  await init();
  try {
    const result = (await Task.findById(taskId)
      .populate({
        path: "comments.user",
        select: "_id username email",
      })
      .exec()) as ITask;

    if (!result) throw new Error("task Id doesn't exists");
    return result.comments;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

const addCommentToTask = async (
  taskId: string,
  comment: ITask["comments"][0]
) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId },
      { $push: { comments: comment } },
      { new: true }
    );
    return task._id;
  } catch (error) {
    // Handle error
    console.error("Error deleting task:", error);
    throw new CustomError(
      "Failed to delete task",
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

export {
  createTask,
  getTaskId,
  updateTask,
  deleteTask,
  addCommentToTask,
  getCommentsTaskId,
  deleteTasksByWorkspaceId,
  getTasksByWorkspaceId,
  getTasksByWorkspaceIdAndColumnId,
  getTaskIdPopulated,
  getTasksByWorkspaceIdForCalendar,
  getAllTasksCreatedByUserOrParticipated,
  getAllTasksCreatedParticipated,
  updateColumnId,
  getAllTasksDeadLineByToday,
  getAllTasksCreatedByUserOrParticipatedCount,
  getMetaTasksByWorkspaceId,
};
