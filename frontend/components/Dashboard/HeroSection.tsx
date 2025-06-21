import { ArrowDown } from "lucide-react";
import styles from "../../styles/components/HeroSection.module.scss";

const HeroSection = () => {
  return (
    <>
      <section aria-label="Hero section">
        <h1 className={styles["main-header"]}>
          Explore a collection of top movies and classics
        </h1>

        <div className={styles["arrow-container"]}>
          <ArrowDown size={44} aria-hidden="true" />
        </div>
        <div className={styles["dotted-line"]} aria-hidden="true" />
      </section>
    </>
  );
};

export default HeroSection;
