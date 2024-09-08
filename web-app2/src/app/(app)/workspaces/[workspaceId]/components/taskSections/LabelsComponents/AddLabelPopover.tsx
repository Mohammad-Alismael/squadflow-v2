"use client";
import React, { ReactNode, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateLabelWorkspace } from "@/utils/hooks/workspace/useCreateLabelWorkspace";
import { useParams } from "next/navigation";
function AddLabelPopover({ children }: { children: ReactNode }) {
  const { workspaceId } = useParams();

  const { createMutation, isLoading } = useCreateLabelWorkspace(
    workspaceId as string
  );
  const [color, setColor] = useState("");
  const [text, setText] = useState("");
  const handleClick = async () => {
    createMutation({ color: color, title: text });
  };
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <Label className="capitalize mb-2">select label color</Label>
        <Input type="color" onChange={(e) => setColor(e.target.value)} />
        <Label className="capitalize mb-2">label label text</Label>
        <Input
          type="text"
          placeholder="label text"
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleClick} disabled={isLoading}>
          {isLoading ? "loading ..." : "submit"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default AddLabelPopover;
