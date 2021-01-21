import { Node } from 'tiptap'
import { toggleBlockType } from 'tiptap-commands'

export default class DynamicBlock extends Node {

  get name() {
    return 'dynamicBlock'
  }

  get schema() {
    const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre']
    const getAttrsFunction = 
      dom => ({
        tag: dom.tagName,
        class: dom.getAttribute("class") ?? ""
      });

    return {
      attrs: { tag: { default: 'div' }, class: { default: "" }},
      content: 'inline*',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: allowedTags.map(tag => 
        ({
          tag: tag,
          getAttrs: getAttrsFunction
        })
      ),
      toDOM: (node) => {
        console.log(node);
        return [node.attrs.tag, { class: node.attrs.class }, 0]
      },
    }
  }

  commands({ type, schema }) {
    console.log({type, schema})
    return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
  }

  keys() {
    return {}
  }

  inputRules() {
    return []
  }

}
