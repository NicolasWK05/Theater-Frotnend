import { Route, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import FilmDetails from "./components/filmDetails";
import Film from "./routes/film";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <Route path="/film/:id" component={Film}></Route>
      <FileRoutes />
    </Router>
  );
}
