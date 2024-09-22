"use client";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGridIcon, ListIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function ListToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: string) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);

    // Set the new value for "messageKeyword"
    params.set("view", e);
    router.replace(`/workspaces?${params.toString()}`);
  };
  return (
    <>
      <ToggleGroup type="single" className="bg-white rounded">
        <ToggleGroupItem
          aria-label="Toggle list view"
          value="list"
          onClick={() => handleChange("list")}
        >
          <ListIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          aria-label="Toggle cards view"
          value="cards"
          onClick={() => handleChange("cards")}
        >
          <LayoutGridIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}

export default ListToggle;
