import type { Contribution } from '@/components/profile/ContributionsSection';
import type { MySolutionItem, SolutionType } from '@/apis/solutions/solutions.type';
import { MySubmission } from '@/apis/members/members.type';

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

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hour}:${minute}`;
}

function mapSolutionTypeToContributionType(type?: SolutionType): Contribution['type'] {
  switch (type) {
    case 'CORRECT':
      return 'Correct Code';
    case 'INCORRECT':
      return 'Incorrect Code';
    case 'GENERATOR':
      return 'Generator';
    default:
      return 'Correct Code';
  }
}

export function toContribution(item: MySolutionItem): Contribution {
  return {
    codeId: String(item.problemId),
    problemName: item.problemTitle,
    language: formatLanguage(item.language),
    type: mapSolutionTypeToContributionType(item.type),
    submittedAt: formatSubmittedAt(item.submissionDate),
  };
}
export function toSubmission(item: MySubmission): Contribution {
  return {
    codeId: String(item.id),
    problemName: item.title,
    language: formatLanguage(item.language),
    type: mapSolutionTypeToContributionType(item.type),
    submittedAt: formatSubmittedAt(item.createdAt),
  };
}
