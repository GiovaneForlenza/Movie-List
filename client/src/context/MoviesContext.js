import React, { useState, createContext } from "react";

export const MovieContext = createContext();

export const MovieContextProvider = (props) => {
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  return (
    <MovieContext.Provider
      value={{
        moviesToShow,
        setMoviesToShow,
        movieGenres,
        setMovieGenres,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
