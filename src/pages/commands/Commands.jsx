import React, { useState, useEffect } from 'react';
import './Commands.css';
import { save, getAllCommands } from '../../services/CommandsService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Commands = () => {
    const [comandasOcupadas, setComandasOcupadas] = useState([]);
    const [comandasEmFechamento, setComandasEmFechamento] = useState([]);
    const [comandasDisponiveis, setComandasDisponiveis] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [totalPaginasOcupadas, setTotalPaginasOcupadas] = useState(0);
    const [totalPaginasFechamento, setTotalPaginasFechamento] = useState(0);
    const [totalPaginasDisponiveis, setTotalPaginasDisponiveis] = useState(0);
    const navigate = useNavigate();
    const [paginaAtualOcupadas, setPaginaAtualOcupadas] = useState(0);
    const [paginaAtualEmFechamento, setPaginaAtualEmFechamento] = useState(0);
    const [paginaAtualDisponiveis, setPaginaAtualDisponiveis] = useState(0);

    const [comandaSelecionada, setComandaSelecionada] = useState(null);

    useEffect(() => {
        const fetchCommands = async () => {
            try {
                const response = await getAllCommands(paginaAtualOcupadas, 10);
                setTotalPaginasOcupadas(response.totalPages);

                const ocupadas = response.content.filter(comanda => comanda.status === 'OCUPADA');
                setComandasOcupadas(ocupadas);

                const responseFechamento = await getAllCommands(paginaAtualEmFechamento, 10);
                setTotalPaginasFechamento(responseFechamento.totalPages);

                const emFechamento = responseFechamento.content.filter(comanda => comanda.status === 'FECHAMENTO');
                setComandasEmFechamento(emFechamento);

                const responseDisponiveis = await getAllCommands(paginaAtualDisponiveis, 10);
                setTotalPaginasDisponiveis(responseDisponiveis.totalPages);

                const disponiveis = responseDisponiveis.content.filter(comanda => comanda.status === 'DISPONIVEL');
                setComandasDisponiveis(disponiveis);
            } catch (error) {
                toast.error("Erro ao buscar comandas disponíveis!");
                console.error("Erro ao buscar comandas:", error);
            }
        };

        fetchCommands();
    }, [paginaAtualOcupadas, paginaAtualEmFechamento, paginaAtualDisponiveis]);

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setNome('');
        setDescricao('');
    };

    const abrirComanda = async () => {
        const commandData = {
            nome,
            descricao,
        };

        try {
            await save(commandData);
            toast.success("Comanda salva com sucesso!");
        } catch (error) {
            toast.error("Erro ao salvar a comanda!");
            console.error("Erro ao fazer requisição:", error);
        }
        fecharModal();
    };

    const handleComandaClick = (comanda) => {
        setComandaSelecionada(comanda);
    };

    const handleAdicionarItemClick = () => {
        navigate('/new-item');
    };

    const Pagination = ({ paginaAtual, setPaginaAtual, totalPaginas }) => (
        <div className="paginacao">
            <button
                onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 0))}
                disabled={paginaAtual === 0}
            >
                Anterior
            </button>
            {[...Array(totalPaginas)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => setPaginaAtual(index)}
                    className={index === paginaAtual ? 'ativo' : ''}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas - 1))}
                disabled={paginaAtual === totalPaginas - 1}
            >
                Próxima
            </button>
        </div>
    );

    return (
        <div className="commands comanda-container">
            <div className="comandas-selecionadas">
                <span className="titulo">Comanda Selecionada</span>
                {comandaSelecionada && (
                    <div className="comanda-selecionada-container">
                        <div className="comanda-selecionada">
                            <p>{comandaSelecionada.nome}</p>
                        </div>
                        <span className="check-icon">✔</span>
                        <button
                            className="adicionar-item"
                            onClick={handleAdicionarItemClick}
                        >
                            + Adicionar Item
                        </button>
                    </div>
                )}
                {!comandaSelecionada && (
                    <button className="adicionar-item" onClick={handleAdicionarItemClick}>
                        + Adicionar Item
                    </button>
                )}
            </div>

            <div className="comandas-table">
                <span className="titulo">Comandas Ocupadas</span>
                <ul id="comandas-lista">
                    {comandasOcupadas.map((comanda, index) => (
                        <li
                            key={index}
                            className={`comanda-item ${comanda.id === comandaSelecionada?.id ? 'selecionada' : ''}`}
                            onClick={() => handleComandaClick(comanda)}
                        >
                            {comanda.nome}
                        </li>
                    ))}
                </ul>

                <Pagination 
                    paginaAtual={paginaAtualOcupadas} 
                    setPaginaAtual={setPaginaAtualOcupadas} 
                    totalPaginas={totalPaginasOcupadas} 
                />
            </div>

            <div className="comandas-table">
                <span className="titulo">Comandas em Fechamento</span>
                <p id="quantidade-comandas-fechamento">{comandasEmFechamento.length} Comandas em Fechamento</p>
                <ul id="comandas-fechamento-list">
                    {comandasEmFechamento.map((comanda, index) => (
                        <li key={index}>{comanda.nome}</li>
                    ))}
                </ul>

                <Pagination 
                    paginaAtual={paginaAtualEmFechamento} 
                    setPaginaAtual={setPaginaAtualEmFechamento} 
                    totalPaginas={totalPaginasFechamento} 
                />
            </div>

            <div className="comandas-table">
                <span className="titulo">Adicionar Comanda</span>
                <ul id="comandas-lista">
                    <li className="comanda-item" onClick={abrirModal}>+ Cadastrar Comanda</li>
                    {comandasDisponiveis.map((comanda, index) => (
                        <li
                            key={index}
                            className={`comanda-item ${comanda.id === comandaSelecionada?.id ? 'selecionada' : ''}`}
                            onClick={() => handleComandaClick(comanda)}
                        >
                            Comanda {comanda.nome}
                        </li>
                    ))}
                </ul>

                <Pagination 
                    paginaAtual={paginaAtualDisponiveis} 
                    setPaginaAtual={setPaginaAtualDisponiveis} 
                    totalPaginas={totalPaginasDisponiveis} 
                />
            </div>

            {modalAberto && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Nova Comanda</h2>
                            <span className="modal-title">Cadastrar Comanda</span>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <label htmlFor="nome-cliente">Nome do Cliente</label>
                                <div className="input-with-icon">
                                    <input
                                        type="text"
                                        id="nome-cliente"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Digite o nome do cliente"
                                    />
                                    <i className="icon-user">+user</i>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="observacao">Observação</label>
                                <textarea
                                    id="observacao"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="Digite uma observação"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="cancelar-btn" onClick={fecharModal}>Cancelar</button>
                            <button className="abrir-btn" onClick={abrirComanda}>Abrir Comanda</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Commands;
