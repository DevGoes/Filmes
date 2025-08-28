import '@/styles/Footer.css';
import Clapperboard from '@/assets/icons/clapperboard.svg';
import Instagram from '@/assets/icons/instagram.svg';
import YouTube from '@/assets/icons/youtube.svg';
import TikTok from '@/assets/icons/tiktok.svg';
import Facebook from '@/assets/icons/facebook.svg';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__grid">
                    <div>
                        <div className="footer__brand">
                            <img className="footer__logo" src={Clapperboard} alt="CinePrime" />
                            <span className="footer__title">CinePrime</span>
                        </div>
                        <p className="footer__text">
                            Sua central de filmes, trailers e listas personalizadas.
                            Descubra lançamentos, organize favoritos e acompanhe o que está em alta. 🍿
                        </p>
                        <div className="footer__social" aria-label="Redes sociais">
                            <a href="#" aria-label="Instagram">
                                <img src={Instagram} alt="Instagram" />
                            </a>
                            <a href="#" aria-label="YouTube">
                                <img src={YouTube} alt="YouTube" />
                            </a>
                            <a href="#" aria-label="TikTok">
                                <img src={TikTok} alt="TikTok" />
                            </a>
                            <a href="#" aria-label="Facebook">
                                <img src={Facebook} alt="Facebook" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer__colTitle">Links</h4>
                        <ul className="footer__list">
                            <li><a className="footer__link" href="#">Lançamentos</a></li>
                            <li><a className="footer__link" href="#">Top 10 da semana</a></li>
                            <li><a className="footer__link" href="#">Lista de desejos</a></li>
                            <li><a className="footer__link" href="#">Críticas & Avaliações</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer__colTitle">Gêneros</h4>
                        <ul className="footer__list">
                            <li><a className="footer__link" href="#">Ação</a></li>
                            <li><a className="footer__link" href="#">Drama</a></li>
                            <li><a className="footer__link" href="#">Suspense</a></li>
                            <li><a className="footer__link" href="#">Ficção científica</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer__colTitle">Receba novidades</h4>
                        <p className="footer__text" style={{ marginBottom: 10 }}>
                            Cadastre seu e-mail e receba alertas de estreias e coleções especiais.
                        </p>
                        <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                className="footer__input"
                                type="email"
                                placeholder="seuemail@exemplo.com"
                                aria-label="E-mail"
                            />
                            <button className="footer__btn" type="submit">Assinar</button>
                        </form>
                    </div>
                </div>

                <div className="footer__bottom">
                    <span>© {year} CinePrime — Projeto de Filmes</span>
                    <span>Desenvolvido por Lucas Góes</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
