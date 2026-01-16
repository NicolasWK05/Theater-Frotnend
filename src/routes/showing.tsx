import { useSearchParams } from "@solidjs/router";
import { createSignal, createEffect, For, Show } from "solid-js";
import Nav from "~/components/Nav";

import { getShowingById } from "~/services/showingService";
import { getScreenById } from "~/services/screenService";

import type { Screening } from "~/types/Screening";
import type { Screen } from "~/types/Screen";

export default function Showtime() {
  const [searchParams] = useSearchParams();

  const showtimeId = Number(searchParams.screeningId);

  const [showing, setShowing] = createSignal<Screening>();
  const [screen, setScreen] = createSignal<Screen>();

  const [selectedSeats, setSelectedSeats] = createSignal<string[]>([]);
  const [seats, setSeats] = createSignal<string[]>([]);
  const [premiumSeats, setPremiumSeats] = createSignal<string[]>([]);

  // ---- Load screening + screen ----
  createEffect(() => {
    if (!showtimeId) return;

    (async () => {
      const showingData = await getShowingById(showtimeId);
      if (!showingData) return;

      const screenData = await getScreenById(showingData.screenId);
      if (!screenData) return;

      setShowing(showingData);
      setScreen(screenData);
    })();
  });

  // ---- Build seat layout ----
  createEffect(() => {
    const s = screen();
    if (!s) return;

    const allSeats: string[] = [];

    for (let row = 1; row <= s.rowCount; row++) {
      for (let col = 1; col <= s.columnCount; col++) {
        allSeats.push(`${row}-${col}`);
      }
    }

    setSeats(allSeats);

    const premium: string[] = [];
    for (const pr of s.premiumSeatRows ?? []) {
      for (let col = 1; col <= s.columnCount; col++) {
        premium.push(`P${pr.rowNumber}-${col}`);
      }
    }

    setPremiumSeats(premium);
  });

  const toggleSeat = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  return (
    <main class="text-center mx-auto p-4">
      <Nav />

      <Show when={screen()} fallback={<p>Loading screening...</p>}>
        <h2 class="text-xl font-semibold mb-4">Select your seats</h2>

        {/* NORMAL SEATS */}
        <div
          class="grid gap-2 mx-auto"
          style={{
            "grid-template-columns": `repeat(${screen()!.columnCount}, 3rem)`,
          }}
        >
          <For each={seats()}>
            {(seat) => (
              <button
                class={`h-12 w-12 rounded ${
                  selectedSeats().includes(seat)
                    ? "bg-gray-400"
                    : "bg-green-500"
                }`}
                onClick={() => toggleSeat(seat)}
              />
            )}
          </For>
        </div>

        {/* PREMIUM SEATS */}
        <Show when={premiumSeats().length > 0}>
          <h3 class="mt-6 font-semibold">Premium Seats</h3>

          <div
            class="grid gap-2 mx-auto mt-2"
            style={{
              "grid-template-columns": `repeat(${screen()!.columnCount}, 3rem)`,
            }}
          >
            <For each={premiumSeats()}>
              {(seat) => (
                <button
                  class={`h-12 w-12 rounded ${
                    selectedSeats().includes(seat)
                      ? "bg-gray-400"
                      : "bg-yellow-400"
                  }`}
                  onClick={() => toggleSeat(seat)}
                />
              )}
            </For>
          </div>
        </Show>

        <p class="mt-6">
          Selected seats:{" "}
          {selectedSeats().length ? selectedSeats().join(", ") : "None"}
        </p>
      </Show>
    </main>
  );
}
