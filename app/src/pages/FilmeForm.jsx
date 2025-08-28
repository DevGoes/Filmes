import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FilmeService from '@/services/Filme';
import '@/styles/FilmeForm.css';

const FilmeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [form, setForm] = useState({
        titulo: '',
        ano_lancamento: '',
        genero: '',
        sinopse: '',
        url_imagem: ''
    });

    const [erro, setErro] = useState('');

    useEffect(() => {
        if (isEditing) {
            FilmeService.buscarPorId(id)
                .then(res => setForm(res.data))
                .catch(() => setErro('Erro ao carregar filme para edição.'));
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            if (isEditing) {
                await FilmeService.atualizar(id, form);
            } else {
                await FilmeService.cadastrar(form);
            }
            navigate('/');
        } catch (err) {
            setErro('Erro ao salvar filme. Verifique os dados e tente novamente.');
            console.error(err);
        }
    };

    return (
        <div className="filme-form-container">
            <h2>{isEditing ? 'Editar Filme' : 'Cadastrar Filme'}</h2>

            <form onSubmit={handleSubmit} className="filme-form">
                <label htmlFor="titulo">Título</label>
                <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="ano_lancamento">Ano de Lançamento</label>
                <input
                    type="number"
                    name="ano_lancamento"
                    id="ano_lancamento"
                    value={form.ano_lancamento}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="genero">Gênero</label>
                <input
                    type="text"
                    name="genero"
                    id="genero"
                    value={form.genero}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="sinopse">Sinopse</label>
                <textarea
                    name="sinopse"
                    id="sinopse"
                    value={form.sinopse}
                    onChange={handleChange}
                    rows={4}
                />

                <label htmlFor="url_imagem">URL da Imagem</label>
                <input
                    type="text"
                    name="url_imagem"
                    id="url_imagem"
                    value={form.url_imagem}
                    onChange={handleChange}
                />

                {erro && <p className="filme-form-error">{erro}</p>}

                <button type="submit" className="filme-form-btn">
                    {isEditing ? 'Salvar Alterações' : 'Cadastrar Filme'}
                </button>
            </form>
        </div>
    );
};

export default FilmeForm;
