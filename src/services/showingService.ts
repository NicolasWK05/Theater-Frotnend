import Showing from "~/types/Showing";

const mockShowings: Showing[] = [
  {
    id: 1,
    filmId: 1,
    theaterId: 1,
    startTime: new Date("2025-11-27T12:00:00"),
    endTime: new Date("2025-11-27T13:00:00"),
    seatsTaken: [],
  },
  {
    id: 2,
    filmId: 1,
    theaterId: 1,
    startTime: new Date("2025-11-28T14:00:00"),
    endTime: new Date("2025-11-28T15:00:00"),
    seatsTaken: [],
  },
];

export const getShowings = async (): Promise<Showing[]> => {
  return mockShowings;
};

export const getShowingById = async (id: number): Promise<Showing | null> => {
  const showing = mockShowings.find((s) => s.id === id);
  return showing || null;
};

export const getShowingByFilmId = async (
  filmId: number,
): Promise<Showing[] | null> => {
  const showings = mockShowings.filter((s) => s.filmId === filmId);
  return showings.length > 0 ? showings : null;
};
