import { ArrowDown } from "lucide-react";
import styles from "../../styles/components/HeroSection.module.scss";

const HeroSection = () => {
  return (
    <>
      <div>
        <h1 className={styles["main-header"]}>
          Explore a collection of top movies and classics
        </h1>
        <div className={styles["arrow-container"]}>
          <ArrowDown size={44} />
        </div>
        <div className={styles["dotted-line"]} />
      </div>
    </>
  );
};

export default HeroSection;
