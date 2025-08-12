import { Link } from "react-router";
import { useState, useEffect } from "react";
import checkMobile from "../components/CheckMobile";
import { useParams } from "react-router";

const Header = ({ search, setSearch }) => {
  const isMobile = checkMobile();
  const { id } = useParams();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [activeSearch, setActiveSearch] = useState(true);
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    setActiveSearch(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue, setSearch]);

  const handleMobileSearch = () => {
    if (isMobile) {
      return activeSearch ? "show" : "";
    }
    return "show";
  };

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="section">
      <Link to="/">
        {isMobile ? (
          <img id="logo" src="/DummyMarketplace/LogoMobile.svg" alt="logo dummy" />
        ) : (
          <img id="logo" src="/DummyMarketplace/logo.svg" alt="logo dummy" />
        )}
      </Link>
      {id ? null : (
        <input
          type="text"
          placeholder="Recherche avec le nom d'une annonce"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={handleMobileSearch()}
        />
      )}
      {id ?
        <Link to='/'>
          <button
            id="mobileSearch"
          >
            <img src="/DummyMarketplace/search.svg" alt="icone de recherche" />
          </button>
        </Link>
         : (
        <button
          id="mobileSearch"
          onClick={() => setActiveSearch(activeSearch ? false : true)}
        >
          <img src="/DummyMarketplace/search.svg" alt="icone de recherche" />
        </button>
      )}
      <button
        onClick={() =>
          handleTheme()
        }
        className="circle"
      >
        {theme === "light" ? (
          <img src="/DummyMarketplace/dark.svg"></img>
        ) : (
          <img src="/DummyMarketplace/light.svg"></img>
        )}
      </button>
    </header>
  );
};

export default Header;
