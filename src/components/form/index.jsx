import { useState } from 'react';
import { toast } from 'react-toastify';

import styles from './styles.module.css'

export default function Form({ setHoteis, hoteis, setModalAberto }) {
    const [indexSelecionado, setIndexSelecionado] = useState(-1);
    const [nome, setNome] = useState("");
    const [classificacao, setClassificacao] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [descricao, setDescricao] = useState("");
    const [descricaoDetalhada, setDescricaoDetalhada] = useState("");
    const [diaria, setDiaria] = useState("");
    const [imagemPrincipal, setImagemPrincipal] = useState("");
    const [imagem2, setImagem2] = useState("");
    const [imagem3, setImagem3] = useState("");
    const [imagem4, setImagem4] = useState("");
    const [imagem5, setImagem5] = useState("");

    const [erros, setErros] = useState({});

    const validaForm = () => {
        let erros = {};

        if (nome.length < 5 || /[!@#$%^&*(),.?":{}|<>]/.test(nome)) {
            erros.nome = "Deve ter mais de 5 caracteres e sem símbolos.";
        }

        if (!/^(?:[1-4](\.\d{1})?|5(\.0)?)$/.test(classificacao)) {
            erros.classificacao = "O número deve estar entre 1 e 5, com no máximo 1 casa decimal.";
        }

        if (cidade.length < 4 || /[!@#$%^&*(),.?":{}|<>]/.test(cidade)) {
            erros.cidade = "Deve ter mais de 3 caracteres e sem símbolos.";
        }

        if (!estado) {
            erros.estado = "Selecione uma UF.";
        }

        if (descricao.length < 5) {
            erros.descricao = "A descrição deve ter no mínimo 5 caracteres.";
        }

        if (descricaoDetalhada.length < 5) {
            erros.descricaoDetalhada = "Os benefícios devem ter no mínimo 5 caracteres.";
        }

        if (!/^\d+(\.\d{1,2})?$/.test(diaria)) {
            erros.diaria = "Insira um número maior que 0 e com no máximo 2 casas decimais.";
        }

        if (imagemPrincipal.length < 5) {
            erros.imagemPrincipal = "O link deve conter no mínimo 5 caracteres.";
        }

        if (imagem2.length < 5) {
            erros.imagem2 = "O link deve conter no mínimo 5 caracteres.";
        }

        if (imagem3.length < 5) {
            erros.imagem3 = "O link deve conter no mínimo 5 caracteres.";
        }

        if (imagem4.length < 5) {
            erros.imagem4 = "O link deve conter no mínimo 5 caracteres.";
        }

        if (imagem5.length < 5) {
            erros.imagem5 = "O link deve conter no mínimo 5 caracteres.";
        }

        return erros;
    }

    function preencherFormulario(hotel, index) {
        setIndexSelecionado(index);
        setNome(hotel.nome);
        setClassificacao(hotel.classificacao);
        setCidade(hotel.cidade);
        setEstado(hotel.estado);
        setDescricao(hotel.descricao);
        setDescricaoDetalhada(hotel.descricaoDetalhada);
        setDiaria(hotel.diaria);
        setImagemPrincipal(hotel.imagemPrincipal);
        setImagem2(hotel.imagem2);
        setImagem3(hotel.imagem3);
        setImagem4(hotel.imagem4);
        setImagem5(hotel.imagem5);
    } 

    function editarHotel(event) {
        event.preventDefault();
        const copiaHoteis = [...hoteis];
    
        copiaHoteis[indexSelecionado].nome = nome;
        copiaHoteis[indexSelecionado].classificacao = classificacao;
        copiaHoteis[indexSelecionado].cidade = cidade;
        copiaHoteis[indexSelecionado].estado = estado;
        copiaHoteis[indexSelecionado].descricao = descricao;
        copiaHoteis[indexSelecionado].descricaoDetalhada = descricaoDetalhada;
        copiaHoteis[indexSelecionado].diaria = diaria;
        copiaHoteis[indexSelecionado].imagemPrincipal = imagemPrincipal;
        copiaHoteis[indexSelecionado].imagem2 = imagem2;
        copiaHoteis[indexSelecionado].imagem3 = imagem3;
        copiaHoteis[indexSelecionado].imagem4 = imagem4;
        copiaHoteis[indexSelecionado].imagem5 = imagem5;
    
        setHoteis(copiaHoteis);
        localStorage.setItem("@hoteis", JSON.stringify(copiaHoteis));
        setModalAberto(false);
    }

    function cadastrarHotel(event) {
        event.preventDefault();
    
        const errosValidacao = validaForm();
        if (Object.keys(errosValidacao).length > 0) {
            setErros(errosValidacao);
            
            toast.error('Erro ao cadastrar o hotel. Verifique os campos.', {
                position: "top-right"
            });
            return;
        }
    
        const copy = [...hoteis];
        const ultimoId = Number(localStorage.getItem("@ultimoId")) || 0;
    
        try {
            copy.push({
                id: ultimoId + 1,
                nome,
                classificacao,
                cidade,
                estado,
                descricao,
                descricaoDetalhada,
                diaria: Number(diaria),
                imagemPrincipal,
                imagem2,
                imagem3,
                imagem4,
                imagem5,
            });
    
            setHoteis(copy);
            localStorage.setItem("@hoteis", JSON.stringify(copy));
            localStorage.setItem("@ultimoId", ultimoId + 1);
    
            setNome("");
            setClassificacao("");
            setCidade("");
            setEstado("");
            setDescricao("");
            setDescricaoDetalhada("");
            setDiaria("");
            setImagemPrincipal("");
            setImagem2("");
            setImagem3("");
            setImagem4("");
            setImagem5("");
            setModalAberto(false);
    
            toast.success('Hotel cadastrado com sucesso!', {
                position: "top-right"
            });
        } catch (error) {
            toast.error('Erro ao salvar o hotel. Tente novamente.', {
                position: "top-right"
            });
            console.error("Erro ao acessar o localStorage: ", error);
        }
    }   

    return (
        <div className={styles.container_modal}>
            <form onSubmit={(event) => indexSelecionado >= 0 ? editarHotel(event) : cadastrarHotel(event)}>
                <input placeholder='Nome do local' value={nome} onChange={(event) => setNome(event.target.value)} />
                {erros.nome && <p className={styles.erro}>{erros.nome}</p>}
                
                <div className={styles.row}>
                    <div>
                        <input placeholder='Classificação' value={classificacao} onChange={(event) => setClassificacao(event.target.value)} />
                        {erros.classificacao && <p className={styles.erro}>{erros.classificacao}</p>}
                    </div>
                    
                    <div>
                        <input placeholder='Cidade' value={cidade} onChange={(event) => setCidade(event.target.value)} />
                        {erros.cidade && <p className={styles.erro}>{erros.cidade}</p>}
                    </div>
                    
                    <div>
                        <select value={estado} onChange={(event) => setEstado(event.target.value)}>
                        <option value="" disabled>UF</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                        </select>
                        {erros.estado && <p className={styles.erro}>{erros.estado}</p>}
                    </div>
                    
                    <div>
                        <input placeholder='Valor por noite' value={diaria} onChange={(event) => {
                            const valor = event.target.value;
                            
                                if (/^\d*\.?\d{0,2}$/.test(valor)) {
                                setDiaria(valor);
                                }
                            }}
                        />
                        {erros.diaria && <p className={styles.erro}>{erros.diaria}</p>}
                    </div>
                </div>
                
                <textarea placeholder='Descrição' value={descricao} onChange={(event) => setDescricao(event.target.value)}></textarea>
                {erros.descricao && <p className={styles.erro}>{erros.descricao}</p>}
                
                <textarea placeholder='Benefícios' value={descricaoDetalhada} onChange={(event) => setDescricaoDetalhada(event.target.value)}></textarea>
                {erros.descricaoDetalhada && <p className={styles.erro}>{erros.descricaoDetalhada}</p>}
                
                <input placeholder='Imagem principal' value={imagemPrincipal} onChange={(event) => setImagemPrincipal(event.target.value)} />
                {erros.imagemPrincipal && <p className={styles.erro}>{erros.imagemPrincipal}</p>}
                
                <input placeholder='Imagem 2' value={imagem2} onChange={(event) => setImagem2(event.target.value)} />
                {erros.imagem2 && <p className={styles.erro}>{erros.imagem2}</p>}
                
                <input placeholder='Imagem 3' value={imagem3} onChange={(event) => setImagem3(event.target.value)} />
                {erros.imagem3 && <p className={styles.erro}>{erros.imagem3}</p>}
                
                <input placeholder='Imagem 4' value={imagem4} onChange={(event) => setImagem4(event.target.value)} />
                {erros.imagem4 && <p className={styles.erro}>{erros.imagem4}</p>}
                
                <input placeholder='Imagem 5' value={imagem5} onChange={(event) => setImagem5(event.target.value)} />
                {erros.imagem5 && <p className={styles.erro}>{erros.imagem5}</p>}

                <div className={styles.buttons}>
                    <button type='submit'>Salvar</button>
                    <button type='button' onClick={() => setModalAberto(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}