/**반례 찾기 - 공통 상수 모음*/
import type { FailedCase, Language } from '@/types/counterexample';

export const LANG_OPTIONS: { value: Language; label: string }[] = [
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python 3' },
];

export const DEFAULT_CODE_BY_LANG: Record<Language, string> = {
  python: `from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = nums[0]
        current_sum = nums[0]
        for i in range(1, len(nums)):
            current_sum = max(nums[i], current_sum + nums[i])
            max_sum = max(max_sum, current_sum)
        return max_sum
`,
  java: `import java.util.*;

class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }
}
`,
  c: `#include <stdio.h>

int max(int a, int b) { return a > b ? a : b; }

int maxSubArray(int* nums, int n) {
    int maxSum = nums[0];
    int currentSum = nums[0];

    for (int i = 1; i < n; i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];

        for (int i = 1; i < (int)nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        return maxSum;
    }
};
`,
};

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
