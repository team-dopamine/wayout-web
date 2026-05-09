import type { MySolutionItem } from '@/apis/solutions/solutions.type';
import { MySubmission } from '@/apis/submissions/submissions.type';
import { Contribution } from '@/components/profile/contributions.constants';

function formatLanguage(language: MySolutionItem['language']) {
  switch (language) {
    case 'JAVA':
      return 'Java';
    case 'CPP':
      return 'C++';
    case 'PYTHON':
      return 'Python';
    default:
      return language;
  }
}

function formatSubmittedAt(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hour}:${minute}`;
}

export function toContribution(item: MySolutionItem): Contribution {
  const solutionId = item.id ?? item.solutionId;

  return {
    codeId: String(solutionId ?? item.problemId),
    problemId: item.problemId,
    problemNo: item.problemNo,
    problemName: item.problemTitle,
    language: formatLanguage(item.language),
    platform: item.platform,
    submittedAt: formatSubmittedAt(item.submissionDate),
  };
}

export function toSubmission(item: MySubmission): Contribution {
  return {
    codeId: String(item.id),
    problemId: item.problemNo,
    problemNo: item.problemNo,
    problemName: item.title,
    language: formatLanguage(item.language),
    platform: item.platform,
    submittedAt: formatSubmittedAt(item.createdAt),
  };
}
