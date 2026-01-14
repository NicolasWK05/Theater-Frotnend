import { createAsyncStore } from "@solidjs/router";
import { createSignal, createEffect, onCleanup } from "solid-js";
import { getFilmBanners } from "~/services/filmService";
import { Film } from "~/types/Film";

export default function SlidingTitles() {
  const [films, setFilms] = createSignal<Film[]>([]);
  const [currentIndex, setCurrentIndex] = createSignal(0);

  let imgs = films().map((film) => film.banner);

  createEffect(async () => {
    const bannerFilms = await getFilmBanners();
    setFilms(bannerFilms);
    imgs = films().map((film) => film.banner);
  });

  createEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, 3000);

    onCleanup(() => clearInterval(intervalId));
  });

  return (
    <div class="w-[1200px] h-64 overflow-hidden relative m-auto mt-5">
      {films().map((film, index) => (
        <a
          href={`/film/${film.id}`}
          style={{
            transform: `translateX(${(index - currentIndex()) * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
          class="absolute top-0 left-0 w-full h-full"
        >
          <img
            src={film.banner}
            class="w-full h-full rounded-xl object-cover"
            style={{
              "object-fit": "cover",
            }}
          />
        </a>
      ))}
    </div>
  );
}
