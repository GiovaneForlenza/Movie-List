import React, { useContext } from "react";

import { MovieContext } from "../context/MoviesContext";

import "../style/pages/movie-dispĺay.scss";
import MovieContainer from "../components/MovieContainer";

function MovieDisplay() {
  const { moviesToShow } = useContext(MovieContext);

  return (
    <div className="movie-display-container">
      <div className="movies">
        {moviesToShow.length > 0 &&
          moviesToShow.map((movie, id) => {
            return <MovieContainer movie={movie} id={movie.id} key={id} />;
          })}
      </div>
    </div>
  );
}

export default MovieDisplay;
