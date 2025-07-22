import { useState, useEffect } from "react";
import annoncesData from "../data/Annonces_30.json";

const Aside = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    setTags([
      ...new Set(
        annoncesData.annonces
          .flatMap((annonce) => annonce.tags)
          .map((tag) => tag.trim().toLowerCase())
      ),
    ]);
  }, []);

  useEffect(() => {
    setClear(selectedTags.length > 0);
  }, [selectedTags]);

  const handleCheckboxChange = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  return (
    <aside className="section">
      <form>
        <legend>Filtres</legend>
        {clear ? (
          <input
            id="clear"
            type="button"
            value="X"
            onClick={() => {
              setSelectedTags([]);
              setClear(false);
            }}
          />
        ) : null}
        {tags.map((tag, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name="tags"
              id={tag}
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={() => handleCheckboxChange(tag)}
            />
            <label htmlFor={tag}>{tag}</label>
          </div>
        ))}
      </form>
    </aside>
  );
};

export default Aside;
