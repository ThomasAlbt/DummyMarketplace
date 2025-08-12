import { useState, useEffect } from "react";
import { Link } from "react-router";

const SearchModal = ({ isOpen, onClose, dataList }) => {
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (search) {
      const filtered = dataList.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  }, [search, dataList]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher..."
          autoFocus
        />
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="search-results">
          {filteredResults.length === 0 && search !== "" ? (
            <p className="no-result">Aucun résultat trouvé</p>
          ) : (
            <ul>
              {filteredResults.map((item) => (
                <li key={item.id} className="card">
                  <Link to={`/${item.id}`} onClick={onClose}>
                    <h2>{item.title}</h2>
                    <img
                      src={Array.isArray(item.photos) ? item.photos[0] : item.photos}
                      alt={item.title}
                      loading="lazy"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;