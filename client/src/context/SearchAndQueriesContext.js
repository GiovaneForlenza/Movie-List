import React, { useState, createContext, useContext, useEffect } from "react";

import { LinksContext } from "../context/LinksContext";
import { FilterContext } from "./FilterContext";

import axios from "axios";
import { MovieContext } from "./MoviesContext";

export const SearchAndQueriesContext = createContext();
export const SearchAndQueriesContextProvider = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { currentPage, urlEncodedSearch, searchFor } =
    useContext(FilterContext);

  const { API_SEARCH_URL, GENRES_URL } = useContext(LinksContext);

  const { setCatalogToShow, setMovieGenres, catalogToShow } =
    useContext(MovieContext);

  async function getFirstPagePopularCatalogList() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}/${searchFor}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
      json: true,
    });
    setCatalogToShow(response.data.results);
  }

  async function loadMoreTitles() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}/${searchFor}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`,
      json: true,
    });
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
      url: `${GENRES_URL}&language=en-US`,
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
      }}
    >
      {props.children}
    </SearchAndQueriesContext.Provider>
  );
};
