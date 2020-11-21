<template>
  <v-container>
    <v-card flat>
      <v-tabs v-model="tabIndex" slider-color="primary">
        <v-tab v-for="title in cinemaNames" :key="title">{{ title }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabIndex">
        <v-tab-item v-for="title in cinemaNames" :key="title">
          <v-card class="d-flex flex-column justify-start">
            <v-list>
              <v-list-item v-for="movie in movies" :key="movie.id">
                <v-container class="pa-0">
                  <v-row>
                    <v-col cols="3">
                      <v-img max-height="20vh" :src="movie.poster">
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                    <v-col cols="9" class="text-xs-center align-center ">
                      <h2 class="mb-2">
                        {{ movie.title }}
                        <span class="headline">({{ movie.rating }})</span>
                      </h2>
                      <span
                        v-for="showtime in movie.showtimes"
                        :key="showtime"
                        class="headline mr-2"
                        style="white-space:nowrap;"
                        >{{ showtime }}</span
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Imovie, ImovieMeta } from "../interfaces/movie";
@Component({
  components: {},
})
export default class MainTab extends Vue {
  @(namespace("MovieModule").Action("fetchMovies"))
  private fetchMovies!: () => Promise<void>;

  @(namespace("MovieModule").Action("fetchShowtimes"))
  private fetchShowtimes!: () => Promise<void>;

  @(namespace("MovieModule").Getter("getCinemaNames"))
  private cinemaNames!: () => string[];

  @(namespace("MovieModule").Getter("getMovieInfoOfCinema"))
  private movies!: () => Imovie[];

  @(namespace("MovieModule").State("tabIndex"))
  private tab!: number;

  @(namespace("MovieModule").Mutation("setTabIndex"))
  private setTabIndex!: (newIndex: number) => void;

  get tabIndex() {
    return this.tab;
  }

  set tabIndex(newIndex: number) {
    this.setTabIndex(newIndex);
  }

  private created() {
    this.fetchMovies();
    this.fetchShowtimes();
  }
}
</script>
