import React, { useState } from "react";
import { FaFilm, FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import "./peliculas.css";

export default function MovieCard({ movie }) {
  const [imageError, setImageError] = useState(false);
  const [liked, setLiked] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  function toggleLike() {
    setLiked(!liked);
  }

  return (
    <div className="movie-card">
      <Link href={`/peliculas/${movie._id}`} target="_blank">
        {movie.poster && !imageError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-poster"
            onError={handleImageError}
          />
        ) : (
          <div
            className="movie-poster"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaFilm />
          </div>
        )}
        <p className="movie-title">{movie.title}</p>
        <span className="movie-fallback-text">{movie.fullplot}</span>
      </Link>
      <div className="movie-actions">
        <button className="like-button" onClick={toggleLike}>
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
}
