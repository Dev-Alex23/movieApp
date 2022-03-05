import React, { useState } from "react";
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

const API_KEY = "62f712a1";
const API_URL = "http://www.omdbapi.com/?apikey=" + API_KEY + "&";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [serachTerm, setSearchTerm] = useState([]);
  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}s=${title}`);
    const data = await response.json();
    console.log(data.Search);

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie();
  }, []);

  return (
    <div className='app'>
      <h1>Movie App</h1>

      <div className='search'>
        <input
          type='text'
          placeholder='Search'
          value={serachTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt='Search' onClick={() => searchMovie(serachTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No Movie Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
