import axios from "axios";
import type { Screen } from "~/types/Screen";

const BASE_URL = "http://localhost:5236/api/screens";

export async function getAllScreens(): Promise<Screen[]> {
  const res = await axios.get<Screen[]>(BASE_URL);
  return res.data;
}

export async function getScreenById(id: number): Promise<Screen | null> {
  try {
    const res = await axios.get<Screen>(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch screen", err);
    return null;
  }
}
