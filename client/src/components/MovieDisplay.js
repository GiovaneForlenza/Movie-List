import React, { useContext } from "react";

import { MovieContext } from "../context/MoviesContext";

import "../style/pages/movie-dispĺay.scss";
import MovieContainer from "./MovieContainer";

function MovieDisplay() {
  const { moviesToShow } = useContext(MovieContext);

  return (
    <div className="movie-display-container">
      {moviesToShow.length > 0 ? (
        <div className="movies">
          {moviesToShow.map((movie, id) => {
            return <MovieContainer movie={movie} id={movie.id} key={id} />;
          })}
        </div>
      ) : (
        <div className="no-movies-found-container">
          <h1>There are no movies that matched your query.</h1>
        </div>
      )}
    </div>
  );
}

export default MovieDisplay;
