import { Like } from "./definitions";

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};

export const formatLikes = (likes: Like[] | null) => {
  if (likes) {
    const likers = likes.slice(0, 3).map((like) => like.user);
    const likersString = likers.join(", ");
    const additionalLikes =
      likes.length > 3 ? ` y ${likes.length - 3} mas.` : "";
    return `${likersString}${additionalLikes}`;
  }
  return "0 me gusta";
};
