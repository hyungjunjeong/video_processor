<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <video-player />
    <home-button />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VideoPlayer from "@/components/VideoPlayer.vue";
import HomeButton from "@/components/HomeButton.vue";

@Component({
  components: { HomeButton, VideoPlayer },
})
export default class PlayView extends Vue {}
</script>
