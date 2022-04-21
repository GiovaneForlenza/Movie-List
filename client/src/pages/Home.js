import React, { useEffect, useContext } from "react";
import { LinksContext } from "../context/LinksContext";
import { MovieContext } from "../context/MoviesContext";
import MovieDisplay from "../pages/MovieDisplay";
import SideBar from "../components/SideBar";
import "../style/pages/home.scss";
import axios from "axios";
function Home() {
  const { API_SEARCH_URL, GENRES_URL } = useContext(LinksContext);
  const { setMoviesToShow, setMovieGenres, getMovieList, getMovieGenres } =
    useContext(MovieContext);

  useEffect(() => {
    getMovieList();
    getMovieGenres();
  }, []);

  return (
    <div className="home-container">
      <SideBar />
      <MovieDisplay />
    </div>
  );
}

export default Home;
