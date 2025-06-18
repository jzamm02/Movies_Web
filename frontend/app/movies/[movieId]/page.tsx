"use client";

import MovieCard from "@/components/MovieCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../../styles/pages/MovieDetails.module.scss";
import Header from "@/components/Header";
import { PlayIcon, Star } from "lucide-react";

const MovieDetails = () => {
  const { movieId } = useParams(); // Get the dynamic ID from the route
  interface Movie {
    movie_key: string;
    name: string;
    rate: number;
    genres?: string[];
  }

  const [movie, setMovie] = useState<Movie | null>(null); // Initialize as null for conditional rendering
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return; // Exit early if no movieId is present

    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/movies/${movieId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("Movie details fetched:", movie);
      }
    };

    fetchMovie();
  }, [movieId]); // Dependency ensures it refetches when movieId changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <div className="orb" />

      {loading ? (
        <p>Loading movie details...</p>
      ) : (
        <>
          <Header />
          <div className={styles.container}>
            <MovieCard
              id={movie.movie_key}
              title={movie.name}
              genres={movie.genres || []}
              rating={movie.rate}
              imageUrl={`/images/${movie.movie_key}.webp`}
              key={movie.movie_key}
              individual
            />
            <div className={`${styles["container-details"]}`}>
              <h1 className={`${styles["details-title"]}`}>{movie.name}</h1>

              <div className={`${styles["details-genre-container"]}`}>
                {movie.genres.map((genre, index) => (
                  <span key={index} className={`${styles["details-genre"]}`}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </span>
                ))}
              </div>
              <div className={`${styles["details-length"]}`}>
                <PlayIcon size={16} />
                <p>{movie.length}</p>
              </div>

              <div className={`${styles["details-rating"]}`}>
                <Star size={16} />
                <p>{movie.rate}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
