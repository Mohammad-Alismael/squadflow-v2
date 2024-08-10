import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateCommunityDialog from "@/components/Dialogs/CreateCommunityDialog";
import JoinCommunityForm from "@/app/(app)/settings/components/JoinCommunityForm";

function JoinCommunityDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-80 sm:w-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">join community</DialogTitle>
          <DialogDescription>
            if you would like to create your own community,{" "}
            <CreateCommunityDialog>
              <span className="font-bold text-black cursor-pointer">
                click here.
              </span>
            </CreateCommunityDialog>
          </DialogDescription>
        </DialogHeader>
        <JoinCommunityForm />
      </DialogContent>
    </Dialog>
  );
}

export default JoinCommunityDialog;
