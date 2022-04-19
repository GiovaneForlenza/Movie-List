import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { LinksContextProvider } from "./context/LinksContext";
import { MovieContextProvider } from "./context/MoviesContext";
// require("dotenv").config();

function App() {
  return (
    <div className="App">
      <LinksContextProvider>
        <MovieContextProvider>
          <Home />
        </MovieContextProvider>
      </LinksContextProvider>
    </div>
  );
}

export default App;
