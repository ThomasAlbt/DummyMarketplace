import { useState, useEffect } from "react";
import { FetchDetails } from "../components/Fetch";
import { useParams } from "react-router";
import FetchAPI from "../components/FetchAPI";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [picture, setPicture] = useState(0);
  const theme = localStorage.getItem("theme") || "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    FetchAPI();
    const fetchData = async () => {
      setLoading(true);
      try {
        const articles = await FetchDetails(id);
        setData(articles[0] || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handlePicture = (next) => {
    if (!data.photos || data.photos.length === 0) return;

    const max = data.photos.length;

    if (next) {
      setPicture((prev) => (prev + 1) % max);
    } else {
      setPicture((prev) => (prev - 1 + max) % max);
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div class="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div id="details">
        <h1>{data.title}</h1>
        <div id="carousel" className="section">
          <img
            src={data.photos?.[picture]}
            alt={`photo ${picture + 1} de l'annonce ${id}`}
            className="img-carousel"
            loading="lazy"
            srcSet={`
              ${data.photos?.[picture]}?w=300 300w,
              ${data.photos?.[picture]}?w=600 600w,
              ${data.photos?.[picture]}?w=900 900w
            `}
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
          />
          <button
            onClick={() => handlePicture(false)}
            className="button-carousel prev"
          >
            Previous
          </button>
          <button
            onClick={() => handlePicture(true)}
            className="button-carousel next"
          >
            Next
          </button>
        </div>
        <div id="infos" className="section">
          <div>
            <p>{data.price}€</p>
            <p>{data.city}</p>
            <p>Nombre de chambres : {data.bedrooms}</p>
            <p>surface : {data.surface}m2</p>
          </div>
          <ul>
            {data.tags?.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
        <p className="section">{data.description}</p>
        {data.user ? (
          <aside className="section">
            <img src={data.user.photo_profil} alt="photo de profil" id="pfp"/>
            <p>
              {data.user ? data.user.prenom : null}
              <span> {data.user ? data.user.nom : null}</span>
            </p>
            <p>{data.user.age} ans</p>
            <p>{data.user.presentation}</p>
          </aside>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default Details;
