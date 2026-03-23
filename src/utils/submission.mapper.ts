import type { Submission as ApiSubmission } from '@/apis/submissions/submissions.type';
import type { SubmissionTableItem } from '../types/submissions.ui.type';
import { getTimeAgo } from '@/utils/time';

export function mapSubmissionToTableItem(item: ApiSubmission): SubmissionTableItem {
  return {
    id: item.id,
    dateLabel: getTimeAgo(item.createdAt),
    user: item.nickname,
    problem: item.title,
    platform: '-', // 임시처리, 응답 결과에 platform 들어오면 밑에 걸로 수정
    // platform: item.platform,
    language: item.language,
    executionTime: `${Number(item.executionTime).toFixed(1)} ms`,
    memory: '-',
  };
}
