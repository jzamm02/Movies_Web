import React, { use, useEffect, useRef, useState } from "react";
import styles from "../../styles/components/DropdownMenu.module.scss";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  activeOptions?: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  activeOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("Active Options:", activeOptions);
  }, [activeOptions]);

  return (
    <div className={styles["dropdown-container"]} ref={dropdownRef}>
      <div
        className={styles["dropdown-header"]}
        onClick={toggleDropdown}
        onKeyDown={toggleDropdown}
        tabIndex={0}
      >
        {"Genres"}
        <ChevronDown size={16} className={styles.icon} />
      </div>
      {isOpen && (
        <ul className={styles["dropdown-list"]}>
          {options.map((option, index) => (
            <li
              key={index}
              className={
                activeOptions?.includes(option)
                  ? styles["dropdown-item-active"]
                  : styles["dropdown-item-inactive"]
              }
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSelect(option);
                }
              }}
              tabIndex={0}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
