import { useState, useEffect } from 'react';
import annoncesData from '../data/Annonces_30.json';

const Aside = ({ selectedTags, setSelectedTags }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setTags([
            ...new Set(
                annoncesData.annonces
                    .flatMap((annonce) => annonce.tags)
                    .map((tag) => tag.trim().toLowerCase())
            ),
        ]);
    }, []);

    const handleCheckboxChange = (tag) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tag)
                ? prevSelected.filter((t) => t !== tag)
                : [...prevSelected, tag]
        );
    };

    return (
        <aside>
            <form>
                <legend>Filtres</legend>
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