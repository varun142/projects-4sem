import "./App.css";
import ListingPage from "./components/ListingPage.js";
import SearchBar from "./components/SearchBar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullDetails from "./components/FullDetails.js";
import NewDetails from "./components/NewDetails.js";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <ListingPage />
              </>
            }
          />
          <Route
            path="/getFullDetails"
            element={
              <>
                <FullDetails />
              </>
            }
          />
          <Route
            path="/newDetails"
            element={
              <>
                <NewDetails />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
