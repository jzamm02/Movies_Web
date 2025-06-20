import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  genres: string[];
  rating: number;
  imageUrl: string;
  individual?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  genres,
  rating,
  imageUrl,
  individual,
}) => {
  //   console.log(id);
  return (
    <div className="card-container">
      <div className="card-image-container">
        {!individual ? (
          <Link href={`/movies/${id}`}>
            <Image
              src={imageUrl}
              alt={`${title} Poster`}
              width={180}
              height={260}
              className={"card-image"}
            />
            {!individual ? (
              <>
                <div className="gradient-overlay"></div>
                <div className="overlay-content">
                  <h3>{title}</h3>
                  <p>
                    {genres.map((genre, index) => (
                      <span key={index}>
                        {genre.charAt(0).toUpperCase() + genre.slice(1)}

                        {index < genres.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </>
            ) : null}
          </Link>
        ) : (
          <>
            <Image
              src={imageUrl}
              alt={`${title} Poster`}
              width={180}
              height={260}
              className={"card-image"}
            />
            {!individual ? (
              <>
                <div className="gradient-overlay"></div>
                <div className="overlay-content">
                  <h3>{title}</h3>
                  <p>
                    {genres.map((genre, index) => (
                      <span key={index}>
                        {genre}
                        {index < genres.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
      {!individual ? (
        <>
          <div className="btn">Learn More</div>

          <div className="card-rating">
            <p className="card-rating-value">{rating}</p>
            <Star size={16} className="card-rating-icon" />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MovieCard;
