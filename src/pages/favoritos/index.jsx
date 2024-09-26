import { useEffect, useState } from "react";
import Header from "../../components/header";
import Hotel from "../../components/hotel";
import { useTheme } from '../../components/themeContext';

import styles from './styles.module.css';

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);
    const { isDarkTheme, toggleTheme } = useTheme();

    useEffect(() => {
        const favoritosStorage = JSON.parse(localStorage.getItem("@favoritos")) || [];
        setFavoritos(favoritosStorage);
    }, []);

    useEffect(() => {
        document.body.className = isDarkTheme ? 'darkTheme' : 'lightTheme';
    }, [isDarkTheme]);

    const handleRemoveFavorito = (id) => {
        const updatedFavoritos = favoritos.filter(hotel => hotel.id !== id);
        setFavoritos(updatedFavoritos);
    };

    //Não implementei nenhum botão para exclusão da tela de favoritos pois só de desmarcar o coração, já remove.

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h2>Meus Favoritos</h2>
                <div className={styles.container_list}>
                    {favoritos.length > 0 ? (
                        favoritos.map((hotel) => (
                            <Hotel 
                                key={hotel.id} 
                                hotel={hotel} 
                                onRemoveFavorito={handleRemoveFavorito}
                            />
                        ))
                    ) : (
                        <p>Você ainda não possui hotéis favoritos.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
