import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PopulatedUser } from "@/utils/@types/user";
import { WorkspaceLabel } from "@/utils/@types/workspace";
import { Comment } from "@/utils/@types/task";
import { shallow } from "zustand/shallow";

interface Task {
  taskId: string;
  title: string;
  // Add other properties as needed
}

export interface ITaskState {
  taskId: string;
  projectId: string;
  columnId: string;
  title: string;
  description: string;
  taskDate: string;
  endTime: string;
  priority: string;
  participants: PopulatedUser[];
  labels: WorkspaceLabel[];
  subTasks: Task[];
  attachments: string[];
  comments: Comment[];
}

interface Actions {
  setTaskId: (payload: string) => void;
  setProjectId: (payload: string) => void;
  setColumnId: (payload: string) => void;
  setTitle: (payload: string) => void;
  setDescription: (payload: string) => void;
  setTaskDate: (payload: string) => void;
  setEndTime: (payload: string) => void;
  setPriority: (payload: string) => void;
  setParticipants: (payload: PopulatedUser[]) => void;
  addParticipant: (payload: PopulatedUser) => void;
  removeParticipant: (payload: PopulatedUser) => void;
  setLabels: (payload: WorkspaceLabel[]) => void;
  addLabel: (payload: WorkspaceLabel) => void;
  removeLabel: (payload: WorkspaceLabel) => void;
  setSubTasks: (payload: Task[]) => void;
  addSubTasks: (newSubTask: Task) => void;
  setAttachments: (payload: string[]) => void;
  setComments: (payload: Comment[]) => void;
  addComment: (newComment: Comment) => void;
  resetState: () => void;
  resetCustomState: (customState?: Partial<ITaskState>) => void;
  updateSubTask: (updatedSubTask: Task) => void;
  removeSubTask: (selectedTaskId: string) => void;
}

const initialState: ITaskState = {
  taskId: "",
  projectId: "",
  columnId: "",
  title: "task title",
  description: "task description",
  taskDate: "",
  endTime: "",
  priority: "low",
  participants: [],
  labels: [],
  subTasks: [],
  attachments: [],
  comments: [],
};

const handleAddParticipant = (
  existingParticpants: ITaskState["participants"],
  newParticipant: PopulatedUser
) => {
  return [...existingParticpants, newParticipant];
};

const handleRemoveParticipant = (
  existingParticpants: ITaskState["participants"],
  newParticipant: PopulatedUser
) => {
  return existingParticpants.filter((item) => item._id !== newParticipant._id);
};

const handleRemoveLabel = (
  existingLabels: ITaskState["labels"],
  newlabel: WorkspaceLabel
) => {
  return existingLabels.filter((item) => item._id !== newlabel._id);
};

const handleAddLabel = (
  existingLabels: ITaskState["labels"],
  newlabel: WorkspaceLabel
) => {
  return [...existingLabels, newlabel];
};

const useTaskPropertiesStore = create<ITaskState & Actions>()(
  devtools(
    (set) => ({
      ...initialState,
      setTaskId: (payload) => set((state) => ({ ...state, taskId: payload })),
      setProjectId: (payload) =>
        set((state) => ({ ...state, projectId: payload })),
      setColumnId: (payload) =>
        set((state) => ({ ...state, columnId: payload })),
      setTitle: (payload) => set((state) => ({ ...state, title: payload })),
      setDescription: (payload) =>
        set((state) => ({ ...state, description: payload })),
      setTaskDate: (payload) =>
        set((state) => ({ ...state, taskDate: payload })),
      setEndTime: (payload) => set((state) => ({ ...state, endTime: payload })),
      setPriority: (payload) =>
        set((state) => ({ ...state, priority: payload })),
      setParticipants: (payload) =>
        set((state) => ({ ...state, participants: payload })),
      addParticipant: (payload) =>
        set((state) => ({
          ...state,
          participants: handleAddParticipant(state.participants, payload),
        })),
      removeParticipant: (payload) =>
        set((state) => ({
          ...state,
          participants: handleRemoveParticipant(state.participants, payload),
        })),
      setLabels: (payload) => set((state) => ({ ...state, labels: payload })),
      addLabel: (payload) =>
        set((state) => ({
          ...state,
          labels: handleAddLabel(state.labels, payload),
        })),
      removeLabel: (payload) =>
        set((state) => ({
          ...state,
          labels: handleRemoveLabel(state.labels, payload),
        })),
      setSubTasks: (payload) =>
        set((state) => ({ ...state, subTasks: payload })),
      addSubTasks: (newSubTask) =>
        set((state) => ({
          ...state,
          subTasks: [...state.subTasks, newSubTask],
        })),
      setAttachments: (payload) =>
        set((state) => ({ ...state, attachments: payload })),
      setComments: (payload) =>
        set((state) => ({ ...state, comments: payload })),
      addComment: (newComment) =>
        set((state) => ({
          ...state,
          comments: [...state.comments, newComment],
        })),
      resetState: () => set(initialState),
      resetCustomState: (customState) =>
        set((state) => ({ ...initialState, ...customState })),
      updateSubTask: (updatedSubTask) => {
        set((state) => ({
          ...state,
          subTasks: state.subTasks.map((task) => {
            if (task.taskId === updatedSubTask.taskId) {
              return { ...task, ...updatedSubTask };
            }
            return task;
          }),
        }));
      },
      removeSubTask: (selectedTaskId) => {
        set((state) => ({
          ...state,
          subTasks: state.subTasks.filter(
            (task) => task.taskId !== selectedTaskId
          ),
        }));
      },
    }),
    {
      enabled: true,
      name: "useTaskPropertiesStore",
    }
  )
);

interface TaskSelectors {
  getTaskId: () => string;
  getProjectId: () => string;
  getColumnId: () => string;
  getTitle: () => string;
  getDescription: () => string;
  getTaskDate: () => string;
  getEndTime: () => string;
  getPriority: () => string;
  getParticipants: () => PopulatedUser[];
  getLabels: () => WorkspaceLabel[];
  getSubTasks: () => Task[];
  getAttachments: () => string[];
  getComments: () => Comment[];
}

const useTaskSelectors = (
  useStore: typeof useTaskPropertiesStore
): TaskSelectors => ({
  getTaskId: () => useStore((state) => state.taskId, shallow),
  getProjectId: () => useStore((state) => state.projectId, shallow),
  getColumnId: () => useStore((state) => state.columnId, shallow),
  getTitle: () => useStore((state) => state.title, shallow),
  getDescription: () => useStore((state) => state.description, shallow),
  getTaskDate: () => useStore((state) => state.taskDate, shallow),
  getEndTime: () => useStore((state) => state.endTime, shallow),
  getPriority: () => useStore((state) => state.priority, shallow),
  getParticipants: () => useStore((state) => state.participants, shallow),
  getLabels: () => useStore((state) => state.labels, shallow),
  getSubTasks: () => useStore((state) => state.subTasks, shallow),
  getAttachments: () => useStore((state) => state.attachments, shallow),
  getComments: () => useStore((state) => state.comments, shallow),
});

export { useTaskPropertiesStore, useTaskSelectors };
