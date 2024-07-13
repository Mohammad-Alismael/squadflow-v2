import { create } from "zustand";
import { PopulatedUser } from "@/utils/@types/user";

export interface Participant {
  user: string;
  role: "admin" | "editor" | "viewer";
}
interface ParticipantWorkspace extends Participant {
  _id: string;
}
interface State {
  participants: Participant[];
}

interface Actions {
  addParticipant(participant: Participant): void;
  setParticipants(participants: ParticipantWorkspace[]): void;
  removeParticipant(participantId: string): void;
  changeRole(participant: Participant): void;
  reset(): void;
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
const handleSetParticipants = (participants: ParticipantWorkspace[]) => {
  console.log({ participants });
  return participants.map((participant) => ({
    user: participant.user,
    role: participant.role,
  }));
};

const workspaceParticipantStore = create<State & Actions>((set) => ({
  ...initialState,
  addParticipant: (participant) =>
    set((state) => ({
      ...state,
      participants: handleAddParticipant(state.participants, participant),
    })),
  setParticipants: (participants) =>
    set((state) => ({
      ...state,
      participants: handleSetParticipants(participants),
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
  reset: () => set(initialState),
}));

export { workspaceParticipantStore };
