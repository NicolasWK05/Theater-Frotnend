import { createSignal } from "solid-js";
import { Film } from "../types/Film";
import { getAllFilms } from "../services/filmService";

export default function Films() {
  const [films, setFilms] = createSignal<Film[]>([]);

  const fetchFilms = async () => {
    const data = await getAllFilms();
    setFilms(data);
  };

  fetchFilms();

  return (
    <div class="flex flex-wrap justify-center">
      {films().map((film: Film) => (
        <div class="justify-center text-center w-64 m-4">
          <a href={`/film/${film.id}`}>
            <img
              src={film.coverUrl}
              alt={film.title}
              class="h-80 object-cover rounded-md shadow-md"
            ></img>
            <p class="mt-2 font-semibold text-white">{film.title}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
