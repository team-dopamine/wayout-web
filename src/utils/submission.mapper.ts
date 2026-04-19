import type { Submission as ApiSubmission } from '@/apis/submissions/submissions.type';
import type { SubmissionTableItem } from '../types/submissions.ui.type';
import { getTimeAgo } from '@/utils/time';

export function mapSubmissionToTableItem(item: ApiSubmission): SubmissionTableItem {
  return {
    id: item.id,
    problemNo: item.problemNo,
    dateLabel: getTimeAgo(item.createdAt),
    user: item.nickname,
    problem: item.title,
    platform: item.platform,
    language: item.language,
    executionTime: `${Number(item.executionTime).toFixed(1)} ms`,
    open: item.open,
  };
}
