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
          >
            Process
          </v-btn>
        </template>
        <v-card>
          <v-container> </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ProceedButton extends Vue {
  @Prop({ type: File, required: false })
  private file!: File;

  private dialog = false;
}
</script>
