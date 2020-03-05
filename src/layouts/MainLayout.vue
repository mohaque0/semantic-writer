<template>
  <q-layout view="lHh lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      :mini="leftDrawerMini"
      behavior="desktop"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <SidebarAction
          v-for="link in sidebar"
          :key="link.icon"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import SidebarAction from '@/components/SidebarAction.vue'

@Component({
  components: {
    SidebarAction
  },
})
export default class MainLayout extends Vue {

  data () {
    return {
      leftDrawerOpen: true,
      leftDrawerMini: true,
      sidebar: [
        {
          icon: 'settings',
          target: 'settings'
        },
        {
          icon: 'mdi-format-header-1',
          target: 'h1'
        },
        {
          icon: 'mdi-format-header-2',
          target: 'h2'
        },
        {
          icon: 'mdi-format-header-3',
          target: 'h3'
        },
        {
          icon: 'mdi-format-header-4',
          target: 'h4'
        },
        {
          icon: 'mdi-format-header-5',
          target: 'h5'
        },
        {
          icon: 'mdi-format-header-6',
          target: 'h6'
        },
        {
          icon: 'format_list_bulleted',
          target: 'list_bulleted'
        },
        {
          icon: 'format_list_numbered',
          target: 'list_numbered'
        },
        {
          icon: 'format_quote',
          target: 'blockquote'
        },
        {
          icon: 'mdi-format-pilcrow',
          target: 'text'
        },
      ]
    }
  }
}
</script>
