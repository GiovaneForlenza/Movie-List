import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { LinksContextProvider } from "./context/LinksContext";
// require("dotenv").config();

function App() {
  return (
    <div className="App">
      <LinksContextProvider>
        <Home />
      </LinksContextProvider>
    </div>
  );
}

export default App;
