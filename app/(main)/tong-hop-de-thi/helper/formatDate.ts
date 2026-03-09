export function formatDate(dateString: string) {
  if (!dateString) return "";

  const createdAt = new Date(dateString);
  if (isNaN(createdAt.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();

  if (diffMs <= 0) return "Vừa xong";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} ngày trước`;
  }

  if (diffHours > 0) {
    return `${diffHours} giờ trước`;
  }

  if (diffMinutes > 0) {
    return `${diffMinutes} phút trước`;
  }

  return "Vừa xong";
}
