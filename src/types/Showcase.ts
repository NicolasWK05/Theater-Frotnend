import { Film } from "./Film";

export interface Showcase {
  id: number;
  filmId: number;
  film?: Film;
}
