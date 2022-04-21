import React, { useState, createContext, useContext } from "react";

import { LinksContext } from "../context/LinksContext";

import axios from "axios";
import { FilterContext } from "./FilterContext";
export const MovieContext = createContext();

export const MovieContextProvider = (props) => {
  const { API_SEARCH_URL, GENRES_URL } = useContext(LinksContext);
  const { urlEncodedSearch } = useContext(FilterContext);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);

  async function getMovieList() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
      json: true,
    });
    setMoviesToShow(response.data.results);
  }

  async function getMovieGenres() {
    let response = await axios({
      method: "get",
      url: `${GENRES_URL}${process.env.REACT_APP_API_KEY}&language=en-US`,
      json: true,
    });
    setMovieGenres(response.data.genres);
  }
  async function searchForMovieTitle() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${urlEncodedSearch}`,
      json: true,
    });
    console.log(urlEncodedSearch);
    setMoviesToShow(response.data.results);
  }

  return (
    <MovieContext.Provider
      value={{
        moviesToShow,
        setMoviesToShow,
        movieGenres,
        setMovieGenres,
        getMovieList,
        getMovieGenres,
        searchForMovieTitle,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
