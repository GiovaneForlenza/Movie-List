import React, { useEffect, useContext } from "react";
import axios from "axios";
import { LinksContext } from "../context/LinksContext";
import { MovieContext } from "../context/MoviesContext";
import MovieDisplay from "../pages/MovieDisplay";
function Home() {
  const { API_SEARCH_URL, GENRES_URL } = useContext(LinksContext);
  const { setMoviesToShow, setMovieGenres } = useContext(MovieContext);
  async function getMovieList() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
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

  useEffect(() => {
    getMovieList();
    getMovieGenres();
  }, []);

  return (
    <div>
      <MovieDisplay />
    </div>
  );
}

export default Home;
