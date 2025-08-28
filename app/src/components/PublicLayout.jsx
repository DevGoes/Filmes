const PublicLayout = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#121212'
        }}>
            {children}
        </div>
    );
};

export default PublicLayout;