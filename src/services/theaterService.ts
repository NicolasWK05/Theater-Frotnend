import Theater from "~/types/Theater";

const mockTheaters: Theater[] = [
  {
    id: 1,
    name: "Theater 1",
    seats: 60,
    premiumSeats: 20,
  },
];

export const getTheaterById = async (id: number): Promise<Theater | null> => {
  const theater = mockTheaters.find((t) => t.id === id);
  if (!theater) return null;
  return theater;
};
