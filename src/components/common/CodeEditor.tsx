/** 공통 코드 에디터 컴포넌트*/
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap, EditorView } from '@codemirror/view';
import { defaultKeymap, historyKeymap, indentWithTab, history } from '@codemirror/commands';
import { EditorState } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';

import type { EditorLang } from '@/constants/editor';
import { getLanguageExtension } from '@/constants/editor';

type Props = {
  language: EditorLang;
  value: string;
  onChange: (next: string) => void;
  onSubmit?: () => void;
  readOnly?: boolean;
};

export default function CodeEditor({
  language,
  value,
  onChange,
  onSubmit,
  readOnly = false,
}: Props) {
  const viewRef = useRef<EditorView | null>(null);
  const detachScrollRef = useRef<(() => void) | null>(null);

  const [lineCount, setLineCount] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);

  // 단축키 핸들러 (Ctrl/Cmd + Enter 제출)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // 읽기 전용이거나 onSubmit이 없으면 무시
      if (readOnly || !onSubmit) return;

      const isCmdEnter = (e.metaKey || e.ctrlKey) && e.key === 'Enter';
      if (isCmdEnter) {
        e.preventDefault();
        onSubmit();
      }
    },
    [onSubmit, readOnly],
  );

  const languageExtension = useMemo(() => getLanguageExtension(language), [language]);

  const editorTheme = useMemo(
    () =>
      EditorView.theme({
        '&': {
          height: '100%',
          width: '100%',
        },
        '&.cm-editor': {
          height: '100%',
          width: '100%',
          backgroundColor: 'transparent',
        },
        '.cm-scroller': {
          height: '100%',
          overflowX: 'auto',
          overflowY: 'auto',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
        '.cm-content': {
          padding: '1rem 0.75rem 1rem 3rem',
          whiteSpace: 'pre',
          cursor: readOnly ? 'default' : 'text',
        },
        '.cm-gutters': {
          display: 'none',
        },
        '.cm-line': {
          lineHeight: '1.5rem',
          whiteSpace: 'pre',
        },
        ...(readOnly && {
          '.cm-cursor': {
            display: 'none !important',
          },
          '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
            backgroundColor: '#3e4451 !important',
          },
        }),
      }),
    [readOnly],
  );

  const attachScrollListener = useCallback((view: EditorView) => {
    detachScrollRef.current?.();

    const onScroll = () => {
      setScrollTop(view.scrollDOM.scrollTop);
    };
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
      ...(!readOnly
        ? [history(), keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab])]
        : []),
      languageExtension,
      oneDark,
      editorTheme,
      EditorView.editable.of(!readOnly),
      EditorState.readOnly.of(readOnly),
    ],
    [languageExtension, editorTheme, readOnly],
  );

  return (
    <div
      className={`relative h-full min-h-0 w-full overflow-hidden rounded-md bg-[#1e1e1e] text-sm text-slate-300 ${
        readOnly ? 'cursor-default' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 select-none border-r border-[#333] bg-[#1e1e1e] pr-2 text-slate-500">
        <div className="pt-4 text-right" style={{ transform: `translateY(-${scrollTop}px)` }}>
          {Array.from({ length: lineCount }).map((_, idx) => (
            <div key={idx} className="leading-6">
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 min-h-0">
        <CodeMirror
          className="h-full"
          value={value}
          onChange={(val) => {
            if (!readOnly) onChange(val);
          }}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          height="100%"
          minHeight="100%"
          maxHeight="100%"
          extensions={extensions}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            highlightActiveLineGutter: false,
            autocompletion: !readOnly,
            bracketMatching: true,
            closeBrackets: !readOnly,
            highlightSelectionMatches: true,
            indentOnInput: !readOnly,
            highlightActiveLine: !readOnly,
          }}
          onCreateEditor={handleCreateEditor}
          onUpdate={(vu) => {
            if (vu.docChanged) {
              setLineCount(Math.max(1, vu.state.doc.lines));
            }
          }}
        />
      </div>
    </div>
  );
}
