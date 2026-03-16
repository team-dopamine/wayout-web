export function getTimeAgo(dateString: string) {
  const now = new Date();
  const created = new Date(dateString);

  const diffSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diffSeconds < 60) return '방금 전';

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes} 분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} 시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} 일 전`;
}
