import { ImovieMeta, Ishowtime, Imovie } from "@/interfaces/movie";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import apiHelper from "@/store/apiHelper";
import { isMatched } from "../tools";

@Module({ namespaced: true, name: "MovieModule" })
export default class MovieModule extends VuexModule {
  public movies: ImovieMeta[] = [];
  public showtimes: Ishowtime[] = [];
  public tabIndex = 0;
  public searchKeyWord = "";

  @Action({ rawError: true })
  public async fetchMovies(): Promise<void> {
    const movies = await apiHelper.fetchAllMovies();
    this.setMovies(movies);
  }

  @Action({ rawError: true })
  public async fetchShowtimes(): Promise<void> {
    const showtimes = await apiHelper.fetchAllShowtimes();
    this.setShowtimes(showtimes);
  }

  @Mutation
  public setMovies(movies: ImovieMeta[]): void {
    this.movies = movies;
  }

  @Mutation
  public setShowtimes(showtimes: Ishowtime[]): void {
    this.showtimes = showtimes;
  }

  @Mutation
  public setTabIndex(newIndex: number): void {
    this.tabIndex = newIndex;
  }

  @Mutation
  public setKeyword(keyword: string): void {
    this.searchKeyWord = keyword;
  }

  get getMovies(): ImovieMeta[] {
    return this.movies;
  }

  get getShowtimes(): Ishowtime[] {
    return this.showtimes;
  }

  get getCinemaNames(): string[] {
    return this.showtimes.map((showtime) => showtime.name);
  }

  get getMovieInfoOfCinema(): Imovie[] {
    return Object.keys(this.showtimes[this.tabIndex].showtimes)
      .flatMap((movieID) => {
        const found = this.movies.find((movie) => movie.id === movieID);
        if (found) {
          if (isMatched(this.searchKeyWord, found.title)) {
            return {
              ...found,
              showtimes: this.showtimes[this.tabIndex].showtimes[movieID],
            };
          }
        }

        return [];
      })
      .sort((ma, mb) => ma.title.localeCompare(mb.title));
  }
}
