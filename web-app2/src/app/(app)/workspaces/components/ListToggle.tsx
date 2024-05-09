"use client";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { redirectToggle } from "@/app/(app)/workspaces/actions";
import { LayoutGridIcon, ListIcon } from "lucide-react";

function ListToggle() {
  return (
    <>
      <ToggleGroup type="single" className="bg-white rounded">
        <ToggleGroupItem
          aria-label="Toggle list view"
          value="list"
          onClick={() => redirectToggle("list")}
        >
          <ListIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Toggle cards view"
          value="cards"
          onClick={() => redirectToggle("cards")}
        >
          <LayoutGridIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}

export default ListToggle;
