import React, { useState, createContext, useContext } from "react";

export const MovieContext = createContext();

export const MovieContextProvider = (props) => {
  const [catalogToShow, setCatalogToShow] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);

  return (
    <MovieContext.Provider
      value={{
        catalogToShow,
        setCatalogToShow,
        movieGenres,
        setMovieGenres,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
