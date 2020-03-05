<template>
  <q-page class="flex">
    <div id="editor">
      <p>Hello World!</p>
      <div>Something</div>
      <p>Some initial <strong>bold</strong> <span>text</span></p>
      <p><br></p>
    </div>
  </q-page>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import Quill from 'quill'
import { Handler as SidebarHandler } from '@/store/sidebar/state'

class StyleHandler implements SidebarHandler {
  quill: Quill;

  constructor(quill: Quill) {
    this.quill = quill;
  }

  handle(target: string) {
    console.log(target)
    switch(target) {
      case 'h1': {
        this.quill.format('header', 'H1')
        break;
      }
      case 'h2': {
        this.quill.format('header', 'H2')
        break;
      }
      case 'h3': {
        this.quill.format('header', 'H3')
        break;
      }
      case 'h4': {
        this.quill.format('header', 'H4')
        break;
      }
      case 'h5': {
        this.quill.format('header', 'H5')
        break;
      }
      case 'h6': {
        this.quill.format('header', 'H6')
        break;
      }
      case 'list_bulleted': {
        this.quill.format('list', 'UL')
        break;
      }
      case 'list_numbered': {
        this.quill.format('list', 'OL')
        break;
      }
      case 'blockquote': {
        this.quill.format('blockquote', 'blockquote')
        break;
      }
      case 'text': {
        this.quill.format('header', null);
        this.quill.format('blockquote', null);
        break;
      }
      default: {
        console.log('Unknown target: ' + target)
      }
    }
  }
}

@Component
export default class PageIndex extends Vue{
  quill?: Quill;

  constructor() {
    super()
  }

  mounted() {
    this.quill = new Quill('#editor');
    this.quill.format('header', 'H1');
    this.quill.format('font', 'monospace');
    this.$store.commit('sidebar/install', new StyleHandler(this.quill))
  }
}
</script>

<style scoped>
#editor {
  width: 100%;
  height: 100%;
  padding: 1em;
}
</style>