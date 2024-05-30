import { create } from "zustand";

type Participant = {
  user: string;
  role: "admin" | "editor" | "viewer";
};
interface State {
  participants: Participant[];
}

interface Actions {
  addParticipant(participant: Participant): void;
  removeParticipant(participantId: string): void;
  changeRole(participant: Participant): void;
}

const initialState: State = {
  participants: [],
};

const handleAddParticipant = (
  existingParticipants: State["participants"],
  participant: Participant
) => {
  return [...existingParticipants, participant];
};

const handleRemoveParticipant = (
  existingParticipants: State["participants"],
  participantId: string
) => {
  return existingParticipants.filter((item) => item.user !== participantId);
};

const handleChangeRole = (
  existingParticipants: State["participants"],
  participant: Participant
) => {
  return existingParticipants.map((item) => {
    if (item.user === participant.user)
      return { ...item, role: participant.role };
    else return item;
  });
};

const workspaceParticipantStore = create<State & Actions>((set) => ({
  ...initialState,
  addParticipant: (participant) =>
    set((state) => ({
      ...state,
      participants: handleAddParticipant(state.participants, participant),
    })),
  removeParticipant: (participant) =>
    set((state) => ({
      ...state,
      participants: handleRemoveParticipant(state.participants, participant),
    })),
  changeRole: (participant) =>
    set((state) => ({
      ...state,
      participants: handleChangeRole(state.participants, participant),
    })),
}));

export { workspaceParticipantStore };
