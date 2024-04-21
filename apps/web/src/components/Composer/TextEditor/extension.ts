import { defineBasicExtension } from '@prosekit/basic';
import { union } from '@prosekit/core';

export function defineTextEditorExtension() {
  return union([defineBasicExtension()]);
}

export type TextEditorExtension = ReturnType<typeof defineTextEditorExtension>;
