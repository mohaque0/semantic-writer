<template>
  <q-page class="flex">
    <editor-content :editor="editor" />
  </q-page>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Editor, EditorContent } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

import { Handler as SidebarHandler } from '@/store/sidebar/state'

class StyleHandler implements SidebarHandler {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  handle(target: string) {
    console.log(target)
    switch(target) {
      case 'h1': {
        this.editor.commands.heading({ level: 1 });
        break;
      }
      case 'h2': {
        this.editor.commands.heading({ level: 2 });
        break;
      }
      case 'h3': {
        this.editor.commands.heading({ level: 3 });
        break;
      }
      case 'h4': {
        this.editor.commands.heading({ level: 4 });
        break;
      }
      case 'h5': {
        this.editor.commands.heading({ level: 5 });
        break;
      }
      case 'h6': {
        this.editor.commands.heading({ level: 6 });
        break;
      }
      case 'list_bulleted': {
        this.editor.commands.bullet_list();
        break;
      }
      case 'list_numbered': {
        this.editor.commands.ordered_list();
        break;
      }
      case 'blockquote': {
        this.editor.commands.blockquote();
        break;
      }
      case 'text': {
        break;
      }
      default: {
        console.log('Unknown target: ' + target)
      }
    }
  }
}


@Component({
  components: {
    EditorContent
  }
})
export default class PageIndex extends Vue {
  editor: Editor | null;

  constructor() {
    super()
    this.editor = null;
  }

  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      content: '<p>This is just a boring paragraph.</p>'
    })
    this.$store.commit('sidebar/install', new StyleHandler(this.editor))
    console.log(this.editor);
  }

  beforeDestroy() {
    this.editor?.destroy();
  }

}
</script>

<style scoped>
#editor {
  width: 100%;
  height: 100%;
}
</style>