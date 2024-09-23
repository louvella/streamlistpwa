// movies.js
import React from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

import '../styles/Movies.css'

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w220_and_h330_face"

function MoviesPage() {
  const [movies] = useLocalStorage('movies', [])

  return (
    <div className="streamlist-home-container">
      <h1>Movies Page</h1>
      <ul className="movie-list">
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie, index) => (

            <li key={movie.id} className="movie-card" style={{zIndex: index}}>
              <img className="movie-image" src={`${IMG_BASE_URL}${movie.poster_path}`} width="110" height="165" alt="movie_poster" />
              <div>
                <h2>
                  {movie.title}
                  </h2>
                <p>{movie.overview}</p>
                <p>Rating: {movie.vote_average}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No movies available. Please search for movies in the search bar.</p>
        )}
      </ul>
    </div>
  );
}

export default MoviesPage;