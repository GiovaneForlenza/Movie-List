import React, { useState, createContext, useContext, useEffect } from "react";

import { LinksContext } from "../context/LinksContext";
import { FilterContext } from "./FilterContext";

import axios from "axios";
import { MovieContext } from "./MoviesContext";

export const SearchAndQueriesContext = createContext();
export const SearchAndQueriesContextProvider = (props) => {
  const { currentPage, urlEncodedSearch, searchFor, genresToSearch, search } =
    useContext(FilterContext);

  const { API_SEARCH_URL, MOVIE_GENRES_LIST } = useContext(LinksContext);

  const {
    setCatalogToShow,
    setMovieGenres,
    catalogToShow,
    providers,
    setProviders,
  } = useContext(MovieContext);

  async function getFirstPagePopularCatalogList() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}/${searchFor}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
      json: true,
    });
    setCatalogToShow(response.data.results);
  }

  async function loadMoreTitles() {
    let queryUrl = `${API_SEARCH_URL}/${searchFor}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`;
    if (genresToSearch.length > 0 || search != "") {
      if (genresToSearch.length > 0) {
        queryUrl += `&with_genres=${genresToSearch}`;
      }
      if (search != "") {
        queryUrl += `&query=${urlEncodedSearch}`;
      }
    } else {
      queryUrl = `${API_SEARCH_URL}/${searchFor}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`;
    }
    let response = await axios({
      method: "get",
      url: queryUrl,
      json: true,
    });
    console.log(queryUrl);
    if (response.data.page > 1) {
      let savedCatalog = [...new Set(catalogToShow)];
      response.data.results.map((result) => {
        savedCatalog.push(result);
      });
      let singleCatalog = savedCatalog.filter(
        (item, index) => savedCatalog.indexOf(item) === index
      );
      setCatalogToShow(singleCatalog);
    }
  }

  async function getMovieGenres() {
    let response = await axios({
      method: "get",
      url: `${MOVIE_GENRES_LIST}&language=en-US`,
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
    if (urlEncodedSearch === null) {
      getFirstPagePopularCatalogList();
      return;
    }
    setCatalogToShow(response.data.results);
  }

  async function getProviderPhoto(movie) {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}/movie/${movie.id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`,
      json: true,
    });
    if (response !== undefined)
      if (response.data.results["CA"] !== undefined)
        if (response.data.results["CA"].flatrate !== undefined)
          setProviders(...providers, response.data.results["CA"].flatrate);
  }

  useEffect(() => {
    if (urlEncodedSearch !== "") {
      searchForMovieTitle();
    }
  }, [urlEncodedSearch]);

  useEffect(() => {
    if (currentPage > 1) {
      loadMoreTitles();
    }
  }, [currentPage]);

  return (
    <SearchAndQueriesContext.Provider
      value={{
        getFirstPagePopularCatalogList,
        loadMoreTitles,
        getMovieGenres,
        searchForMovieTitle,
        getProviderPhoto,
      }}
    >
      {props.children}
    </SearchAndQueriesContext.Provider>
  );
};
