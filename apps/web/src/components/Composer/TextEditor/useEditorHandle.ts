import type { Editor } from 'prosekit/core';

import { useImperativeHandle } from 'react';

import type { TextEditorExtension } from './extension';

/**
 * Some methods for operating the editor from outside the editor component.
 */
export interface TextEditorHandle {
  /**
   * Insert text at the current text cursor position.
   */
  insertText: (text: string) => void;
}

export const useEditorHandle = (
  editor: Editor<TextEditorExtension>,
  ref: React.Ref<TextEditorHandle>
): void => {
  useImperativeHandle(
    ref,
    (): TextEditorHandle => ({
      insertText: (text: string): void => {
        if (!editor.mounted) {
          return;
        }
        editor.commands.insertText({ text });
      }
    }),
    [editor]
  );
};
