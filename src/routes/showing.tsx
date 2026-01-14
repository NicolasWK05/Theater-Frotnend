import { useParams, useSearchParams } from "@solidjs/router";
import Nav from "~/components/Nav";
import { createSignal, For } from "solid-js";
import { createEffect } from "solid-js";
import { getShowingById } from "~/services/showingService";
import { getFilmById } from "~/services/filmService";
import { getTheaterById } from "~/services/theaterService";
import type Showing from "~/types/Showing";
import type Theater from "~/types/Theater";

export default function Showtime() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showing, setShowing] = createSignal<Showing>();
  const [theater, setTheater] = createSignal<Theater>();
  const showtimeId = searchParams.showtimeId;
  const filmId = searchParams.filmId;

  if (!showtimeId || !filmId) {
    return <div>Invalid parameters</div>;
  }

  createEffect(async () => {
    const showingData = await getShowingById(Number(showtimeId));

    if (!showingData) {
      return;
    }

    const theaterData = await getTheaterById(showingData.theaterId);

    if (!theaterData) {
      return;
    }

    setShowing(showingData);
    setTheater(theaterData);
  });

  const [selectedSeats, setSelectedSeats] = createSignal<string[]>([]);
  const [seats, setSeats] = createSignal<string[]>([]);
  const [premiumSeats, setPremiumSeats] = createSignal<string[]>([]);

  createEffect(() => {
    if (!theater()) {
      return;
    }

    const numRows = (theater() as Theater).seats / 10;
    const seatsPerRow = Math.floor((theater() as Theater).seats / numRows);
    const numPremiumRows = 2;
    const premiumSeatsPerRow = (theater() as Theater).premiumSeats
      ? Math.floor((theater() as Theater).premiumSeats / numPremiumRows)
      : 0;

    const availableSeats: string[] = [];
    for (let row = 1; row <= numRows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        availableSeats.push(`${row}-${seat}`);
      }
    }
    setSeats(availableSeats);

    const availablePremiumSeats: string[] = [];
    for (let row = 1; row <= numPremiumRows; row++) {
      for (let seat = 1; seat <= premiumSeatsPerRow; seat++) {
        availablePremiumSeats.push(`P${row}-${seat}`);
      }
    }
    setPremiumSeats(availablePremiumSeats);
  });

  const toggleSeat = (seatNumber: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  return (
    <main class="text-center mx-auto p-4 justify-center">
      <Nav />
      <p>Showing test</p>
      <h2>Select your seats:</h2>
      <div class="flex justify-center">
        <div class="flex">
          <div class="flex flex-col justify-center">
            <For
              each={Array.from(
                { length: seats().length / 10 },
                (_, i) => i + 1,
              )}
            >
              {(row) => (
                <div class="my-5 border-slate-950 border-2 rounded-full p-1">
                  {row}
                </div>
              )}
            </For>
          </div>
          <div class="grid grid-cols-10 gap-y-2 gap-x-2 mx-auto place-items-center px-20">
            <For each={seats()}>
              {(seat) => {
                const seatNumber = seat.split("-")[1];
                return (
                  <button
                    class={`rounded h-12 w-12 ${
                      selectedSeats().includes(seat)
                        ? "bg-gray-200 text-white"
                        : "bg-green-500"
                    }`}
                    onClick={() => toggleSeat(seat)}
                  ></button>
                );
              }}
            </For>
          </div>
        </div>
      </div>
      <div class="h-5"></div> {/* For spacing */}
      {premiumSeats().length > 0 && (
        <div class="flex justify-center">
          <div class="flex">
            <div class="flex flex-col justify-center">
              <For
                each={Array.from(
                  { length: premiumSeats().length / 10 },
                  (_, i) => i + 1,
                )}
              >
                {(row) => (
                  <div class="my-5 border-slate-950 border-2 rounded-full p-1">
                    P{row}
                  </div>
                )}
              </For>
            </div>
            <div class="grid grid-cols-10 gap-y-5 gap-x-2 mx-auto place-items-center px-20">
              <For each={premiumSeats()}>
                {(seat) => {
                  const seatNumber = seat.split("-")[1];
                  return (
                    <button
                      class={`rounded h-12 w-12 ${
                        selectedSeats().includes(seat)
                          ? "bg-gray-200 text-white"
                          : "bg-yellow-400"
                      }`}
                      onClick={() => toggleSeat(seat)}
                    ></button>
                  );
                }}
              </For>
            </div>
          </div>
        </div>
      )}
      <div class="h-5"></div> {/* For spacing */}
      <p class="mx-4">
        Selected Seats:{" "}
        {selectedSeats().length > 0 ? selectedSeats().join(", ") : "None"}
      </p>
    </main>
  );
}
