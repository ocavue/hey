import '@prosekit/basic/style.css';
import { createEditor } from '@prosekit/core';
import { ProseKit } from '@prosekit/react';
import { useMemo } from 'react';

import { defineTextEditorExtension } from './extension';
import InlineMenu from './InlineMenu';

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineTextEditorExtension();
    return createEditor({ extension });
  }, []);

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full min-h-32 w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700">
        <div className="relative flex min-h-full w-full flex-col">
          <InlineMenu />
          <div
            className='[&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:color-white relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 dark:bg-neutral-900 [&_pre]:bg-zinc-800'
            ref={editor.mount}
          />
        </div>
      </div>
    </ProseKit>
  );
}
