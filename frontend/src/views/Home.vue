<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <v-col cols="5" justify="center">
      <upload-file />
    </v-col>
    <!-- <v-col cols="12" justify="center">
      <video-player />
    </v-col> -->
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UploadFile from "@/components/UploadFile.vue";
// import VideoPlayer from "@/components/VideoPlayer.vue";

@Component({
  components: { UploadFile },
})
export default class HomeView extends Vue {}
</script>
