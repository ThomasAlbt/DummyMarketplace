import { Link } from 'react-router';

const Header = ({ search, setSearch }) => (
    <header>
        <Link to='/'><img src="../../public/logo.svg" alt="logo dummy" /></Link>
        <input
            type="text"
            placeholder="Recherche avec le nom d'une annonce"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </header>
);


export default Header;