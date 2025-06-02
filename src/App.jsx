import './assets/style.css';
import Home from './pages/Home';
import Footer from './layout/Footer';
import Details from './pages/Details';
import { Routes, Route, BrowserRouter } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<Details/>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
