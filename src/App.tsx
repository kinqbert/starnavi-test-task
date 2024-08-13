import { Route, HashRouter as Router, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import PersonPage from "./pages/PersonPage";

import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/person/:id" element={<PersonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
