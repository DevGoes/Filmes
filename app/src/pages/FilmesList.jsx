import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilmeService from '@/services/Filme';
import '@/styles/FilmesList.css';

const FilmesList = () => {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilmes = async () => {
            try {
                const response = await FilmeService.listar();
                setFilmes(response.data);
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilmes();
    }, []);

    return (
        <div>
            <div className="filmes-header">
                <h2 style={{ color: "#fff" }}>Filmes</h2>
                <button
                    className="filmes-add-btn"
                    onClick={() => navigate('/filme/novo')}
                >
                    + Novo Filme
                </button>
            </div>

            {loading ? (
                <p style={{ color: '#ccc' }}></p>
            ) : filmes.length === 0 ? (
                <p style={{ color: '#ccc' }}>Nenhum filme cadastrado.</p>
            ) : (
                <div className="filmes-grid">
                    {filmes.map((filme) => (
                        <div
                            key={filme.id}
                            className="filmes-card"
                            onClick={() => navigate(`/filme/${filme.id}`)}
                        >
                            <img
                                src={filme.url_imagem || 'https://via.placeholder.com/300x180?text=Filme'}
                                alt={filme.titulo}
                                className="filmes-img"
                            />
                            <h3 className="filmes-titulo">{filme.titulo}</h3>
                            <p className="filmes-genero">{filme.genero}</p>
                            <p className="filmes-ano">{filme.ano_lancamento}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilmesList;
