import { useEditor } from 'prosekit/react';
import { InlinePopover } from 'prosekit/react/inline-popover';

import type { TextEditorExtension } from './extension';

import Toggle from './Toggle';

export default function InlineMenu() {
  const editor = useEditor<TextEditorExtension>({ update: true });

  return (
    <InlinePopover className="relative z-10 box-border flex min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded-md border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-neutral-900">
      <Toggle
        disabled={!editor.commands.toggleBold.canApply()}
        onClick={() => editor.commands.toggleBold()}
        pressed={editor.marks.bold.isActive()}
        tooltip='Bold'
      >
        <div className="i-lucide-bold h-5 w-5" />
      </Toggle>

      <Toggle
        disabled={!editor.commands.toggleItalic.canApply()}
        onClick={() => editor.commands.toggleItalic()}
        pressed={editor.marks.italic.isActive()}
        tooltip='Italic'
      >
        <div className="i-lucide-italic h-5 w-5" />
      </Toggle>

      <Toggle
        disabled={!editor.commands.toggleUnderline.canApply()}
        onClick={() => editor.commands.toggleUnderline()}
        pressed={editor.marks.underline.isActive()}
        tooltip='Underline'
      >
        <div className="i-lucide-underline h-5 w-5" />
      </Toggle>

      <Toggle
        disabled={!editor.commands.toggleCode.canApply()}
        onClick={() => editor.commands.toggleCode()}
        pressed={editor.marks.code.isActive()}
        tooltip='Code'
      >
        <div className="i-lucide-code h-5 w-5" />
      </Toggle>

      <Toggle
        disabled={!editor.commands.toggleStrike.canApply()}
        onClick={() => editor.commands.toggleStrike()}
        pressed={editor.marks.strike.isActive()}
        tooltip='Strikethrough'
      >
        <div className="i-lucide-strikethrough h-5 w-5" />
      </Toggle>
    </InlinePopover>
  );
}
