import React from "react";
import Image from "next/image";

function NoTasksFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Image src="./Task-bro.svg" width={200} height={75} alt="no workspaces" />
      <div className="flex flex-col items-center justify-center">
        {/*<h3 className="capitalize text-xl font-bold">*/}
        {/*  no active tasks was found*/}
        {/*</h3>*/}
        <h3 className="capitalize opacity-50">no active tasks was found </h3>
      </div>
    </div>
  );
}

export default NoTasksFound;
