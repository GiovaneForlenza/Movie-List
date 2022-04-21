import React, { useState, createContext } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = (props) => {
  const [filtered, setFiltered] = useState("Popular Movies");
  const [search, setSearch] = useState("");
  const [urlEncodedSearch, setUrlEncodedSearch] = useState("");
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
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
