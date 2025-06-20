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
import Footer from "@/components/Footer";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [currentGenres, setCurrentGenres] = useState<string[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [allowScroll, setAllowScroll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  const filteredMovies = movies.filter((movie) => {
    // If genres are selected, filter by genres and query
    if (currentGenres.length > 0) {
      return (
        currentGenres.every((genre) => movie.genres.includes(genre)) &&
        movie.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    // If no genres are selected, fallback to query filter
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
    setAllowScroll(true);
  };

  return (
    <div className={allowScroll ? "" : "no-scroll"}>
      {allowScroll ? null : <div className="locked-shadow-overlay" />}
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
                <div className="search-menu-container">
                  <SearchBar query={query} setQuery={setQuery} />
                  <Dropdown
                    options={uniqueGenres}
                    onSelect={handleGenreSelect}
                    activeOptions={currentGenres}
                  />
                </div>
              </>
            ) : null}
            {isShown ? null : (
              <div className="btn" onClick={showAllMovies}>
                View All
              </div>
            )}
          </div>
          {isLoading ? (
            <div className="spinner-container">
              <div className="loader" />
            </div>
          ) : null}

          <div className="genre-container">
            {currentGenres.map((genre, index) => (
              <p key={index + genre} className="genre-tag">
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </p>
            ))}
          </div>
          {filteredMovies.length > 0 ? (
            <div className="grid-container">
              {filteredMovies.map((movie, index) => (
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
          ) : isLoading ? null : (
            <div className="not-found-container">
              <p className="not-found">No movies found...</p>
            </div>
          )}
        </section>
      </main>
      {isLoading ? null : <Footer />}
    </div>
  );
}
