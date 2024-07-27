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

import FindParticipantsList from "@/components/Dialogs/components/FindParticipantsList";

function FindParticipantsDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-80 md:w-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">find participants</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FindParticipantsList />
      </DialogContent>
    </Dialog>
  );
}

export default FindParticipantsDialog;
