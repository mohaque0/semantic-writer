// Definition files adapted from: https://github.com/scrumpy/tiptap/tree/fc5eb0fa7331442363597abc04cea994482caf5a/packages

declare module 'tiptap-commands' {

  import { EditorView } from 'prosemirror-view';
  import { Transaction, EditorState, Plugin } from 'prosemirror-state';
  import { InputRule } from 'prosemirror-inputrules';
  import { NodeType, MarkType } from 'prosemirror-model';

  export interface DispatchFn {
    (tr: Transaction): boolean
  }

  export interface Command {
    (...params: any[]): CommandFunction;
  }

  export interface CommandFunction {
    (state: EditorState, dispatch: DispatchFn | undefined, view: EditorView): boolean;
  }

  export function toggleWrap(type: NodeType): Command

  export function wrappingInputRule(
    regexp: RegExp,
    nodeType: NodeType,
    getAttrs?: (arg: {} | string[]) => object | undefined,
    joinPredicate?: (strs: string[], node: Node) => boolean
  ): InputRule

  export function toggleMark(type: MarkType, attrs?: { [key: string]: any }): Command

  export function pasteRule(regexp: RegExp, type: string, getAttrs: (() => { [key: string]: any }) | { [key: string]: any }): Plugin;

  export function markInputRule(regext: RegExp, type: MarkType, getAttrs?: (() => { [key: string]: any }) | { [key: string]: any }): InputRule;

  export function markPasteRule(regext: RegExp, type: MarkType, getAttrs?: (() => { [key: string]: any }) | { [key: string]: any }): Plugin;

}