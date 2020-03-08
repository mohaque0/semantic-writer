<template>
  <q-page class="flex">
    <div id="editor" :contentEditable="true" min-height="5rem" @input="sanitizeEditor" />
  </q-page>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Handler as SidebarHandler } from '@/store/sidebar/state'
import { QEditor } from 'quasar';


class StyleHandler implements SidebarHandler {
  cmd: (cmd: string, param?: string) => void;

  constructor(cmd: (cmd: string, param?: string) => void) {
    this.cmd = cmd;
  }

  handle(target: string) {
    console.log(target)
    switch(target) {
      case 'h1': {
        this.cmd('formatblock', 'H1')
        break;
      }
      case 'h2': {
        this.cmd('formatblock', 'H2')
        break;
      }
      case 'h3': {
        this.cmd('formatblock', 'H3')
        break;
      }
      case 'h4': {
        this.cmd('formatblock', 'H4')
        break;
      }
      case 'h5': {
        this.cmd('formatblock', 'H5')
        break;
      }
      case 'h6': {
        this.cmd('formatblock', 'H6')
        break;
      }
      case 'list_bulleted': {
        this.cmd('insertUnorderedList')
        break;
      }
      case 'list_numbered': {
        this.cmd('insertOrderedList')
        break;
      }
      case 'blockquote': {
        this.cmd('formatblock', 'blockquote')
        break;
      }
      case 'text': {
        this.cmd('formatblock', 'p')
        break;
      }
      default: {
        console.log('Unknown target: ' + target)
      }
    }
  }
}


@Component
export default class PageIndex extends Vue {
  editor: string;
  $refs!: {
    editor: QEditor;
  }

  constructor() {
    super()
    this.editor = '';
    this.$store.commit('sidebar/install', new StyleHandler(this.cmd))
  }

  cmd(cmd: string, param?: string): void {
    document.getElementById('editor')?.focus();
    document.execCommand(cmd, false, param);
  }

  sanitizeEditor(): void {
    const editor = document.getElementById('editor');
    if (editor === null) {
      console.log('Error can\'t find "editor" element.');
      return;
    }

    this.sanitizeElement(editor);
  }

  sanitizeElement(element: Element): void {
    for (let i = 0; i< element.children.length; i++) {
      let child = element.children[i];
      this.sanitizeElement(child);

      if (child.tagName === 'DIV' && child.attributes.length == 0) {
        this.setTag(child, 'p');
      }
    }
  }

  setTag(element: Element, tag: string) {
    let parent = element.parentElement;
    if (parent == null) {
      console.error('Can\'t rename element tag which has no parent.');
      return;
    }
    if (element.attributes.length > 0) {
      console.error('Can\'t rename element tag from ' + element.tagName + ' to ' + tag + ' because it has attributes.');
      console.error(element);
      return;
    }

    let newElement = document.createElement(tag);
    //for (let i = 0; i< element.childNodes.length; i++) {
    //  let child = element.childNodes[i];
    //  newElement.append(child);
    //}
    newElement.innerHTML = element.innerHTML;

    console.log('Replacing');
    console.log(element);
    console.log(newElement);

    parent.replaceChild(newElement, element);
  }

}
</script>

<style scoped>
#editor {
  width: 100%;
  height: 100%;
}
</style>