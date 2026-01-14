import { A } from "@solidjs/router";
import FilmDetails from "~/components/filmDetails";
import Nav from "~/components/Nav";

export default function Film() {
  return (
    <main class="text-center mx-auto p-4">
      <Nav />
      <FilmDetails />
    </main>
  );
}
