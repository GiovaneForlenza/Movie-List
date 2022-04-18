import React, { useState, createContext } from "react";

export const LinksContext = createContext();

export const LinksContextProvider = (props) => {
  return (
    <LinksContext.Provider value={{}}>{props.children}</LinksContext.Provider>
  );
};
