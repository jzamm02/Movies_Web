"use client";

import { useEffect, useState } from "react";
import "@/styles/main.scss";
import { ArrowDown, Clapperboard, Star } from "lucide-react";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import Header from "@/components/Header";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <div>
      <div className="orb" />
      <Header />
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
        <section>
          <div className="section-header">
            <h2>SHOWCASE</h2>
            <div>
              <button className="btn">View All</button>
            </div>
          </div>
          <div className="grid-container">
            {movies.map((movie, index) => (
              // <li key={movie.movie_key + index.toString()}>
              //   <strong>{movie.name}</strong> - {movie.rate}/10
              // </li>
              <MovieCard
                id={movie.id}
                title={movie.name}
                genres={movie.genres}
                rating={movie.rate}
                imageUrl={`/images/${movie.movie_key}.webp`}
                key={movie.movie_key + index.toString()}
              />
            ))}
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}
