import { MoreVertical, Calendar, MessageCircle } from "react-feather";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { TaskResponse } from "@/utils/@types/task";
import TaskLabels from "@/app/(app)/workspaces/[workspaceId]/components/TaskLabels";
import TaskParticipants from "@/app/(app)/workspaces/[workspaceId]/components/TaskParticipants";
import { Draggable } from "@hello-pangea/dnd";
import { clsx } from "clsx";

const TaskCard = ({ data, index }: { data: TaskResponse; index: number }) => {
  const { _id, title } = data;
  return (
    <Draggable draggableId={_id as string} index={index}>
      {(provided, snapshot) => (
        <div
          className={clsx("mt-2", snapshot.isDragging)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Link href={`?taskId=${_id}`} prefetch={false}>
            <Card
              className={clsx(
                "p-3 space-y-1",
                snapshot.isDragging && "bg-[#e6e6e6]"
              )}
            >
              <div className="flex justify-between items-center">
                <p>{title}</p>
                <MoreVertical size={20} />
              </div>
              <TaskParticipants assigness={data.participants} />
              <p className="flex text-gray-400 gap-1">
                <Calendar size={20} />
                {!data.dueDate || data.dueDate === ""
                  ? "no due date"
                  : `until ${data.dueDate}`}
                {data.dueTime && data.dueTime !== "" && `, ${data.dueTime}`}
              </p>
              <div className="flex items-end justify-between self-end">
                {!!data.labels.length && <TaskLabels labels={data.labels} />}
                <div className="flex flex-row text-gray-400 gap-1">
                  <span>{data.comments.length}</span>
                  <MessageCircle size={20} />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
