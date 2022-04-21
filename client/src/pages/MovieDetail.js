import React, { useEffect, useContext, useState } from "react";
import "../style/pages/movie-details.scss";

import axios from "axios";
import { LinksContext } from "../context/LinksContext";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const { API_SEARCH_URL } = useContext(LinksContext);
  const [movieInfo, setMovieInfo] = useState([]);

  async function getMovieInfo() {
    let response = await axios({
      method: "get",
      url: `${API_SEARCH_URL}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
      json: true,
    });
    setMovieInfo(response.data);
  }
  useEffect(() => {
    // getMovieInfo();
  }, []);

  return <div className="movie-details-container">title</div>;
}

export default MovieDetail;
