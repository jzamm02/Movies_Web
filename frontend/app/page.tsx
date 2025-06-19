"use client";

import { useEffect, useMemo, useState } from "react";
import "@/styles/main.scss";
import {
  ArrowDown,
  ChevronDown,
  Clapperboard,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import Dropdown from "@/components/DropdownMenu";
import { Button } from "@/components/Button";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [currentGenres, setCurrentGenres] = useState<string[]>([]);
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  const filteredMovies = movies.filter((movie) => {
    // Filter by genres if any are selected
    if (currentGenres.length > 0) {
      return currentGenres.every((genre) => movie.genres.includes(genre));
    }
    // Fallback to query filter if no genres are selected
    return (
      query === "" || movie.name.toLowerCase().includes(query.toLowerCase())
    );
  });

  useEffect(() => {
    setQuery("");
  }, [currentGenres]);

  const uniqueGenres = useMemo(() => {
    return Array.from(new Set(movies.flatMap((movie) => movie.genres)));
  }, [movies]);

  const handleGenreSelect = (genre) => {
    console.log("Selected Genre:", genre);
    if (currentGenres.includes(genre)) {
      setCurrentGenres(currentGenres.filter((g) => g !== genre));
    } else {
      setCurrentGenres([...currentGenres, genre]);
    }
    console.log("Current Genres:", currentGenres);
  };

  const showAllMovies = () => {
    setIsShown(true);
  };

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
            <ArrowDown size={44} />
          </div>
          <div className="dotted-line" />
        </div>
        <section>
          <div className="section-header">
            <h2>SHOWCASE</h2>
            {isShown ? (
              <>
                <SearchBar query={query} setQuery={setQuery} />
                <Dropdown options={uniqueGenres} onSelect={handleGenreSelect} />
              </>
            ) : null}
            {isShown ? null : (
              <div className="btn" onClick={showAllMovies}>
                View All
              </div>
            )}
          </div>

          <p>{currentGenres}</p>
          <div className="grid-container">
            {filteredMovies.map((movie, index) => (
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
