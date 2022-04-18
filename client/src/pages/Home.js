import React, { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w220_and_h330_face/";
  const API_SEARCH_URL = "https://api.themoviedb.org/3/movie/";

  async function getMovieList() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}popular?api_key=${process.env.API_KEY}&language=en-US&page=1`,
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
