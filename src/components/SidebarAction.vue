<template>
  <q-item
    clickable
    @click="callTarget(target)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component({
  props: {
    icon: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    }
  }
})
export default class SidebarAction extends Vue {
  callTarget(target: string): void {
    this.$store.commit('sidebar/target', target);
  }
}
</script>
