import React, { useContext, useState, useEffect } from "react";
import { LinksContext } from "../context/LinksContext";
import { MovieContext } from "../context/MoviesContext";

import "../style/components/movie-container.scss";

import axios from "axios";
import { Link } from "react-router-dom";

function MovieContainer({ movie, id }) {
  const { MOVIE_POSTER_URL, API_SEARCH_URL, PROVIDER_IMG_URL } =
    useContext(LinksContext);
  const { movieGenres } = useContext(MovieContext);
  const [providers, setProviders] = useState([]);
  let genreCount = 0;
  let providersCount = 0;

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
    if (response.data.results["BR"].flatrate !== undefined)
      setProviders(...providers, response.data.results["BR"].flatrate);
  }

  useEffect(() => {
    getProviderPhoto();
  }, []);

  return (
    <Link className="movie-container" to={`/movie/${movie.id}`}>
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
          {providers.length > 0 ? (
            providers.map((provider, providerId) => {
              if (providersCount < 4) {
                providersCount++;
                return (
                  <div className="icon-container" key={providerId}>
                    {!provider.logo_path ? (
                      <img
                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                        alt=""
                      />
                    ) : (
                      <img
                        src={`${PROVIDER_IMG_URL}${provider.logo_path}`}
                        alt=""
                      />
                    )}
                  </div>
                );
              }
            })
          ) : (
            <h4>No streaming available</h4>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MovieContainer;
