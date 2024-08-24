import React from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Participant({
  data,
}: {
  data: { username: string; photoURL: string; email: string };
}) {
  return (
    <div className="flex flex-row items-center gap-4">
      <Avatar>
        <AvatarImage src={data.photoURL} />
        <AvatarFallback>{data.username}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-between">
        <p className="p-0 m-0 font-bold">{data.username}</p>
        <span className="opacity-70 text-sm p-0 m-0">{data.email}</span>
      </div>
    </div>
  );
}

export default Participant;
