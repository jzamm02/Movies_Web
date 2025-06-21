import MovieCard from "../MovieCard";
import styles from "../../styles/components/MovieGridSection.module.scss";

interface MovieGridSectionProps {
  filteredMovies: {
    id: number;
    name: string;
    genres: string[];
    rate: number;
    movie_key: string;
  }[];
  isLoading: boolean;
  isShown?: boolean;
}

const MovieGridSection: React.FC<MovieGridSectionProps> = ({
  filteredMovies,
  isLoading,
  isShown,
}) => {
  return (
    <section role="region" aria-label="Filtered movie list" aria-live="polite">
      {filteredMovies.length > 0 ? (
        <div className={styles["grid-container"]}>
          {filteredMovies.map((movie, index) => (
            <MovieCard
              id={movie.id}
              title={movie.name}
              genres={movie.genres}
              rating={movie.rate}
              imageUrl={`/images/${movie.movie_key}.webp`}
              key={movie.movie_key + index.toString()}
              isShown={isShown}
            />
          ))}
        </div>
      ) : isLoading ? null : (
        <div className={styles["not-found-container"]} role="alert">
          <p className={styles["not-found"]}>No movies found...</p>
        </div>
      )}
    </section>
  );
};

export default MovieGridSection;
