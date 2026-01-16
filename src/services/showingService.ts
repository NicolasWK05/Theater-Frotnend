import { Screening } from "~/types/Screening";

const mockScreenings: Screening[] = [
  {
    id: 1,
    filmId: 1,
    screenId: 1,
    startTime: "2025-11-27T12:00:00",
    endTime: "2025-11-27T13:00:00",
  },
  {
    id: 2,
    filmId: 1,
    screenId: 1,
    startTime: "2025-11-28T14:00:00",
    endTime: "2025-11-28T15:00:00",
  },
];

export const getShowings = async (): Promise<Screening[]> => {
  return mockScreenings;
};

export const getShowingById = async (id: number): Promise<Screening | null> => {
  return mockScreenings.find((s) => s.id === id) ?? null;
};

export const getShowingsByFilmId = async (
  filmId: number,
): Promise<Screening[]> => {
  return mockScreenings.filter((s) => s.filmId === filmId);
};
