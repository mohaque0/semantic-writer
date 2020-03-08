<template>
  <q-page class="flex">
    <q-editor id="editor" ref="editor" v-model="editor" min-height="5rem" @input="sanitizeEditor" />
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
    this.$refs.editor.runCmd(cmd, param);
  }

  sanitizeEditor(): void {
    const editor = document.getElementById('editor');
    if (editor === null) {
      console.log('Error can\'t find "editor" element.');
      return;
    }

    this.sanitizeRoot(editor);
  }

  sanitizeRoot(element: HTMLElement): void {
    console.log(element);
    console.log(element.children[0].nodeType)
  }

}
</script>

<style scoped>
#editor {
  width: 100%;
  height: 100%;
}
</style>