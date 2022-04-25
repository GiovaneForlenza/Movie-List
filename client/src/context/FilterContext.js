import React, { useState, createContext, useContext } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = (props) => {
  const [filtered, setFiltered] = useState("Popular Movies");
  const [search, setSearch] = useState("");
  const [urlEncodedSearch, setUrlEncodedSearch] = useState("");
  const [searchFor, setSearchFor] = useState("movie");

  const [currentPage, setCurrentPage] = useState(1);

  let genresToSearch = [];

  return (
    <FilterContext.Provider
      value={{
        filtered,
        setFiltered,
        search,
        setSearch,
        urlEncodedSearch,
        setUrlEncodedSearch,
        genresToSearch,
        currentPage,
        setCurrentPage,
        searchFor,
        setSearchFor,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
