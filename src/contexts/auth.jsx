import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recuperacaoUsuario = localStorage.getItem('usuario');

        if (recuperacaoUsuario) {
            setUsuario(JSON.parse(recuperacaoUsuario));
        }
        setLoading(false);
    }, []);

    const logout = () => {
        console.log("logout");
        setUsuario(null);
        localStorage.removeItem('usuario');
        navigate('/login');
    }

    if (loading) {
        return <h1>Carregando...</h1>
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!usuario, usuario, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}