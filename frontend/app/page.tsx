"use client";

import { useEffect, useState } from "react";
import "@/styles/main.scss";
import { ArrowDown, Clapperboard } from "lucide-react";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div>
      <div className="orb" />
      <header>
        <div className="header-container">
          <div className="web-title-container">
            <Clapperboard size={18} strokeWidth={2} />
            <p className="web-title">Movie Collection</p>
          </div>
          <div className="header-links">
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>
      </header>
      <main>
        <div>
          <h1 className="main-header">
            Explore a collection of top movies and classics
          </h1>
          <div className="arrow-container">
            <ArrowDown size={36} />
          </div>
          <div className="dotted-line" />
        </div>
        <section></section>
        <p>
          {movies.map((movie, index) => (
            <li key={movie.movie_key + index.toString()}>
              <strong>{movie.name}</strong> - {movie.rate}/10
            </li>
          ))}
        </p>
      </main>
      <footer></footer>
    </div>
  );
}
