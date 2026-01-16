import axios from "axios";
import type { Theater } from "~/types/Theater";

const BASE_URL = "http://localhost:5236/api/theaters";

export async function getAllTheaters(): Promise<Theater[]> {
  const res = await axios.get<Theater[]>(BASE_URL);
  return res.data;
}

export async function getTheaterById(id: number): Promise<Theater | null> {
  try {
    const res = await axios.get<Theater>(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch theater", err);
    return null;
  }
}
