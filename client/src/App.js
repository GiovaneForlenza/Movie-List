import logo from "./logo.svg";
import "./App.css";
import "./style/global.scss";
import Home from "./pages/Home";
import { LinksContextProvider } from "./context/LinksContext";
import { MovieContextProvider } from "./context/MoviesContext";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";
import { FilterContextProvider } from "./context/FilterContext";
import { SearchAndQueriesContextProvider } from "./context/SearchAndQueriesContext";

// require("dotenv").config();

function App() {
  return (
    <LinksContextProvider>
      <FilterContextProvider>
        <MovieContextProvider>
          <SearchAndQueriesContextProvider>
            <Router>
              <Switch>
                <Route exact path="/">
                  {/* <div className="App"> */}
                  <Home />
                  {/* </div> */}
                </Route>
                <Route path="/movie/:id" component={MovieDetail}></Route>
              </Switch>
            </Router>
          </SearchAndQueriesContextProvider>
        </MovieContextProvider>
      </FilterContextProvider>
    </LinksContextProvider>
  );
}

// <LinksContextProvider>
//   <MovieContextProvider>
//     <MovieDetail />
//   </MovieContextProvider>
// </LinksContextProvider>;

export default App;
