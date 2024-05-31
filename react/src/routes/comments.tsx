/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionArgs } from "react-router-dom";
import { commentActions } from "../api/actions";

export const commentAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const text = formData.get("text");
  if (!text) {
    return { error: "Debes escribir algo." };
  }
  await commentActions.createComment(formData);
  return { message: "Comment saved successfully." };
};
