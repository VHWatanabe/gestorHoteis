import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiPencilSquare } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import { useTheme } from '../../components/themeContext';

import 'react-responsive-modal/styles.css';

import styles from './styles.module.css';

import Header from '../../components/header';
import Form from '../../components/form';

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [hoteis, setHoteis] = useState([]);
    const [imagemPrincipal, setImagemPrincipal] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const { isDarkTheme, toggleTheme } = useTheme();

    useEffect(() => {
        const hoteisString = localStorage.getItem("@hoteis");
        if (hoteisString) {
            const hoteisJSON = JSON.parse(hoteisString);
            setHoteis(hoteisJSON);
            const hotelEncontrado = hoteisJSON.find(h => h.id === Number(id));
            setHotel(hotelEncontrado);
            setImagemPrincipal(hotelEncontrado.imagemPrincipal);
        }
    }, [id]);

    useEffect(() => {
        document.body.className = isDarkTheme ? 'darkTheme' : 'lightTheme';
    }, [isDarkTheme]);

    if (!hotel) {
        return <p>Carregando...</p>;
    }

    const handleImageClick = (imagem) => {
        setImagemPrincipal(imagem);
    }

    const confirmarExclusao = () => {
        setModalConfirmacao(true);
    };

    const excluirHotel = () => {
        const hoteisString = localStorage.getItem("@hoteis");
        const favoritosString = localStorage.getItem("@favoritos");
        
        if (hoteisString) {
            let hoteisJSON = JSON.parse(hoteisString);
            const hoteisFiltrados = hoteisJSON.filter(h => h.id !== hotel.id);
            
            hoteisFiltrados.forEach((h, index) => {
                h.id = index + 1;
            });
    
            localStorage.setItem("@hoteis", JSON.stringify(hoteisFiltrados));
            localStorage.setItem("@ultimoId", hoteisFiltrados.length);
    
            if (favoritosString) {
                let favoritosJSON = JSON.parse(favoritosString);
                const favoritosFiltrados = favoritosJSON.filter(h => h.id !== hotel.id);
                localStorage.setItem("@favoritos", JSON.stringify(favoritosFiltrados));
            }
    
            navigate('/');
    
            toast.success('Hotel excluído com sucesso!', {
                position: "top-right"
            });
        } else {
            toast.error('Erro ao excluir o hotel. Tente novamente.', {
                position: "top-right"
            });
        }
    };

    const preencherFormulario = () => {
        if (hotel) {
            setModalAberto(true);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.mainImage}>
                    <img src={imagemPrincipal} alt={`${hotel.nome} imagem`} />

                    <div className={styles.extraImage}>
                        <img 
                            src={hotel.imagem2} 
                            onClick={() => handleImageClick(hotel.imagem2)} 
                            alt={`${hotel.nome} imagem 2`} 
                        />
                        <img 
                            src={hotel.imagem3} 
                            onClick={() => handleImageClick(hotel.imagem3)} 
                            alt={`${hotel.nome} imagem 3`} 
                        />
                        <img 
                            src={hotel.imagem4} 
                            onClick={() => handleImageClick(hotel.imagem4)} 
                            alt={`${hotel.nome} imagem 4`} 
                        />
                        <img 
                            src={hotel.imagem5} 
                            onClick={() => handleImageClick(hotel.imagem5)} 
                            alt={`${hotel.nome} imagem 5`} 
                        />
                    </div>
                </div>

                <div className={styles.info}>
                    <h1>{hotel.nome}</h1>
                    <p>{hotel.descricao}</p>
                    <p><strong>Localização:</strong> {`${hotel.cidade}, ${hotel.estado}`}</p>
                    <h2>O que este lugar oferece</h2>
                    <p>{hotel.descricaoDetalhada}</p>
                    <p>{`R$ ${hotel.diaria} noite`}</p>

                    <div className={styles.icons}>
                        <HiPencilSquare color='#229799' size={30} onClick={() => {setModalAberto(true); preencherFormulario();}} cursor="pointer" />
                        <HiTrash color='#229799' size={30} onClick={confirmarExclusao} cursor="pointer" />
                    </div>
                </div>
            </div>

            <Modal open={modalConfirmacao} onClose={() => setModalConfirmacao(false)} center>
                <div className={styles.container_modal}>
                    <h1>Deseja excluir este hotel?</h1>
                    <div className={styles.buttons}>
                        <button type='button' onClick={excluirHotel}>Sim</button>
                        <button type='button' onClick={() => setModalConfirmacao(false)}>Não</button>
                    </div>
                </div>
            </Modal>

            <Modal open={modalAberto} onClose={() => setModalAberto(false)} center>
                <div className={styles.container_modal}>
                    <h1>Editar Hotel</h1>
                    <Form 
                        setHoteis={setHoteis} 
                        hoteis={hoteis} 
                        setModalAberto={setModalAberto}
                    />
                </div>
            </Modal>
        </div>
    );
}