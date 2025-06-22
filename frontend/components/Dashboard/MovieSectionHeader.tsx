import { AnimatePresence, motion } from "motion/react";
import SearchBar from "../SearchBar";
import Dropdown from "./DropdownMenu";
import styles from "../../styles/components/MovieSectionHeader.module.scss";

const shakeAnimation = {
  rotate: [0, -7, 7, -5, 5, -3, 3, 0],
  transition: {
    duration: 0.6,
    ease: "easeOut",
    repeat: Infinity,
    repeatDelay: 1.5, // time between shakes in seconds
  },
};

interface MovieSectionHeaderProps {
  isShown: boolean;
  query: string;
  setQuery: (value: string) => void;
  currentGenres: string[];
  uniqueGenres: string[];
  handleGenreSelect: (genre: string) => void;
  showAllMovies: () => void;
}

const MovieSectionHeader: React.FC<MovieSectionHeaderProps> = ({
  isShown,
  query,
  setQuery,
  currentGenres,
  uniqueGenres,
  handleGenreSelect,
  showAllMovies,
}) => {
  return (
    <section
      className={styles["section-header"]}
      aria-label="Movie filter and search section"
    >
      <h2 id="showcase-heading">SHOWCASE</h2>
      <AnimatePresence>
        {isShown ? (
          <>
            <motion.div
              key="filters"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={styles["search-menu-container"]}
            >
              <SearchBar query={query} setQuery={setQuery} />
              <Dropdown
                options={uniqueGenres}
                onSelect={handleGenreSelect}
                activeOptions={currentGenres}
              />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
      {isShown ? null : (
        <motion.div animate={shakeAnimation}>
          <div
            className="btn btn-shimmer"
            onClick={showAllMovies}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                showAllMovies();
              }
            }}
            aria-label="View all movies"
            tabIndex={0}
          >
            View All
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default MovieSectionHeader;
