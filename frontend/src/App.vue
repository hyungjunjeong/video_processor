<template>
  <v-app>
    <v-main>
      <keep-alive :include="[]">
        <router-view />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class App extends Vue {}
</script>
