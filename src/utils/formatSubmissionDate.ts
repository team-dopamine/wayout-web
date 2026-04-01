// 공통 함수로 분리 (재사용성 극대화)
export function formatSubmissionDate(dateString: string | Date): string {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

    // 날짜가 유효하지 않으면 '-' 반환
    if (isNaN(date.getTime())) return '-';

    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24시간제 유지
      timeZone: 'Asia/Seoul',
    })
      .format(date)
      .replace(/\. /g, '.'); // "2026. 03. 28." -> "2026.03.28" 공백 제거
  } catch (error) {
    return '-';
  }
}
