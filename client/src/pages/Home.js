import React, { useEffect, useContext } from "react";
import { MovieContext } from "../context/MoviesContext";
import MovieDisplay from "../components/MovieDisplay";
import SideBar from "../components/SideBar";
import "../style/pages/home.scss";
import { SearchAndQueriesContext } from "../context/SearchAndQueriesContext";
function Home() {
  const { getFirstPagePopularCatalogList, getMovieGenres, moviePopularPage } =
    useContext(SearchAndQueriesContext);

  useEffect(() => {
    console.clear();
    getFirstPagePopularCatalogList();
    getMovieGenres();
    document.getElementById("side-search").value = "";
  }, []);

  return (
    <div className="home-container">
      <SideBar />
      <MovieDisplay />
    </div>
  );
}

export default Home;
