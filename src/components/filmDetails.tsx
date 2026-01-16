import { useNavigate, useParams } from "@solidjs/router";
import { createSignal, createEffect, For } from "solid-js";

import { Film } from "../types/Film";
import { Screening } from "../types/Screening";
import { getFilmById, getScreeningsByFilmId } from "../services/filmService";

export default function FilmDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = createSignal<Film | null>(null);
  const [screenings, setScreenings] = createSignal<Screening[]>([]);
  const [date, setDate] = createSignal(new Date());

  // Load film + screenings
  createEffect(() => {
    const filmId = Number(params.id);
    if (!filmId) return;

    getFilmById(filmId).then(setFilm);
    getScreeningsByFilmId(filmId).then(setScreenings);
  });

  // Filter screenings by selected date
  const filteredScreenings = () => {
    const selected = date().toISOString().slice(0, 10);

    return screenings().filter((s) => s.startTime.startsWith(selected));
  };

  return (
    <div class="container mx-auto p-4">
      {film() ? (
        <div class="flex flex-col items-center">
          <h1 class="text-3xl font-bold mb-4">{film()!.title}</h1>

          <div class="flex flex-row items-center justify-center gap-6">
            <img
              src={film()!.coverUrl}
              alt={`Poster for ${film()!.title}`}
              class="rounded-lg shadow-md w-64"
            />
            <p class="text-gray-300 max-w-xl">{film()!.description}</p>
          </div>

          {/* Date Picker */}
          <div class="my-6 w-64">
            <label class="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              class="w-full rounded-md border p-2"
              value={date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(new Date(e.currentTarget.value))}
            />
          </div>

          {/* Showtimes */}
          <div class="w-full max-w-xl">
            <h2 class="text-xl font-semibold mb-3">Showtimes</h2>

            <div class="flex flex-wrap gap-3">
              <For each={filteredScreenings()}>
                {(screening) => {
                  const time = new Date(screening.startTime);

                  return (
                    <button
                      class="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-full text-sm font-medium"
                      onClick={() =>
                        navigate(
                          `/showing?filmId=${film()!.id}&screeningId=${screening.id}`,
                        )
                      }
                    >
                      {time.getHours()}:
                      {time.getMinutes().toString().padStart(2, "0")}
                    </button>
                  );
                }}
              </For>

              {filteredScreenings().length === 0 && (
                <p class="text-gray-400">No screenings on this date</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading film details...</p>
      )}
    </div>
  );
}
