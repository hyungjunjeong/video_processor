<template>
  <v-container>
    <v-file-input
      dense
      outlined
      accept=".mp4"
      show-size
      counter
      label="Upload video"
      :rules="[requiredRule]"
      @change="updateFile"
    ></v-file-input>
    <v-row>
      <v-col cols="6">
        <proceed-button :file="file" />
      </v-col>
      <v-col cols="6">
        <play-button :file="file" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ProceedButton from "@/components/ProceedButton.vue";
import PlayButton from "@/components/PlayButton.vue";
import axios from "axios";
@Component({
  components: { ProceedButton, PlayButton },
})
export default class UploadFile extends Vue {
  // eslint-disable-next-line
  private requiredRule: any = (v: any) => !!v || "This field is required";
  private file: File | null = null;

  @(namespace("VideoModule").Mutation("setFileinfo"))
  private setFile!: (file: File | null) => void;

  private updateFile(newFile: File | null) {
    this.file = newFile;
    this.setFile(newFile);
    if (newFile) {
      const formData = new FormData();
      formData.append(newFile.name, newFile, newFile.name);
      axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  }
}
</script>
