import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { Switch } from '@mui/material';
import { useTheme } from '../../components/themeContext';
import { MdSunny } from "react-icons/md";
import { AiFillMoon } from "react-icons/ai";

import styles from './styles.module.css';

export default function Header({ handleSearch }) {
    const { isDarkTheme, toggleTheme } = useTheme();

    return(
        <header className={styles.header}>
            <Link to={"/"}> 
                <h1>easyBook</h1>
            </Link>
            <input
                type="text"
                placeholder="Pesquisar em Hotéis..."
                className={styles.searchBar}
                onChange={(event) => handleSearch(event.target.value)}
            />
            <Link to={"/favoritos"}>
                <div className={styles.favorito}>
                    <HiHeart size={20} color="#229799" cursor="pointer" />
                    <p>Meus favoritos</p>
                </div>
            </Link>
            <div className={styles.themeToggle}>
                <MdSunny />
                <Switch 
                    checked={isDarkTheme} 
                    onChange={toggleTheme} 
                    color="default" 
                />
                <AiFillMoon />
            </div>
        </header>
    );
}
