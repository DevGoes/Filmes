import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';
import Clapperboard from '@/assets/icons/clapperboard.svg';
import '@/styles/Header.css';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header__logo" onClick={() => navigate('/')}>
                <img src={Clapperboard} alt="Clapperboard" className="header__logoIcon" />
                <span className="header__logoText">CinePrime</span>
            </div>

            {user && (
                <div className="header__userArea">
                    <span className="header__userName" title={user.name}>
            {user.name}
          </span>
                    <button onClick={handleLogout} className="header__logoutBtn">
                        Sair
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
