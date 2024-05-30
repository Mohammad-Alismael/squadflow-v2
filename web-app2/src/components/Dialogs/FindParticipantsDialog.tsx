import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Title from "@/app/(app)/workspaces/[workspaceId]/components/taskSections/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Participant from "@/app/(app)/workspaces/components/Participant";
import { CommunityResponse } from "@/utils/@types/community";
import ParticipantsList from "@/components/Dialogs/components/ParticipantsList";

function FindParticipantsDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">find participants</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ParticipantsList />
      </DialogContent>
    </Dialog>
  );
}

export default FindParticipantsDialog;
