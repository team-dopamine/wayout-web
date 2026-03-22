import type { Contribution } from '@/components/profile/ContributionsSection';
import type { MySolutionItem } from '@/apis/solutions/solutions.type';

const submittedAtFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export function formatLanguage(language: MySolutionItem['language']) {
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

export function formatSubmittedAt(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  const parts = submittedAtFormatter.formatToParts(date);

  const year = parts.find((part) => part.type === 'year')?.value ?? '';
  const month = parts.find((part) => part.type === 'month')?.value ?? '';
  const day = parts.find((part) => part.type === 'day')?.value ?? '';
  const hour = parts.find((part) => part.type === 'hour')?.value ?? '';
  const minute = parts.find((part) => part.type === 'minute')?.value ?? '';

  return `${year}.${month}.${day} ${hour}:${minute}`;
}

export function toContribution(solution: MySolutionItem): Contribution {
  return {
    codeId: String(solution.problemId),
    problemName: solution.problemTitle,
    language: formatLanguage(solution.language),
    type: 'Correct Code',
    submittedAt: formatSubmittedAt(solution.createdAt),
  };
}
