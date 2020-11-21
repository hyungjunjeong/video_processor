<template>
  <v-container fluid class="d-flex justify-center align-center">
    <v-col cols="5" justify="center">
      <SearchBar />
      <MainTab />
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MainTab from "@/components/MainTab.vue";
import SearchBar from "@/components/SearchBar.vue";

@Component({
  components: { MainTab, SearchBar },
})
export default class HomeView extends Vue {}
</script>
