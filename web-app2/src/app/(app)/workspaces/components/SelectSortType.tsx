"use client";
import React from "react";
import PropTypes from "prop-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

SelectSortType.propTypes = {};

function SelectSortType() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: string) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);

    // Set the new value for "messageKeyword"
    params.set("sort", e);
    router.replace(`/workspaces?${params.toString()}`);
  };
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="select order list" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="alphabticaly">A-Z</SelectItem>
        <SelectItem value="accedning">latest to oldest</SelectItem>
        <SelectItem value="decending">oldest to latest</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SelectSortType;
