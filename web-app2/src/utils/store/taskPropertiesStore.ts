import { create } from "zustand";

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
  participants: string[];
  labels: string[];
  subTasks: Task[];
  attachments: string[];
  comments: string[];
  setTaskId: (payload: string) => void;
  setProjectId: (payload: string) => void;
  setColumnId: (payload: string) => void;
  setTitle: (payload: string) => void;
  setDescription: (payload: string) => void;
  setTaskDate: (payload: string) => void;
  setEndTime: (payload: string) => void;
  setColumn: (payload: string) => void;
  setPriority: (payload: string) => void;
  setParticipants: (payload: string[]) => void;
  setLabels: (payload: string[]) => void;
  setSubTasks: (payload: Task[]) => void;
  addSubTasks: (newSubTask: Task) => void;
  setAttachments: (payload: string[]) => void;
  setComments: (payload: string[]) => void;
  addComment: (newComment: string) => void;
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
  setTaskId: () => {},
  setProjectId: () => {},
  setColumnId: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setTaskDate: () => {},
  setEndTime: () => {},
  setColumn: () => {},
  setPriority: () => {},
  setParticipants: () => {},
  setLabels: () => {},
  setSubTasks: () => {},
  addSubTasks: () => {},
  setAttachments: () => {},
  setComments: () => {},
  addComment: () => {},
  resetState: () => {},
  updateSubTask: () => {},
  removeSubTask: () => {},
};

const useTaskPropertiesStore = create<State>((set) => ({
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
  setLabels: (payload) => set({ labels: payload }),
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
  getParticipants: () => string[];
  getLabels: () => string[];
  getSubTasks: () => Task[];
  getAttachments: () => string[];
  getComments: () => string[];
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
