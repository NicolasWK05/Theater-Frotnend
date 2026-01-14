import { useNavigate, useParams } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";

import { Film } from "../types/Film";
import { getFilmById } from "../services/filmService";

export default function FilmDetails() {
  const params = useParams();
  const [film, setFilm] = createSignal<Film>();
  const [date, setDate] = createSignal<Date>(new Date()); // Date we want to show showtimes for

  const navigate = useNavigate();

  createEffect(() => {
    const filmId = params.id;
    console.log(`Fetching film with ID: ${filmId}`);

    getFilmById(Number(filmId), date()).then((film) => {
      setFilm(film);
    });
  });

  return (
    <div class="container mx-auto p-4">
      {film() ? (
        <div class="flex flex-col items-center">
          <h1 class="text-3xl font-bold mb-4">{film()?.title}</h1>
          <div class="flex flex-row items-center justify-center ">
            <img
              src={film()?.coverUrl}
              alt={`Poster for ${film()?.title}`}
              class="rounded-lg shadow-md mb-4 w-64"
            />
            <p class="text-gray-300 mb-4 w-4/10">{film()?.description}</p>{" "}
          </div>
          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700">
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(new Date(e.currentTarget.value))}
            />
          </div>

          <div class="mb-4">
            <h2 class="text-xl font-semibold mb-2">Showtimes:</h2>
            <div class="flex space-x-4">
              {film()?.showtimes.map((showtime) => (
                <span class="bg-sky-500 px-3 py-1 rounded-full text-sm font-medium">
                  <button
                    onClick={() =>
                      navigate(
                        `/showing?filmId=${film()?.id}&showtimeId=${showtime.id}`,
                      )
                    }
                  >
                    {showtime.startTime.getHours()}:
                    {showtime.startTime
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p class="">Loading film details...</p>
      )}
    </div>
  );
}
