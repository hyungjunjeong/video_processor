<template>
  <v-container>
    <v-card flat>
      <v-text-field
        v-model="keyword"
        label="Search movies..."
        outlined
      ></v-text-field>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
@Component({
  components: {},
})
export default class SearchBar extends Vue {
  @(namespace("MovieModule").Mutation("setKeyword"))
  private setKeyword!: (keyword: string) => void;

  @(namespace("MovieModule").State("searchKeyWord"))
  private searchKeyWord!: string;

  get keyword() {
    return this.searchKeyWord;
  }
  set keyword(newKeyword: string) {
    this.setKeyword(newKeyword);
  }
}
</script>
