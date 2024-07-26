"use client";
import React from "react";
import PropTypes from "prop-types";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function NavigateBack() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = () => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);
    params.delete("workspaceId");
    router.replace(`/chats`);
  };
  return (
    <CircleChevronLeft
      className="block md:hidden"
      onClick={handleChange}
      size={25}
      color="#000"
    />
  );
}

export default NavigateBack;
