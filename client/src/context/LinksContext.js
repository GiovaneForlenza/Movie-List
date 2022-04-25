import React, { useState, createContext } from "react";

export const LinksContext = createContext();

export const LinksContextProvider = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w220_and_h330_face/";
  const PROVIDER_IMG_URL = "https://www.themoviedb.org/t/p/original/";
  const API_SEARCH_URL = "https://api.themoviedb.org/3";
  const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`;
  const GENRE_SEARCH_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=`;

  return (
    <LinksContext.Provider
      value={{
        popularMovies,
        setPopularMovies,
        MOVIE_POSTER_URL,
        PROVIDER_IMG_URL,
        API_SEARCH_URL,
        GENRES_URL,
        GENRE_SEARCH_URL,
      }}
    >
      {props.children}
    </LinksContext.Provider>
  );
};
