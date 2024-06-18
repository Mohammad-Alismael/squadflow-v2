"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

function SearchMessageInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);

    // Set the new value for "messageKeyword"
    params.set("messageKeyword", e.target.value);

    console.log(params.toString());
    router.replace(`/chats?${params.toString()}`);
    // Update the URL with the new search parameters
    // router.replace({
    //   pathname: router.pathname,
    //   query: params.toString(),
    // });
  };
  return (
    <Input
      onChange={handleChange}
      type="text"
      placeholder="search for messages..."
      className="w-1/4"
    />
  );
}

export default SearchMessageInput;
