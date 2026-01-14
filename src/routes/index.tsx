import { A } from "@solidjs/router";
import Films from "~/components/Films";
import Nav from "~/components/Nav";
import SlidingTitles from "~/components/SlidingTitles";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Nav />
      <SlidingTitles />
      <div class="m-10 flex items-center justify-start">
        <Films></Films>
      </div>
    </main>
  );
}
