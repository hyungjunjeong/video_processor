<template>
  <v-container>
    <v-row justify="center">
      <v-btn color="primary" @click="goHome()">
        Home
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class HomeButton extends Vue {
  private goHome() {
    this.$router.push(`/`).catch((e) => console.log(e));
  }
}
</script>
