import { ICommentCreate, ITask } from "@/utils/@types/task";
import { Comment } from "@/utils/@types/task";

export const restructureComments = (
  comments: ICommentCreate[],
  userId: string
) => {
  return comments.map((item) => {
    if (item["created_by"] === "user_auth_id") {
      const x = item;
      delete x["_id"];
      delete x["created_at"];
      x["created_by"] = userId;
      return x;
    } else return item;
  });
};

export const restructureCommentsv2 = (
  comments: ICommentCreate[],
  userId: string
) => {
  return comments.map((item) => {
    const x = item;
    delete x["_id"];
    delete x["created_at"];
    x["created_by"] = userId;
    return { created_by: userId, text: x.text };
  });
};
