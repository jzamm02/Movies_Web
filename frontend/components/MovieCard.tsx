import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface MovieCardProps {
  title: string;
  genres: string[];
  rating: number;
  imageUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  genres,
  rating,
  imageUrl,
}) => {
  return (
    <div className="card-container">
      <div className="card-image-container">
        <Image
          src={imageUrl}
          alt={`${title} Poster`}
          width={180}
          height={260}
          className="card-image"
        />
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
      </div>

      <div className="card-button">Learn More</div>
      <div className="card-rating">
        <p className="card-rating-value">{rating}</p>
        <Star size={16} className="card-rating-icon" />
      </div>
    </div>
  );
};

export default MovieCard;
