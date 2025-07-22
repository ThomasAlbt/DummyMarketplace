import "./assets/style.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { Routes, Route, BrowserRouter } from "react-router";

function App() {
  return (
    <BrowserRouter basename="/DummyMarketplace">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
