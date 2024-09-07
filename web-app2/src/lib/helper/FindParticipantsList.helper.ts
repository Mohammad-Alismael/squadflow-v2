import { Participant } from "@/utils/store/workspaceParticipantStore";
import { CommunityResponse } from "@/utils/@types/community";

export const filterParticipantsByKeyword = (
  participants: CommunityResponse["participants"],
  keyword: string
) => {
  return participants.filter((participant) =>
    participant.user.username.includes(keyword)
  );
};

export const isParticipantIncluded = (
  participants: Participant[],
  participantId: string
) => {
  return participants.map((item) => item.user).includes(participantId);
};

export const getParticipantRole = (
  participants: Participant[],
  participantId: string
) => {
  const userFound = participants.find((item) => item.user === participantId);
  return userFound ? userFound.role : "viewer";
};
