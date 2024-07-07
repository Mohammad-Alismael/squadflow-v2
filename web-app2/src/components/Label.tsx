"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";

function Label({ id, text }: { id: string; text: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedWorkspaceId = searchParams.get("workspaceId");
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleClick = () => {
    if (id === selectedWorkspaceId) {
      router.replace("/dashboard");
    } else {
      router.push(pathname + "?" + createQueryString("workspaceId", id));
    }
  };
  return (
    <div
      onClick={handleClick}
      className={clsx(
        "h-8 flex justify-center items-center px-3 border-2 border-green-800 rounded-full cursor-pointer",
        selectedWorkspaceId === id && "bg-green-700"
      )}
    >
      <span
        className={clsx(
          "text-green-800 text-sm",
          selectedWorkspaceId === id && "text-white"
        )}
      >
        {text}
      </span>
    </div>
  );
}

export default Label;
