import React, { useContext, useEffect } from "react";

import { FilterContext } from "../context/FilterContext";
import { LinksContext } from "../context/LinksContext";
import { MovieContext } from "../context/MoviesContext";

import "../style/components/sidebar.scss";

import axios from "axios";
function SideBar() {
  const { filtered, setSearch, setUrlEncodedSearch, urlEncodedSearch } =
    useContext(FilterContext);
  const { API_SEARCH_URL } = useContext(LinksContext);
  const { searchForMovieTitle, movieGenres } = useContext(MovieContext);

  useEffect(() => {
    if (urlEncodedSearch.length > 0) searchForMovieTitle();
  }, [urlEncodedSearch]);

  return (
    <div className="sidebar-container">
      <div className="filtered-title-container">
        <span>{filtered}</span>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder=" "
          onChange={(e) => {
            setSearch(e.target.value);
            let encoded = encodeURI(e.target.value);
            setUrlEncodedSearch(encoded);
          }}
        />
        <span className="input-label">Search</span>
      </div>
      <div className="filters-container">
        {movieGenres.map((genre) => {
          return <div className="genre-container">{genre.name}</div>;
        })}
      </div>
    </div>
  );
}

export default SideBar;
