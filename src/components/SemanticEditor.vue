<template>

  <q-layout view="hHh lpR fff">

    <q-drawer
      v-model="showStyleButtons"
      show-if-above
      side="left"
      bordered
      :width="200"
      :breakpoint="700"
      content-class="bg-white"
    >
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div>

          <div class="q-pa-md q-gutter-sm">
            <q-btn icon="folder_open" flat padding="xs" />
            <q-btn icon="edit" flat padding="xs" />
          </div>

        <q-list dense padding>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            Header 1
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            Header 2
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            Header 3
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            Blockquote
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            Code Block
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            Paragraph
          </q-item>

          <q-item
            v-for="(style,index) in styleDefinitions"
            :key="'style-definition-'+index"
            clickable
            v-ripple
            :class="{ 'is-active': isActive.dynamicBlock({tag: style.element, class: style.cl}) }"
            @click="() => {debug(commands); commands.dynamicBlock({tag: style.element, class: style.cl}) }"
          >
            {{ style.name }}
          </q-item>

          <q-item>
            <AddDynamicStyleButton @createNewStyle="createNewStyle" />
          </q-item>

          <q-separator class="q-mt-sm q-mb-sm" />

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            Bulleted List
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            Ordered List
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            Horizontal Rule
          </q-item>

          <q-separator class="q-mt-sm q-mb-sm" />

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            Bold
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            Italic
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            Strike
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            Underline
          </q-item>

          <q-item clickable v-ripple
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            Code
          </q-item>

        </q-list>
        </div>
      </editor-menu-bar>

    </q-drawer>

    <q-page-container>
      <q-splitter v-model="splitterModel">

        <template v-slot:before>

          <div class="q-pa-md q-gutter-sm">
            <editor-menu-bar :editor="editor" v-slot="{ commands }">
              <q-btn-group outline>
                <q-btn icon="undo" flat padding="xs" @click="commands.undo" />
                <q-btn icon="redo" flat padding="xs" @click="commands.redo"/>
              </q-btn-group>
            </editor-menu-bar>
          </div>

          <div class="content-editor">
            
            <SemanticStyles>
              {{ styleCSS }}
            </SemanticStyles>

            <editor-content class="editor__content" :editor="editor" />

          </div>
        </template>

        <template v-slot:after>
          <prism-editor class="style-editor" v-model="styleCSS" :highlight="highlighter" line-numbers></prism-editor>
        </template>

      </q-splitter>

    </q-page-container>
  </q-layout>

</template>

<script>

// For text editor
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
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
import DynamicNode from '../tiptap-dynamic/DynamicNode'
import AddDynamicStyleButton from "./AddDynamicStyleButton.vue"

// For style editor
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css'


export default {
  name: 'App',
  components: {
    EditorContent,
    EditorMenuBar,
    PrismEditor,
    AddDynamicStyleButton
  },
  data() {
    return {
      showStyleButtons: true,
      splitterModel: 50,
      editor: new Editor({
        extensions: [
          new DynamicNode(),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `,
      }),
      styleCSS: `
        div.myc {
          font-family: serif;
          color: red;
        }
      `,
      styleDefinitions: [
        {
          name: "Dynamic",
          element: "div",
          cl: "myc"
        }
      ],
      createNewStyle: (style) => {
        console.log("Adding style:")
        console.log(style)
        this.styleDefinitions.push(style);
      },
      debug: (msg) => {
        console.log(msg);
      },
      highlighter(code) {
        return highlight(code, languages.css);
      },
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.content-editor {
  margin-left: 1in;
  margin-right: 1in;
}

.style-editor {
  height: calc(100vh);

  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

</style>
