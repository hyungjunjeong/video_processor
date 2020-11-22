<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            :disabled="file ? false : true"
            @click="startProcess()"
          >
            Process
          </v-btn>
        </template>
        <v-card>
          <v-flex>
            <v-card-text :class="`d-flex justify-center`">
              <span class="headline text-capitalize">Processing</span>
            </v-card-text>
            <v-card-text :class="`d-flex justify-center`">
              <v-progress-circular
                :rotate="-90"
                :size="100"
                :width="10"
                :indeterminate="loading"
                color="primary"
              ></v-progress-circular>
            </v-card-text>
            <v-card-text :class="`d-flex justify-center`">
              <!-- <span
                :class="[
                  `font-italic`,
                  getProgressionInfo.taskProgressionMessageColor,
                ]"
                >{{ getProgressionInfo.taskProgressionMessage }}</span
              > -->
            </v-card-text>
          </v-flex>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class ProceedButton extends Vue {
  @Prop({ type: File, required: false })
  private file!: File;

  private dialog = false;
  private loading = false;

  private async startProcess() {
    this.loading = true;
    const response = await axios.get(
      `http://localhost:3000/video/convert/${this.file.name}`
    );
    console.log(typeof response.data);
    // const videoURL = URL.createObjectURL(response.data);
    // const link = document.createElement("a");
    // link.href = videoURL;
    // link.setAttribute(
    //   "download",
    //   `${this.file.name.replace(".mp4", "")}_processed.mp4`
    // );
    // document.body.appendChild(link);
    // link.click();
    this.loading = false;
  }
}
</script>
