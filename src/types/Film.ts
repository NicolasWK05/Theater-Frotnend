import Showing from "./Showing";

export interface Film {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
  releaseYear: number;
  genre: string[];
  rating: number;
  director: string;
  actors: string[];
  duration: number;
  trailerUrl: string;
  showtimes: Showing[];

  banner?: string;
}
