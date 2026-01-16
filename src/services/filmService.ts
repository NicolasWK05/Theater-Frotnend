import axios from "axios";
import { Film } from "../types/Film";
import { Screening } from "../types/Screening";

const API_URL = "http://localhost:5236/api";

export async function getAllFilms(): Promise<Film[]> {
  const response = await axios.get<Film[]>(`${API_URL}/films`);
  return response.data;
}

export async function getFilmById(id: number): Promise<Film | null> {
  try {
    const response = await axios.get<Film>(`${API_URL}/films/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function getScreeningsByFilmId(
  filmId: number,
): Promise<Screening[]> {
  const response = await axios.get<Screening[]>(
    `${API_URL}/screenings/films/${filmId}`,
  );
  return response.data;
}

export async function getFilmBanners(): Promise<Film[]> {
  const response = await axios.get(`${API_URL}/showcase`);

  // Showcase returns { id, film }
  return response.data.map((s: { film: Film }) => s.film);
}
