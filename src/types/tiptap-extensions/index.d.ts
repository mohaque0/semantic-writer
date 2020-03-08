// Definition files adapted from: https://github.com/scrumpy/tiptap/tree/fc5eb0fa7331442363597abc04cea994482caf5a/packages

declare module 'tiptap-extensions' {

  import { Extension, Node, Mark } from 'tiptap';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { NodeSpec } from 'prosemirror-model';

  export interface PlaceholderOptions {
    emptyNodeClass?: string,
    emptyNodeText?: string,
    showOnlyWhenEditable?: boolean,
    showOnlyCurrent?: boolean,
  }
  export class Placeholder extends Extension {
    public constructor(options?: PlaceholderOptions);
  }

  export interface TrailingNodeOptions {
  /**
     * Node to be at the end of the document
     * 
     * defaults to 'paragraph'
     */
    node: string;
    /**
     * The trailing node will not be displayed after these specified nodes.
     */
    notAfter: string[];
  }
  export class TrailingNode extends Extension {
    public constructor(options?: TrailingNodeOptions);
  }

  export interface HeadingOptions {
    levels?: number[],
  }

  export class History extends Extension { }
  export class Underline extends Mark { }
  export class Strike extends Mark { }
  export class Italic extends Mark { }
  export class Bold extends Mark { }
  export class Code extends Mark { }
  export class Link extends Mark { }
  export class BulletList extends Node { }
  export class ListItem extends Node { }
  export class OrderedList extends Node { }
  export class HardBreak extends Node { }
  export class Blockquote extends Node { }
  export class CodeBlock extends Node { }
  export class TodoItem extends Node { }
  export class TodoList extends Node { }

  export class Heading extends Node {
    public constructor(options?: HeadingOptions);
  }

  export class Table extends Node { }
  export class TableCell extends Node { }
  export class TableRow extends Node { }
  export class TableHeader extends Node { }

}