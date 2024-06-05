import { create } from "zustand";
import { PopulatedUser } from "@/utils/@types/user";
import { WorkspaceLabel } from "@/utils/@types/workspace";
import { ICommentCreate } from "@/utils/@types/task";

interface Task {
  taskId: string;
  title: string;
  // Add other properties as needed
}

interface State {
  taskId: string;
  projectId: string;
  columnId: string;
  title: string;
  description: string;
  taskDate: string;
  endTime: string;
  column: string;
  priority: string;
  participants: PopulatedUser[];
  labels: WorkspaceLabel[];
  subTasks: Task[];
  attachments: string[];
  comments: ICommentCreate[];
}

interface Actions {
  setTaskId: (payload: string) => void;
  setProjectId: (payload: string) => void;
  setColumnId: (payload: string) => void;
  setTitle: (payload: string) => void;
  setDescription: (payload: string) => void;
  setTaskDate: (payload: string) => void;
  setEndTime: (payload: string) => void;
  setColumn: (payload: string) => void;
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
  setComments: (payload: ICommentCreate[]) => void;
  addComment: (newComment: ICommentCreate) => void;
  resetState: () => void;
  updateSubTask: (updatedSubTask: Task) => void;
  removeSubTask: (selectedTaskId: string) => void;
}

const initialState: State = {
  taskId: "",
  projectId: "",
  columnId: "",
  title: "task title",
  description: "task description",
  taskDate: "",
  endTime: "",
  column: "",
  priority: "low",
  participants: [],
  labels: [],
  subTasks: [],
  attachments: [],
  comments: [],
};

const handleAddParticipant = (
  existingParticpants: State["participants"],
  newParticipant: PopulatedUser
) => {
  return [...existingParticpants, newParticipant];
};

const handleRemoveParticipant = (
  existingParticpants: State["participants"],
  newParticipant: PopulatedUser
) => {
  return existingParticpants.filter((item) => item._id !== newParticipant._id);
};

const handleRemoveLabel = (
  existingLabels: State["labels"],
  newlabel: WorkspaceLabel
) => {
  return existingLabels.filter((item) => item._id !== newlabel._id);
};

const handleAddLabel = (
  existingLabels: State["labels"],
  newlabel: WorkspaceLabel
) => {
  return [...existingLabels, newlabel];
};

const useTaskPropertiesStore = create<State & Actions>((set) => ({
  ...initialState,
  setTaskId: (payload) => set({ taskId: payload }),
  setProjectId: (payload) => set({ projectId: payload }),
  setColumnId: (payload) => set({ columnId: payload }),
  setTitle: (payload) => set({ title: payload }),
  setDescription: (payload) => set({ description: payload }),
  setTaskDate: (payload) => set({ taskDate: payload }),
  setEndTime: (payload) => set({ endTime: payload }),
  setColumn: (payload) => set({ column: payload }),
  setPriority: (payload) => set({ priority: payload }),
  setParticipants: (payload) => set({ participants: payload }),
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
  setLabels: (payload) => set({ labels: payload }),
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
  setSubTasks: (payload) => set({ subTasks: payload }),
  addSubTasks: (newSubTask) =>
    set((state) => ({ subTasks: [...state.subTasks, newSubTask] })),
  setAttachments: (payload) => set({ attachments: payload }),
  setComments: (payload) => set({ comments: payload }),
  addComment: (newComment) =>
    set((state) => ({ comments: [...state.comments, newComment] })),
  resetState: () => set(initialState),
  updateSubTask: (updatedSubTask) => {
    set((state) => ({
      subTasks: state.subTasks.map((task) => {
        if (task.taskId === updatedSubTask.taskId) {
          return { ...task, ...updatedSubTask }; // Update the specific subTask
        }
        return task; // Return unchanged subTask if it's not the one being updated
      }),
    }));
  },
  removeSubTask: (selectedTaskId) => {
    set((state) => ({
      subTasks: state.subTasks.filter((task) => task.taskId !== selectedTaskId),
    }));
  },
}));

interface TaskSelectors {
  getTaskId: () => string;
  getProjectId: () => string;
  getColumnId: () => string;
  getTitle: () => string;
  getDescription: () => string;
  getTaskDate: () => string;
  getEndTime: () => string;
  getColumn: () => string;
  getPriority: () => string;
  getParticipants: () => PopulatedUser[];
  getLabels: () => WorkspaceLabel[];
  getSubTasks: () => Task[];
  getAttachments: () => string[];
  getComments: () => ICommentCreate[];
}

const useTaskSelectors = (
  useStore: typeof useTaskPropertiesStore
): TaskSelectors => ({
  getTaskId: () => useStore.getState().taskId,
  getProjectId: () => useStore.getState().projectId,
  getColumnId: () => useStore.getState().columnId,
  getTitle: () => useStore.getState().title,
  getDescription: () => useStore.getState().description,
  getTaskDate: () => useStore.getState().taskDate,
  getEndTime: () => useStore.getState().endTime,
  getColumn: () => useStore.getState().column,
  getPriority: () => useStore.getState().priority,
  getParticipants: () => useStore.getState().participants,
  getLabels: () => useStore.getState().labels,
  getSubTasks: () => useStore.getState().subTasks,
  getAttachments: () => useStore.getState().attachments,
  getComments: () => useStore.getState().comments,
});

export { useTaskPropertiesStore, useTaskSelectors };
