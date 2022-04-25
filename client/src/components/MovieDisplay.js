import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

import { MovieContext } from "../context/MoviesContext";
import { SearchAndQueriesContext } from "../context/SearchAndQueriesContext";

import "../style/pages/movie-dispĺay.scss";
import MovieContainer from "./MovieContainer";

function MovieDisplay() {
  const { catalogToShow } = useContext(MovieContext);
  const { setCurrentPage, currentPage } = useContext(FilterContext);
  const { loadMoreTitles } = useContext(SearchAndQueriesContext);

  return (
    <div className="movie-display-container">
      {catalogToShow.length > 0 ? (
        <div className="movies">
          {catalogToShow.map((movie, id) => {
            return <MovieContainer movie={movie} id={movie.id} key={id} />;
          })}
        </div>
      ) : (
        <div className="no-movies-found-container">
          <h1>There are no movies that matched your query.</h1>
        </div>
      )}
      <div
        className="load-more-display"
        onClick={() => {
          setCurrentPage(currentPage + 1);
          loadMoreTitles();
        }}
      >
        <span>Load More</span>
      </div>
    </div>
  );
}

export default MovieDisplay;
