/** CodeMirror에서 사용할 언어별 문법 하이라이트를 반환하는 유틸 함수 */
import type { Extension } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';

export type EditorLang = 'c' | 'cpp' | 'java' | 'python';

export function getLanguageExtension(lang: EditorLang): Extension {
  switch (lang) {
    case 'python':
      return python();
    case 'java':
      return java();
    case 'cpp':
      return cpp();
    case 'c':
    default:
      return cpp();
  }
}
