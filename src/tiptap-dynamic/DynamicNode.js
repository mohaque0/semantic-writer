import { Node } from 'tiptap'
import { wrappingInputRule, toggleWrap } from 'tiptap-commands'

export default class DynamicBlock extends Node {

  get name() {
    return 'dynamicBlock'
  }

  get schema() {
    return {
      attrs: { tag: { default: 'div' }, class: { default: "" }},
      content: 'block*',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: [
        {
          tag: 'div',
          getAttrs: dom => ({
            tag: 'div',
            class: dom.getAttribute("class")
          })
        },
      ],
      toDOM: (node) => {console.log(node); return [node.attrs.tag, { class: node.attrs.class } , 0] },
    }
  }

  commands({ type }) {
    return attrs => toggleWrap(type, attrs)
  }

  keys() {
    return {}
  }

  inputRules({ type }) {
    return [
      wrappingInputRule(/^\s*<\s$/, type),
    ]
  }

}
