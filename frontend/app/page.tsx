"use client";

import { useEffect, useMemo, useState } from "react";
import "@/styles/main.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShadowOverlay from "@/components/Dashboard/ShadowOverlay";
import HeroSection from "@/components/Dashboard/HeroSection";
import MovieSectionHeader from "@/components/Dashboard/MovieSectionHeader";
import MovieGridSection from "@/components/Dashboard/MovieGridSection";

export default function Home() {
  const [movies, setMovies] = useState<
    {
      id: number;
      name: string;
      genres: string[];
      rate: number;
      movie_key: string;
    }[]
  >([]);
  const [query, setQuery] = useState("");
  const [currentGenres, setCurrentGenres] = useState<string[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [allowScroll, setAllowScroll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    console.log("Fetching movies from API:", apiUrl);

    fetch(`${apiUrl}/api/movies`)
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

  interface GenreSelectHandler {
    (genre: string): void;
  }

  const handleGenreSelect: GenreSelectHandler = (genre) => {
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
      <ShadowOverlay allowScroll={allowScroll} />
      <div className="orb" aria-hidden="true" />
      <Header aria-label="Site header" />
      <main role="main" aria-label="Movie browsing main content">
        <HeroSection aria-label="Hero promotional section" />
        <section aria-labelledby="movie-section-heade">
          <MovieSectionHeader
            isShown={isShown}
            query={query}
            setQuery={setQuery}
            currentGenres={currentGenres}
            uniqueGenres={uniqueGenres}
            handleGenreSelect={handleGenreSelect}
            showAllMovies={showAllMovies}
            aria-label="Movie filter and search section"
          />
          {isLoading ? (
            <div
              className="spinner-container"
              role="status"
              aria-live="polite"
              aria-label="Loading movies"
            >
              <div className="loader" />
            </div>
          ) : null}

          <div
            className="genre-container"
            aria-live="polite"
            aria-label="Selected genres"
          >
            {currentGenres.map((genre, index) => (
              <p key={index + genre} className="genre-tag">
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </p>
            ))}
          </div>
          <MovieGridSection
            filteredMovies={filteredMovies}
            isLoading={isLoading}
            isShown={isShown}
            aria-label="Filtered movie list"
          />
        </section>
      </main>
      {isLoading ? null : <Footer aria-label="Site footer" />}
    </div>
  );
}
