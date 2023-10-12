import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import FinalizarCompraCard from '../../components/FinalizarCompra/FinalizarCompraCard';
import './FinalizarCompra.css';

const FinalizarCompraPage = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }


    return (
        <div >
            <h1 className='row mx-4'>
                Finalizar Compra
            </h1>
            <FinalizarCompraCard />
            <button
                className='btn btn-danger mx-3 my-2'
                onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default FinalizarCompraPage;