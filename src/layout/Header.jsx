import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import checkMobile from '../components/CheckMobile';
import { useParams } from "react-router";

const Header = ({ search, setSearch }) => {
    const isMobile = checkMobile();
    const { id } = useParams();

    const [theme, setTheme] = useState('light');
    const [activeSearch, setActiveSearch] = useState(true);
    const [inputValue, setInputValue] = useState(search);

    useEffect(() => {
        setActiveSearch(!isMobile)
    }, [isMobile])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(inputValue);
        }, 500);
        return () => clearTimeout(handler);
    }, [inputValue, setSearch]);

    const handleMobileSearch = () => {
        if (isMobile) {
            return activeSearch ? 'show' : '';
        }
        return 'show';
    }

    return (
        <header className='section'>
            <Link to='/'>
                {isMobile ? <img src="/LogoMobile.svg" alt="logo dummy"/> : <img src="/logo.svg" alt="logo dummy"/>}
            </Link>
            {id ? null : 
            <input
                type="text"
                placeholder="Recherche avec le nom d'une annonce"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className={handleMobileSearch()}
            />
            }
            {id ? null: <button id='mobileSearch' onClick={() => setActiveSearch(activeSearch ? false : true)}><img src="/search.svg" alt='icone de recherche'/></button>}
            {id ? null: <button onClick={() => setTheme(theme => (theme === 'light' ? 'dark' : 'light'))} className='circle'>{theme === 'light' ? <img src='/dark.svg'></img> : <img src='/light.svg'></img>}</button> }
        </header>
    )
};

export default Header;