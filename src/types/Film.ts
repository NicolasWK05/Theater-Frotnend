import { Screening } from "./Screening";

export interface Film {
  id: number;
  title: string;
  director: string;
  genre: string;
  duration: number;
  releaseDate: Date;
  description: string;
  coverUrl: string;
  trailerUrl: string;
  bannerUrl: string;

  showtimes: Screening[];
}
