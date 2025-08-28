import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthService from '@/services/Auth';
import { setToken, setUser } from '@/store/authSlice';
import '@/styles/LoginPage.css';
import Clapperboard from "@/assets/icons/clapperboard.svg";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [erro, setErro] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            if (isLogin) {
                const response = await AuthService.login({ email, password });
                dispatch(setToken(response.data.access_token));
                dispatch(setUser(response.data.user));
                navigate('/');
            } else {
                if (password !== confirm) {
                    setErro('As senhas não coincidem');
                    return;
                }

                const response = await AuthService.register({
                    name,
                    email,
                    password,
                    password_confirmation: confirm,
                });

                dispatch(setToken(response.data.access_token));
                dispatch(setUser(response.data.user));
                navigate('/');
            }
        } catch (error) {
            setErro(error.response?.data?.error || 'Erro ao processar requisição');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-info">
                <div className="auth-logo">
                    <img src={Clapperboard} alt="Clapperboard" />
                    <span>CinePrime</span>
                </div>
                <p className="auth-description">
                    Login para acessar lançamentos e suas listas personalizadas.
                </p>
            </div>

            <div className="auth-form">
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <label>E-mail:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {!isLogin && (
                        <>
                            <label>Confirme a senha:</label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                            />
                        </>
                    )}

                    {erro && <div className="error">{erro}</div>}

                    <button type="submit">
                        {isLogin ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>

                <button
                    className="toggle-button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Criar nova conta' : 'Já tenho uma conta'}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
