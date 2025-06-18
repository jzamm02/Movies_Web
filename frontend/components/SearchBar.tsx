import React, { useRef, useState } from "react";
import { Search } from "lucide-react"; // Assuming you're using lucide-react for the icon
import styles from "../styles/components/SearchBar.module.scss";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`${styles["search-container"]}`} onClick={focusInput}>
      <Search size={18} className={`${styles["search-icon"]}`} />
      <input
        className={`${styles["search-input"]}`}
        ref={inputRef}
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
