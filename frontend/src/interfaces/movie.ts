export interface ImovieMeta {
  id: string;
  title: string;
  rating: string;
  poster: string;
}

export interface Imovie extends ImovieMeta {
  showtimes: string[] | undefined;
}

export interface Ishowtime {
  id: string;
  name: string;
  showtimes: { [movieID: string]: string[] | undefined };
}
