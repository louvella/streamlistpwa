// original
import React, { useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';


function StreamListHome({ onAddEvent }) {
  const [input, setInput] = useState('');
  const [movies] = useLocalStorage('movies', [])
  const [filteredMovies, setFilteredMovies] = useState([])

const handleInputChange = (event) => {
  const value = event.target.value;  // capture the input value
  setInput(value);  // update the input state

  // Log search event
  onAddEvent(`Search Event: User searched string "${value}"`);

  // If the input value is empty, show all movies
  if (value === '') {
    setFilteredMovies(movies); // reset to full list
  } else {
    // Filter movies based on the current input
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);  // set the filtered results
  }
  
};
  

  return (
    <div className="streamlist-home-container">
      <h1>Search Movies</h1>
      <form>
        <input type="text" value={input} onChange={handleInputChange} />
      </form>
      {/* Display the filtered movies */}
      <ul>
      {filteredMovies.map((movie, index) => (
        <li key={movie.id + index}>
          {movie.title} (Rating: {String(movie.popularity).split('.')[0]})
        </li>
      ))}
    </ul>
    </div>
  );
}

export default StreamListHome;
