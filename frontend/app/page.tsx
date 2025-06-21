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
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [currentGenres, setCurrentGenres] = useState<string[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [allowScroll, setAllowScroll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
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
      <ShadowOverlay allowScroll={allowScroll} />
      <div className="orb" />
      <Header />
      <main>
        <HeroSection />
        <section>
          <MovieSectionHeader
            isShown={isShown}
            query={query}
            setQuery={setQuery}
            currentGenres={currentGenres}
            uniqueGenres={uniqueGenres}
            handleGenreSelect={handleGenreSelect}
            showAllMovies={showAllMovies}
          />
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
          <MovieGridSection
            filteredMovies={filteredMovies}
            isLoading={isLoading}
          />
        </section>
      </main>
      {isLoading ? null : <Footer />}
    </div>
  );
}
