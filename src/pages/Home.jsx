import { useState, useEffect } from "react";
import { FetchAll } from "../components/Fetch";
import Header from "../layout/Header";
import Aside from "../layout/Aside";
import Footer from "../layout/Footer";
import { Link } from "react-router";
import checkMobile from "../components/CheckMobile";

const ANNONCES_PER_PAGE = 10;

const Home = () => {
  const [search, setSearch] = useState("");
  const [dataList, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [filteredAnnonces, setFannonces] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const isMobile = checkMobile();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const articles = await FetchAll();
        setData(articles.annonces || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = dataList;

    if (search) {
      filtered = filtered.filter((annonce) =>
        annonce.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(
        (annonce) =>
          Array.isArray(annonce.tags) &&
          selectedTags.every((tag) =>
            annonce.tags.map((t) => t.trim().toLowerCase()).includes(tag)
          )
      );
    }

    setFannonces(filtered);
    setPage(1);
  }, [search, dataList, selectedTags]);

  const totalAnnonces =
    filteredAnnonces.length > 0 || search || selectedTags.length > 0
      ? filteredAnnonces.length
      : dataList.length;
  const totalPages = Math.ceil(totalAnnonces / ANNONCES_PER_PAGE);

  const displayList = (
    filteredAnnonces.length > 0 || search || selectedTags.length > 0
      ? filteredAnnonces
      : dataList
  ).slice((page - 1) * ANNONCES_PER_PAGE, page * ANNONCES_PER_PAGE);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
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
      <Header search={search} setSearch={setSearch} />
      <main>
        {isMobile ? (
          <Aside
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        ) : null}
        <ul className="section">
          {displayList.length === 0 ? (
            <li className="no-result">
              <p>Aucune annonce trouvée.<br />Essayez d’élargir votre recherche ou de retirer des filtres.</p>
            </li>
          ) : (
            displayList.map((data, index) => (
              <li className="card" key={data.id || index}>
                <Link to={`/${data.id}`}>
                  <h2>{data.title}</h2>
                  <img
                    src={Array.isArray(data.photos) ? data.photos[0] : data.photos}
                    alt={data.title}
                    loading="lazy"
                    srcSet={`
                      ${Array.isArray(data.photos) ? data.photos[0] : data.photos}?w=300 300w,
                      ${Array.isArray(data.photos) ? data.photos[0] : data.photos}?w=600 600w,
                      ${Array.isArray(data.photos) ? data.photos[0] : data.photos}?w=900 900w
                    `}
                    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
                  />
                </Link>
              </li>
            ))
          )}
        </ul>
        {isMobile ? null : (
          <Aside
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        )}
      </main>
      <div id="buttons">
        <button onClick={previousPage} disabled={page === 1}>
          previous
        </button>
        <p>
          {page} / {totalPages === 0 ? 1 : totalPages}
        </p>
        <button onClick={nextPage} disabled={page === totalPages}>
          next
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Home;
