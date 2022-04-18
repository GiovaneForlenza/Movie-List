import React, { useEffect, useContext } from "react";
import axios from "axios";
import { LinksContext } from "../context/LinksContext";
function Home() {
  const { popularMovies, setPopularMovies, MOVIE_POSTER_URL, API_SEARCH_URL } =
    useContext(LinksContext);
  async function getMovieList() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
      json: true,
    });
    setPopularMovies(response.data.results);
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      {popularMovies.length > 0 &&
        popularMovies.map((movie, id) => {
          return (
            <div className="movie" key={id}>
              <h3>{movie.original_title}</h3>
              <img src={`${MOVIE_POSTER_URL}${movie.poster_path}`} alt="" />
            </div>
          );
        })}
    </div>
  );
}

export default Home;
