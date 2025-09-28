"use client";
import { FaFilm } from "react-icons/fa";
import React, { useState, useEffect } from "react";

export default function MovieDetailPage({ params }) {
  const [imageError, setImageError] = useState(false);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = params;


  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://mflixbackend.azurewebsites.net/api/movies/${id}`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    }

    fetchMovie();
  });

  return (
    <div className="movie-card">
      {movie.poster && !imageError ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
          onError={handleImageError}
        />
      ) : (
        <div className="movie-poster">
          <FaFilm />
        </div>
      )}
      <p className="movie-title">{movie.title}</p>
      <span className="movie-fallback-text">{movie.fullplot}</span>
    </div>
  );
}
