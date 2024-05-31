export default function isLiked(
  id: number | null,
  likedItems: number[] | null
): boolean {
  if (id == null || likedItems == null) {
    return false;
  }
  return likedItems.includes(id);
}
