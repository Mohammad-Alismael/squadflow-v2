import { MoreVertical, Calendar } from "react-feather";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ITask } from "@/utils/@types/task";

const TaskCard = ({ data }: { data: ITask }) => {
  const { _id, title } = data;
  return (
    // <Link href={`${_id}`}>
    <Card className="px-2 py-1 mb-2">
      <div className="flex justify-between items-center">
        <p>{title}</p>
        <MoreVertical size={20} />
      </div>

      <p className="flex text-gray-400 gap-1">
        <Calendar size={20} /> until
      </p>
    </Card>
    // </Link>
  );
};

export default TaskCard;
