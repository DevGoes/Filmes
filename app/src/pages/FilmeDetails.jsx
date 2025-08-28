import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FilmeService from '@/services/Filme';
import '@/styles/FilmeDetails.css';
import EditIcon from '@/assets/icons/edit.svg';
import DeleteIcon from '@/assets/icons/delete.svg';

const FilmeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState(null);
    const [erro, setErro] = useState(null);

    // modal
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const response = await FilmeService.buscarPorId(id);
                setFilme(response.data);
            } catch (error) {
                console.error('Erro ao buscar filme:', error);
                setErro('Filme não encontrado.');
            }
        };
        fetchFilme();
    }, [id]);

    const onKeyDown = useCallback((e) => {
        if (e.key === 'Escape') setIsOpen(false);
    }, []);
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onKeyDown);
            return () => document.removeEventListener('keydown', onKeyDown);
        }
    }, [isOpen, onKeyDown]);

    if (erro) return <p>{erro}</p>;
    if (!filme) return <p>Carregando...</p>;

    return (
        <div className="filme-container">
            <div className="filme-card">
                <img
                    src={filme.url_imagem || 'https://via.placeholder.com/600x300?text=Sem+Imagem'}
                    alt={filme.titulo}
                    className="filme-img"
                />
                <div className="filme-content">
                    <h2>{filme.titulo}</h2>
                    <p><strong>Ano:</strong> {filme.ano_lancamento}</p>
                    <p><strong>Gênero:</strong> {filme.genero}</p>
                    <p><strong>Sinopse:</strong></p>
                    <p>{filme.sinopse || 'Sem sinopse cadastrada.'}</p>

                    <div className="filme-buttons">
                        <button
                            className="filme-edit"
                            onClick={() => navigate(`/filme/${id}/editar`)}
                        >
                            <img src={EditIcon} alt="Editar" className="btn-icon" />
                            Editar Filme
                        </button>

                        <button
                            className="filme-delete"
                            onClick={() => setIsOpen(true)}
                        >
                            <img src={DeleteIcon} alt="Excluir" className="btn-icon" />
                            Excluir Filme
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="modal-overlay"
                    onClick={(e) => {
                        if (e.target.classList.contains('modal-overlay')) setIsOpen(false);
                    }}
                >
                    <div
                        className="modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                    >
                        <h3 id="modal-title">Confirmar exclusão</h3>
                        <p id="modal-desc">
                            Tem certeza que deseja excluir <strong>{filme.titulo}</strong>? Essa ação não pode ser desfeita.
                        </p>
                        <div className="modal-actions">
                            <button className="btn-neutral" onClick={() => setIsOpen(false)}>
                                Cancelar
                            </button>
                            <button
                                className="btn-danger"
                                onClick={async () => {
                                    try {
                                        await FilmeService.excluir(id);
                                        setIsOpen(false);
                                        navigate('/');
                                    } catch (error) {
                                        console.error('Erro ao excluir filme:', error);
                                    }
                                }}
                            >
                                Confirmar exclusão
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilmeDetails;
