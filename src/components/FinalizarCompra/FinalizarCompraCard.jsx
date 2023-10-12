import { Passos } from './Passos/PassosIndex';
import './FinalizarCompraCard.css';

function FinalizarCompraCard() {
    return (
        <div className="finalizar-compra-card">
            <div className="finalizar-compra-card__titulo">
                <h2>Finalizar Compra</h2>
            </div>
            <div className="finalizar-compra-card__passos">
                <Passos />
            </div>
        </div>
    );
}

export default FinalizarCompraCard;
