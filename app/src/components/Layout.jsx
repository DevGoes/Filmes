import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.content}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    content: {
        flex: 1,
        padding: '100px 20px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
    }
};

export default Layout;
