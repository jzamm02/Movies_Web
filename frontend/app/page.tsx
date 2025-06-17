"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { use, useEffect, useState } from "react";
import "@/styles/main.scss";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>
          {movies.map((movie, index) => (
            <li key={movie.movie_key + index.toString()}>
              <strong>{movie.name}</strong> - {movie.rate}/10
            </li>
          ))}
        </p>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
