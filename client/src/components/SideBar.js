import React, { useContext, useEffect } from "react";

import { FilterContext } from "../context/FilterContext";
import { LinksContext } from "../context/LinksContext";
import { MovieContext } from "../context/MoviesContext";

import "../style/components/sidebar.scss";

import axios from "axios";

function SideBar() {
  const {
    filtered,
    setSearch,
    setUrlEncodedSearch,
    urlEncodedSearch,
    genresToSearch,
  } = useContext(FilterContext);
  const { searchForMovieTitle, movieGenres, getMovieList, setMoviesToShow } =
    useContext(MovieContext);
  const { GENRE_SEARCH_URL } = useContext(LinksContext);

  useEffect(() => {
    if (urlEncodedSearch.length > 0) searchForMovieTitle();
  }, [urlEncodedSearch]);

  async function handleClick(genreId) {
    document
      .getElementById(`genre-container-${genreId}`)
      .classList.toggle("active");
    if (genresToSearch.includes(genreId)) {
      genresToSearch.splice(genresToSearch.indexOf(genreId), 1);
    } else {
      genresToSearch.push(genreId);
    }
    console.log(genresToSearch);
    let queryGenres = "";
    genresToSearch.forEach((genre) => {
      queryGenres += genre + ",";
    });
    queryGenres = queryGenres.substring(0, queryGenres.length - 1);
    let response = await axios({
      method: "get",
      url: `${GENRE_SEARCH_URL}${queryGenres}`,
      json: true,
    });
    console.log(response.data);
    setMoviesToShow(response.data.results);
  }

  return (
    <div className="sidebar-container">
      <div className="filtered-title-container" onClick={getMovieList}>
        <span>{filtered}</span>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder=" "
          id="side-search"
          onChange={(e) => {
            setSearch(e.target.value);
            let encoded = encodeURI(e.target.value);
            if (document.getElementById("side-search").value === "") {
              getMovieList();
            } else {
              setUrlEncodedSearch(encoded);
            }
          }}
        />
        <span className="input-label">Search</span>
      </div>
      <div className="filters-container">
        {movieGenres.map((genre, id) => {
          return (
            <div
              className="genre-container"
              id={`genre-container-${genre.id}`}
              key={id}
              onClick={() => handleClick(genre.id)}
            >
              {genre.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
