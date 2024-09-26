import { Link } from "react-router-dom";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { GoStarFill } from "react-icons/go";

import styles from "./styles.module.css";

export default function Hotel({ hotel, onRemoveFavorito }) {
    const [isFavorito, setIsFavorito] = useState(false);

    useEffect(() => {
        const favoritos = JSON.parse(localStorage.getItem("@favoritos")) || [];
        const isFavorited = favoritos.some(fav => fav.id === hotel.id);
        setIsFavorito(isFavorited);
    }, [hotel.id]);

    const handleFavorito = (e) => {
        e.preventDefault();
        const favoritos = JSON.parse(localStorage.getItem("@favoritos")) || [];
        let updatedFavoritos;

        if (isFavorito) {
            updatedFavoritos = favoritos.filter(fav => fav.id !== hotel.id);
            if (onRemoveFavorito) onRemoveFavorito(hotel.id);
        } else {
            updatedFavoritos = [...favoritos, hotel];
        }

        localStorage.setItem("@favoritos", JSON.stringify(updatedFavoritos));
        setIsFavorito(!isFavorito);
    };

    return (
        <div className={styles.card}>
            <Link to={`/detalhes/${hotel.id}`} className={styles.link} target="_blank">
                <img src={hotel.imagemPrincipal} alt={hotel.nome} />
                <h3>{hotel.nome}</h3>
                <div className={styles.avaliacao}>
                    <GoStarFill />
                    <p>{hotel.classificacao}</p>
                </div>
                <p className={styles.localizacao}>{`${hotel.cidade}, ${hotel.estado}`}</p>
                <p>{`R$ ${hotel.diaria}`}</p>
            </Link>
            <div onClick={handleFavorito} className={styles.heartIcon}>
                {isFavorito ? <BsSuitHeartFill size={20} color="#48CFCB" /> : <BsSuitHeart size={20} color="#229799" />}
            </div>
        </div>
    );
}
