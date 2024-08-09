import { create } from "zustand";

type DialogStoreState = {
  isOpen: boolean;
  open: (status: boolean) => void;
};

export const useDialog = create<DialogStoreState>((set) => ({
  isOpen: true,
  open: (status) => set((state) => ({ isOpen: status })),
}));
