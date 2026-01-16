import { Film } from "./Film";

export interface Screening {
  id: number;
  filmId: number;
  screenId: number;

  startTime: string; // ISO datetime
  endTime: string;

  film?: Film;
  screen?: Screen;
}
