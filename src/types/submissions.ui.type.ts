import type { Language } from '@/apis/submissions/submissions.type';

export type SubmissionTableMode = 'problem' | 'platform';

export interface SubmissionTableItem {
  id: number;
  problemNo: number;
  dateLabel: string;
  user: string;
  problem: string;
  platform?: string;
  language: Language;
  executionTime: string;
  open: boolean;
}
