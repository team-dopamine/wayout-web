import { DEFAULT_CODE_BY_LANG } from '@/constants/counterexample';
import type { FailedCase, Language } from '@/types/counterexample';

export interface CounterExampleState {
  language: Language;
  code: string;
  isPublic: boolean;
  isLoading: boolean;
  hasSearched: boolean;
  failedCases: FailedCase[];
}

export type CounterExampleAction =
  | { type: 'SET_LANGUAGE'; value: Language }
  | { type: 'SET_CODE'; value: string }
  | { type: 'SET_PUBLIC'; value: boolean }
  | { type: 'START_SEARCH' }
  | { type: 'SEARCH_SUCCESS'; payload: FailedCase[] }
  | { type: 'SEARCH_FAILURE' };

export const initialState: CounterExampleState = {
  language: 'cpp',
  code: DEFAULT_CODE_BY_LANG.cpp,
  isPublic: false,
  isLoading: false,
  hasSearched: false,
  failedCases: [],
};

export function counterExampleReducer(
  state: CounterExampleState,
  action: CounterExampleAction,
): CounterExampleState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.value,
        code: DEFAULT_CODE_BY_LANG[action.value], // 언어 변경 시 코드 초기화
      };
    case 'SET_CODE':
      return { ...state, code: action.value };
    case 'SET_PUBLIC':
      return { ...state, isPublic: action.value };
    case 'START_SEARCH':
      return { ...state, isLoading: true, hasSearched: true };
    case 'SEARCH_SUCCESS':
      return { ...state, isLoading: false, failedCases: action.payload };
    case 'SEARCH_FAILURE':
      return { ...state, isLoading: false, failedCases: [] };
    default:
      return state;
  }
}
