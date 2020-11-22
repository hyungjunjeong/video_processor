<template>
  <v-container>
    <v-row justify="center">
      <v-btn
        color="primary"
        :disabled="file ? false : true"
        @click="showPlayer()"
      >
        Play
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

@Component({
  components: {},
})
export default class PlayButton extends Vue {
  @Prop({ type: File, required: false })
  private file!: File;

  @(namespace("VideoModule").Mutation("setPlayerVisibility"))
  private setPlayerVisibility!: (show: boolean) => void;

  private showPlayer() {
    this.setPlayerVisibility(true);
    this.$router.push(`/play`).catch((e) => console.log(e));
  }
}
</script>
