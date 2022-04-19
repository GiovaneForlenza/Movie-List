import React, { useContext } from "react";

import { MovieContext } from "../context/MoviesContext";

import "../style/pages/movie-dispĺay.scss";
import MovieContainer from "../components/MovieContainer";

function MovieDisplay() {
  const { moviesToShow } = useContext(MovieContext);

  return (
    <div className="movie-display-container">
      {moviesToShow.length > 0 &&
        moviesToShow.map((movie, id) => {
          return <MovieContainer movie={movie} id={id} key={id} />;
        })}
    </div>
  );
}

export default MovieDisplay;
