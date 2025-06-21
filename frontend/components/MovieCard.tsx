import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import styles from "../styles/components/MovieCard.module.scss";

interface MovieCardProps {
  id: number;
  title: string;
  genres: string[];
  rating: number;
  imageUrl: string;
  individual?: boolean;
  isShown?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  genres,
  rating,
  imageUrl,
  individual,
  isShown,
}) => {
  //   console.log(id);
  const genreText = genres
    .map((genre) => genre.charAt(0).toUpperCase() + genre.slice(1))
    .join(", ");
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={styles["card-container"]}
      aria-label={`Movie card for ${title}`}
      role="group"
    >
      <div className={styles["card-image-container"]}>
        {!individual ? (
          <Link
            href={`/movies/${id}`}
            aria-label={`Go to details page for ${title}`}
          >
            <Image
              src={imageUrl}
              alt={`${title} Poster`}
              width={180}
              height={260}
              className={styles["card-image"]}
              aria-describedby={`genres-${id} rating-${id}`}
            />

            <>
              <div className={styles["gradient-overlay"]} aria-hidden="true" />
              <div className={styles["overlay-content"]}>
                <h3>{title}</h3>
                <p id={`genres-${id}`} aria-label={`Genres: ${genreText}`}>
                  {genres.map((genre, index) => (
                    <span key={index}>
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}

                      {index < genres.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </>
          </Link>
        ) : (
          <>
            <Image
              src={imageUrl}
              alt={`${title} Poster`}
              width={180}
              height={260}
              className={styles["card-image"]}
              aria-describedby={`genres-${id} rating-${id}`}
            />
          </>
        )}
      </div>
      {!individual ? (
        <>
          <Link
            href={`/movies/${id}`}
            className={styles["card-title-link"]}
            tabIndex={isShown ? 0 : undefined}
          >
            <div
              className="btn"
              role="button"
              aria-label={`Learn more about ${title}`}
            >
              Learn More
            </div>
          </Link>

          <div
            className={styles["card-rating"]}
            aria-label={`Rating: ${rating} out of 10`}
            id={`rating-${id}`}
          >
            <p className={styles["card-rating-value"]}>{rating}</p>
            <Star
              size={16}
              className={styles["card-rating-icon"]}
              aria-hidden
            />
          </div>
        </>
      ) : null}
    </motion.div>
  );
};

export default MovieCard;
