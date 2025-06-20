import { AnimatePresence, motion } from "motion/react";
import SearchBar from "../SearchBar";
import Dropdown from "./DropdownMenu";
import styles from "../../styles/components/MovieSectionHeader.module.scss";

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
    <div className={styles["section-header"]}>
      <h2>SHOWCASE</h2>
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
        <div className="">
          <div className="btn btn-shimmer" onClick={showAllMovies}>
            View All
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSectionHeader;
