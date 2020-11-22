<template>
  <v-container v-show="getPlayerVisibility">
    <v-row justify="center">
      <v-col>
        <video-player
          :class="['vjs-custom-skin', monochrome ? 'monochrome' : '']"
          ref="videoPlayer"
          :options="playerOptions"
        />
      </v-col>
      <v-col>
        <v-switch v-model="monochrome" :label="`monochrome`"></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import axios from "axios";

@Component({
  components: { videoPlayer },
})
export default class VideoPlayer extends Vue {
  public $refs!: {
    videoPlayer: any;
  };

  private monochrome = false;
  @(namespace("VideoModule").Getter("getFile"))
  private file!: File | null;

  @(namespace("VideoModule").Getter("getShowPlayer"))
  private getPlayerVisibility!: boolean;

  get player() {
    return this.$refs.videoPlayer.player;
  }

  // private playerStateChanged(event) {
  //   console.log("clicked", event);
  // }

  get playerOptions() {
    return {
      height: "360",
      autoplay: true,
      muted: true,
      language: "en",
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [
        {
          type: "video/mp4",
          src: this.file ? `http://localhost:3000/video/${this.file.name}` : "",
        },
      ],
      userActions: {
        hotkeys: function(event: any) {
          console.log("hello", event);

          // // `x` key = pause
          // if (event.which === 80) {
          //   this.player.pause();
          // }
          // // `y` key = play
          // if (event.which === 89) {
          //   this.player.play();
          // }
        },
      },
    };
  }

  created() {
    window.addEventListener("keypress", (e) => {
      if (e.key === "p") {
        this.player.pause();
      }

      if (e.key === "b") {
        const goback = this.player.currentTime() - 1.0;
        this.player.currentTime(goback);
      }
    });
  }
}
</script>
<style scoped>
.monochrome {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
}
</style>
