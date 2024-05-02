import { Regex } from '@hey/data/regex';
import {
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineMarkSpec,
  defineNodeSpec,
  defineParagraph,
  defineText,
  union
} from 'prosekit/core';
import { defineBold } from 'prosekit/extensions/bold';
import { defineCode } from 'prosekit/extensions/code';
import { defineHeading } from 'prosekit/extensions/heading';
import { defineItalic } from 'prosekit/extensions/italic';
import { defineLinkMarkRule, defineLinkSpec } from 'prosekit/extensions/link';
import { defineMarkRule } from 'prosekit/extensions/mark-rule';
import {
  MentionAttrs,
  defineMentionCommands
} from 'prosekit/extensions/mention';
import { definePlaceholder } from 'prosekit/extensions/placeholder';
import { defineStrike } from 'prosekit/extensions/strike';
import { defineUnderline } from 'prosekit/extensions/underline';
import { defineVirtualSelection } from 'prosekit/extensions/virtual-selection';

const defineHashtag = () => {
  return union([
    defineMarkSpec({
      name: 'hashtag' as const,
      toDOM: () => ['span', { 'data-hashtag': '' }, 0]
    }),
    defineMarkRule({
      regex: Regex.hashtag,
      type: 'hashtag'
    })
  ]);
};

const defineCashtag = () => {
  return union([
    defineMarkSpec({
      name: 'cashtag' as const,
      toDOM: () => ['span', { 'data-cashtag': '' }, 0]
    }),
    defineMarkRule({
      regex: Regex.cashtag,
      type: 'cashtag'
    })
  ]);
};

const defineAutoLink = () => {
  return union([defineLinkSpec(), defineLinkMarkRule()]);
};

const defineMentionSpec = () => {
  return defineNodeSpec({
    name: 'mention',
    atom: true,
    group: 'inline',
    attrs: { id: {}, value: {}, kind: { default: '' } },
    inline: true,
    parseDOM: [
      {
        tag: `span[data-mention]`,
        getAttrs: (dom): MentionAttrs => {
          const id = (dom as HTMLElement).getAttribute('data-id') || '';
          const kind = (dom as HTMLElement).getAttribute('data-mention') || '';
          const value = stripLensPrefix((dom as HTMLElement).textContent || '');
          return { id, kind, value };
        }
      }
    ],
    toDOM(node) {
      const attrs = node.attrs as MentionAttrs;
      const value = attrs.value.toString();

      const children =
        attrs.kind === 'user'
          ? [
              ['span', '@'],
              // Hide the "lens/" part inside the editor, but it's still part
              // of the HTML output so that we can keep it when converting
              // HTML to Markdown.
              ['span', { class: 'hidden' }, 'lens/'],
              ['span', value]
            ]
          : [['span', value]];

      return [
        'span',
        {
          'data-id': attrs.id.toString(),
          'data-mention': attrs.kind.toString()
        },
        ...children
      ];
    }
  });
};

const stripLensPrefix = (str: string) => {
  return str.replace(/^\@(?:lens\/)/g, '');
};

const defineMention = () => {
  return union([defineMentionSpec(), defineMentionCommands()]);
};

export const defineTextEditorExtension = () => {
  return union([
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHeading(),
    defineHistory(),
    defineBaseKeymap(),
    defineBaseCommands(),
    defineItalic(),
    defineBold(),
    defineStrike(),
    defineUnderline(),
    defineCode(),
    defineHashtag(),
    defineCashtag(),
    defineAutoLink(),
    defineVirtualSelection(),
    defineMention(),
    definePlaceholder({ placeholder: "What's new?!", strategy: 'doc' })
  ]);
};

export type TextEditorExtension = ReturnType<typeof defineTextEditorExtension>;
