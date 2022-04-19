import React, { useContext, useState, useEffect } from "react";
import { LinksContext } from "../context/LinksContext";
import { MovieContext } from "../context/MoviesContext";

import "../style/components/movie-container.scss";

import axios from "axios";

function MovieContainer({ movie, id }) {
  const { MOVIE_POSTER_URL, API_SEARCH_URL, PROVIDER_IMG_URL } =
    useContext(LinksContext);
  const { movieGenres } = useContext(MovieContext);
  const [providers, setProviders] = useState([]);
  let genreCount = 0;

  function getGenreName(genreId) {
    if (movieGenres.length > 0) {
      let genreName = movieGenres.filter((genre) => genre.id === genreId);
      return genreName[0].name;
    }
  }

  async function getProviderPhoto() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}${movie.id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`,
      json: true,
    });
    // console.log(response.data.results["BR"].flatrate);
    if (response.data.results["BR"].flatrate !== undefined)
      setProviders(...providers, response.data.results["BR"].flatrate);
  }
  useEffect(() => {
    getProviderPhoto();
  }, []);

  return (
    <div className="movie-container">
      <div className="poster">
        <img src={`${MOVIE_POSTER_URL}${movie.poster_path}`} alt="" />
      </div>
      <div className="information-container">
        <span className="title">{movie.title}</span>
        <div className="genres-container">
          {movie.genre_ids.map((genre, genreId) => {
            if (genreCount < 2) {
              genreCount++;
              return (
                <span className="genre" key={genreId}>
                  {getGenreName(genre)}
                </span>
              );
            }
          })}
        </div>
        <div className="provider-container">
          {providers !== undefined &&
            providers.length > 0 &&
            providers.map((provider, providerId) => {
              return (
                <div className="icon-container" key={providerId}>
                  <img
                    src={`${PROVIDER_IMG_URL}${provider.logo_path}`}
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MovieContainer;
