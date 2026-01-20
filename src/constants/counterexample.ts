/**반례 찾기 - 공통 상수 모음*/
import type { FailedCase, Language } from '@/types/counterexample';

export const LANG_OPTIONS: { value: Language; label: string }[] = [
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python 3' },
];

export const DEFAULT_CODE = `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = nums[0]
        current_sum = nums[0]
        for i in range(1, len(nums)):
            current_sum = max(nums[i], current_sum + nums[i])
            max_sum = max(max_sum, current_sum)
        return max_sum
`;

export const MOCK_FAILED_CASES: FailedCase[] = [
  {
    id: 4,
    timeMs: 24,
    input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    expected: '6',
    output: '5',
  },
  {
    id: 12,
    timeMs: 12,
    input: 'nums = [5, 4, -1, 7, 8]',
    expected: '23',
    output: '22',
  },
];
