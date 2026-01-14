import { Film } from "../types/Film";
import Showing from "../types/Showing";
import { getShowingById, getShowingByFilmId } from "./showingService";

const mockedFilms: Film[] = [
  {
    id: 1,
    title: "Avatar: Fire and Ash",
    description:
      "Jake and Neytiri's family grapples with grief after Neteyam's death, encountering a new, aggressive Na'vi tribe, the Ash People, who are led by the fiery Varang, as the conflict on Pandora escalates and a new moral focus emerges.",
    coverUrl:
      "https://herlev.bigbio.dk/data/TempFolderLongTerm//mediacache_3f12772d96cc35e23fb8c9493d4753ad.jpg",
    releaseYear: 2024,
    genre: ["Action", "Sci-Fi"],
    rating: 7.5,
    director: "James Cameron",
    actors: ["Some Actor", "Some Other Actor"],
    duration: 120,
    trailerUrl: "https://www.youtube.com/watch?v=someTrailerId",
    showtimes: [],
    banner:
      "https://herlev.bigbio.dk/data/TempFolderLongTerm//mediacache_2c0a43c018472e32da20232bcdc1b02b.jpg",
  },
  {
    id: 2,
    title: "The Housemaid",
    description: "",
    coverUrl:
      "https://herlev.bigbio.dk/data/TempFolderLongTerm//mediacache_ae5fd1cfc3b364c6e425ac60e5ca91a5.jpg",
    releaseYear: 2023,
    genre: ["Thriller", "Drama"],
    rating: 6.8,
    director: "Some Director",
    actors: ["Some Actor", "Some Other Actor"],
    duration: 110,
    trailerUrl: "https://www.youtube.com/watch?v=someTrailerId",
    showtimes: [],
  },
  {
    id: 3,
    title: "Die Hard",
    description: "",
    coverUrl:
      "https://herlev.bigbio.dk/data/TempFolderLongTerm//mediacache_6006219fa90e7f5c4ef6c97afe86a47d.jpg",
    releaseYear: 1988,
    genre: ["Action", "Thriller"],
    rating: 8.2,
    director: "John McTiernan",
    actors: ["Bruce Willis", "Alan Rickman"],
    duration: 132,
    trailerUrl: "https://www.youtube.com/watch?v=someTrailerId",
    showtimes: [],
  },
  {
    id: 4,
    title: "Zootopia 2",
    description: "",
    coverUrl:
      "https://m.media-amazon.com/images/M/MV5BYjg1Mjc3MjQtMTZjNy00YWVlLWFhMWEtMWI3ZTgxYjJmNmRlXkEyXkFqcGc@._V1_.jpg",
    releaseYear: 2025,
    genre: ["Action", "Adventure"],
    rating: 7.5,
    director: "Jared Bush, Byron Howard",
    actors: ["Izabella Mikołajczyk", "John Goodman"],
    duration: 120,
    trailerUrl: "https://www.youtube.com/watch?v=someTrailerId",
    showtimes: [],
    banner:
      "https://herlev.bigbio.dk/data/TempFolderLongTerm//mediacache_4638c79b7304ac25c785327f223244b3.jpg",
  },
];

export async function getAllFilms(): Promise<Film[]> {
  return mockedFilms;
}

export async function getFilmById(
  id: number,
  date: Date,
): Promise<Film | undefined> {
  const film = mockedFilms.find((film) => film.id === id);
  if (film) {
    const showings = await getShowingByFilmId(id);

    if (!showings) {
      return film;
    }

    const showingsOnDate = showings.filter((showtime) => {
      return (
        showtime.startTime.getFullYear() === date.getFullYear() &&
        showtime.startTime.getMonth() === date.getMonth() &&
        showtime.startTime.getDate() === date.getDate()
      );
    });
    return { ...film, showtimes: showingsOnDate };
  }
  return film;
}

export async function getFilmBanners(): Promise<Film[]> {
  return mockedFilms.filter((film) => film.banner);
}
