import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import CarrinhoCard from '../../components/CarrinhoCard/CarrinhoCard';
import './CarrinhoPage.css';

const CarrinhoPage = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }


    return (
        <div >
            <h1 className='row mx-4'>
                Carrinho de Compras
            </h1>
            <CarrinhoCard />
            <button
                className='btn btn-danger mx-3 my-2'
                onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default CarrinhoPage;