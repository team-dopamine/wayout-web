/** 공통 코드 에디터 컴포넌트*/
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap, EditorView } from '@codemirror/view';
import { defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands';
import { history } from '@codemirror/commands';
import { EditorState } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';

import type { EditorLang } from '@/constants/editor';
import { getLanguageExtension } from '@/constants/editor';

type Props = {
  language: EditorLang;
  value: string;
  onChange: (next: string) => void;
  onSubmit?: () => void;
};

export default function CodeEditor({ language, value, onChange, onSubmit }: Props) {
  const viewRef = useRef<EditorView | null>(null);
  const detachScrollRef = useRef<(() => void) | null>(null);

  const [lineCount, setLineCount] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!onSubmit) return;
      const isCmdEnter = (e.metaKey || e.ctrlKey) && e.key === 'Enter';
      if (isCmdEnter) {
        e.preventDefault();
        onSubmit();
      }
    },
    [onSubmit],
  );

  const languageExtension = useMemo(() => getLanguageExtension(language), [language]);

  const editorTheme = useMemo(
    () =>
      EditorView.theme({
        '&': { height: '100%' },
        '&.cm-editor': { height: '100%', backgroundColor: 'transparent' },
        '.cm-scroller': {
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
        '.cm-gutters': { display: 'none' },
        '.cm-content': { padding: '1rem 1rem 1rem 3.5rem' },
        '.cm-line': { lineHeight: '1.5rem' },
      }),
    [],
  );

  const attachScrollListener = useCallback((view: EditorView) => {
    detachScrollRef.current?.();

    const onScroll = () => setScrollTop(view.scrollDOM.scrollTop);
    view.scrollDOM.addEventListener('scroll', onScroll, { passive: true });

    detachScrollRef.current = () => {
      view.scrollDOM.removeEventListener('scroll', onScroll);
      detachScrollRef.current = null;
    };
  }, []);

  const handleCreateEditor = useCallback(
    (view: EditorView) => {
      viewRef.current = view;
      setLineCount(Math.max(1, view.state.doc.lines));
      setScrollTop(view.scrollDOM.scrollTop);

      attachScrollListener(view);
    },
    [attachScrollListener],
  );

  useEffect(() => {
    return () => {
      detachScrollRef.current?.();
    };
  }, []);

  const extensions = useMemo(
    () => [
      indentUnit.of('    '),
      EditorState.tabSize.of(4),

      history(),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),

      languageExtension,
      editorTheme,
    ],
    [languageExtension, editorTheme],
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1e1e1e] text-sm text-slate-300">
      {/** 왼쪽 라인넘버 UI */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-12 select-none border-r border-[#333] bg-[#1e1e1e] pr-2 text-slate-500">
        <div className="pt-4 text-right" style={{ transform: `translateY(-${scrollTop}px)` }}>
          {Array.from({ length: lineCount }).map((_, idx) => (
            <div key={idx} className="leading-6">
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      <CodeMirror
        value={value}
        onChange={(val) => onChange(val)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        theme={oneDark}
        height="100%"
        extensions={extensions}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLineGutter: false,
          autocompletion: true,
          bracketMatching: true,
          closeBrackets: true,
          highlightSelectionMatches: true,
          indentOnInput: true,
        }}
        onCreateEditor={handleCreateEditor}
        onUpdate={(vu) => setLineCount(Math.max(1, vu.state.doc.lines))}
      />
    </div>
  );
}
