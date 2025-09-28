'use client';

import { useState, useEffect } from 'react';
import MovieList from './MovieList';
import './peliculas.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`https://mflixbackend.azurewebsites.net/api/movies?pageSize=30&page=${page}`);
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    }

    fetchMovies();
  }, [page]);

  return (
    <main className="movies-container">
      {loading ? (
        <p>Cargando películas...</p>
      ) : (
        <>
          <MovieList movies={movies} />
          <div className="pagination">
            <button
              onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
              disabled={page === 1}
              className="pagination-button"
            >
              ← Anterior
            </button>
            <span className="pagination-info">Página {page}</span>
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="pagination-button"
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </main>
  );
}
