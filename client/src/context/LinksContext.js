import React, { useState, createContext } from "react";

export const LinksContext = createContext();

export const LinksContextProvider = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w220_and_h330_face/";
  const PROVIDER_IMG_URL = "https://www.themoviedb.org/t/p/original/";
  const API_SEARCH_URL = "https://api.themoviedb.org/3/movie/";
  const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=`;
  return (
    <LinksContext.Provider
      value={{
        popularMovies,
        setPopularMovies,
        MOVIE_POSTER_URL,
        PROVIDER_IMG_URL,
        API_SEARCH_URL,
        GENRES_URL,
      }}
    >
      {props.children}
    </LinksContext.Provider>
  );
};
