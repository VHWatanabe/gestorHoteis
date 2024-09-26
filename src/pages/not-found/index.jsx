import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.container}>
            <h1>Página não encontrada</h1>
            <h3>Em breve você será redirecionado para nossa página principal...</h3>
        </div>
    );
}
