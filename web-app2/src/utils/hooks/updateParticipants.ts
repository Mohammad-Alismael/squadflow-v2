import { workspaceParticipantStore } from "@/utils/store/workspaceParticipantStore";
import { useEffect } from "react";

export const useUpdateParticipants = (form: any) => {
  const joinedParticipants = workspaceParticipantStore(
    (state) => state.participants
  );
  useEffect(() => {
    form.setValue("participants", joinedParticipants);
  }, [joinedParticipants.map((i) => i.user)]);
  return joinedParticipants;
};
