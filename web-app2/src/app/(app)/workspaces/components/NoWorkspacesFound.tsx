import React from "react";
import Image from "next/image";

function NoWorkspacesFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="./Team-goals-bro.svg"
        width={500}
        height={300}
        alt="no workspaces"
      />
      <div className="flex flex-col items-center justify-center">
        <h3 className="capitalize text-xl font-bold">
          active workspaces not found
        </h3>
        <h3 className="capitalize opacity-50">
          try to create a new project or sign in to another community
        </h3>
      </div>
    </div>
  );
}

export default NoWorkspacesFound;
