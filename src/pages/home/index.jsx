import { Modal } from 'react-responsive-modal';
import { useEffect, useState } from 'react';

import Header from "../../components/header";
import Hotel from "../../components/hotel";
import Form from "../../components/form";
import { useTheme } from '../../components/themeContext';

import styles from './styles.module.css';
import 'react-responsive-modal/styles.css';

export default function Home() {
    const [modalAberto, setModalAberto] = useState(false);
    const [hoteis, setHoteis] = useState([]);
    const [palavraBuscada, setPalavraBuscada] = useState('');
    const [ordenarPor, setOrdenarPor] = useState('');
    const { isDarkTheme, toggleTheme } = useTheme();

    function recuperarHoteis() {
        const hoteisString = localStorage.getItem("@hoteis");
        const ultimoId = localStorage.getItem("@ultimoId");

        if (!ultimoId) {
            localStorage.setItem("@ultimoId", 0);
        }

        if (hoteisString) {
            const hoteisJSON = JSON.parse(hoteisString);
            setHoteis(hoteisJSON);
        }
    }

    useEffect(() => {
        recuperarHoteis();
    }, []);

    useEffect(() => {
        document.body.className = isDarkTheme ? 'darkTheme' : 'lightTheme';
    }, [isDarkTheme]);

    const handleSearch = (termo) => {
        setPalavraBuscada(termo.toLowerCase());
    };

    const handleSort = (event) => {
        setOrdenarPor(event.target.value);
    };

    const hoteisFiltrados = hoteis.filter((hotel) => 
        hotel.nome.toLowerCase().includes(palavraBuscada) || 
        hotel.cidade.toLowerCase().includes(palavraBuscada)
    );

    const hoteisOrdenados = hoteisFiltrados.sort((a, b) => {
        if (ordenarPor === 'preco') {
            return a.diaria - b.diaria;
        } else if (ordenarPor === 'classificacao') {
            return b.classificacao - a.classificacao;
        } else {
            return 0;
        }
    });

    return (
        <div className={isDarkTheme ? styles.darkTheme : styles.lightTheme}>
            <Header handleSearch={handleSearch} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className={styles.container}>
                <h2>Hotéis e Pousadas</h2>

                <div className={styles.sortContainer}>
                    <label htmlFor="sort">Ordenar por:</label>
                    <select id="sort" value={ordenarPor} onChange={handleSort}>
                        <option value="">Nenhum</option>
                        <option value="preco">Preço da diária</option>
                        <option value="classificacao">Classificação</option>
                    </select>
                </div>

                <div className={styles.container_list}>
                    {hoteisOrdenados.length > 0 ? (
                        hoteisOrdenados.map((hotel) => (
                            <Hotel key={hotel.id} hotel={hotel} />
                        ))
                    ) : (
                        <p>Não existem hotéis a serem exibidos.</p>
                    )}
                </div>
            </div>

            <button className={styles.modal_button} onClick={() => setModalAberto(true)}>+</button>

            <Modal
                open={modalAberto}
                onClose={() => setModalAberto(false)}
                center
            >
                <div className={styles.modalHandler}>
                    <h1>Cadastrar um Hotel</h1>
                    <Form setHoteis={setHoteis} hoteis={hoteis} setModalAberto={setModalAberto} />
                </div>
            </Modal>
        </div>
    );
}
