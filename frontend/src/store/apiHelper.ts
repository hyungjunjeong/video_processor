import { ImovieMeta, Ishowtime } from "@/interfaces/movie";
import movieMetadata from "@/assets/data/movie_metadata.json";
import showtimes from "@/assets/data/theater_showtimes.json";
export default class ApiCallsHelper {
  public static async fetchAllMovies(): Promise<ImovieMeta[]> {
    return movieMetadata;
  }

  public static async fetchAllShowtimes(): Promise<Ishowtime[]> {
    return showtimes;
  }
}
