"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleChevronLeft } from "lucide-react";

function NavigateBack() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = () => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);
    params.delete("workspaceId");
    router.replace(`/chats2`);
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
