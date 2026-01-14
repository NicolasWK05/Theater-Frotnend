import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-sky-800 rounded-xl">
      <ul class="container flex items-center justify-center p-3 text-gray-200">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Program</a>
        </li>
        <li class={`border-b-2 ${active("/upcomming")} mx-1.5 sm:mx-6`}>
          <a href="/upcomming">Upcomming</a>
        </li>
        <li class={`border-b-2 ${active("/all-films")} mx-1.5 sm:mx-6`}>
          <a href="/all-films">All Films</a>
        </li>
        <li class={`border-b-2 ${active("/contact")} mx-1.5 sm:mx-6`}>
          <a href="/contact">Contact</a>
        </li>
        <li class={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
}
