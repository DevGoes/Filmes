import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import LoginPage from '@/pages/LoginPage';
import Layout from '@/components/Layout';
import PublicLayout from '@/components/PublicLayout';

import FilmesList from '@/pages/FilmesList';
import FilmeForm from '@/pages/FilmeForm';
import FilmeDetails from '@/pages/FilmeDetails';

const PrivateRoute = ({children}) => {
    const token = useSelector((state) => state.auth.token);
    return token ? children : <Navigate to="/login" replace/>;
};

function App() {
    return (
        <BrowserRouter>
            <div style={{backgroundColor: '#000'}}>
                <Routes>
                    <Route path="/login" element={
                        <PublicLayout>
                            <LoginPage/>
                        </PublicLayout>
                    }/>

                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <FilmesList/>
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/filme/novo"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <FilmeForm/>
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/filme/:id"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <FilmeDetails/>
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/filme/:id/editar"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <FilmeForm/>
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
