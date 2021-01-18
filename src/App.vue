<template>
  <div id="app">
    <SemanticEditor msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import SemanticEditor from './components/SemanticEditor.vue'

export default {
  name: 'App',
  components: {
    SemanticEditor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
