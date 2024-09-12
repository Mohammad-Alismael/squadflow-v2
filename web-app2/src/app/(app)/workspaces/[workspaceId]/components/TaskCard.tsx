import { MoreVertical, Calendar, MessageCircle } from "react-feather";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { TaskResponse } from "@/utils/@types/task";
import TaskLabels from "@/app/(app)/workspaces/[workspaceId]/components/TaskLabels";
import TaskParticipants from "@/app/(app)/workspaces/[workspaceId]/components/TaskParticipants";
import { Draggable } from "@hello-pangea/dnd";
import { clsx } from "clsx";
import TaskCardMenu from "@/app/(app)/workspaces/[workspaceId]/components/TaskCardMenu";
import { useRouter, useSearchParams } from "next/navigation";

const TaskCard = ({
  data,
  workspaceId,
  index,
}: {
  data: TaskResponse;
  workspaceId: string;
  index: number;
}) => {
  const { _id, title, workspace } = data;
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (id: React.MouseEventHandler<HTMLDivElement>) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);

    // Set the new value for "messageKeyword"
    params.set("taskId", _id);
    router.replace(`/task/${params.toString()}`);
  };
  return (
    <Draggable draggableId={_id as string} index={index}>
      {(provided, snapshot) => (
        <div
          className={clsx("", snapshot.isDragging)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Link
            href={`/task/${workspace.toString()}/${_id}`}
            scroll={false}
            prefetch={false}
            passHref={false}
          >
            <Card
              className={clsx(
                "p-2 space-y-1",
                snapshot.isDragging && "bg-[#e6e6e6]"
              )}
            >
              <div className="flex justify-between items-center">
                <p className="w-56 truncate">{title}</p>
                <TaskCardMenu taskId={_id} />
              </div>
              <TaskParticipants assigness={data.participants} />
              <div className="flex flex-row items-center justify-between text-gray-400 gap-1">
                <p className=" flex flex-row items-center gap-1">
                  <Calendar size={20} />
                  {!data.dueDate || data.dueDate === ""
                    ? "no due date"
                    : `${data.dueDate}`}
                  {/*{data.dueTime && data.dueTime !== "" && `, ${data.dueTime}`}*/}
                </p>
                {!!data.comments.length && (
                  <div className="flex flex-row text-gray-400 gap-1 self-end">
                    <span>{data.comments.length}</span>
                    <MessageCircle size={20} />
                  </div>
                )}
              </div>
              <div className="flex items-end justify-between">
                {!!data.labels.length && <TaskLabels labels={data.labels} />}
              </div>
            </Card>
          </Link>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
