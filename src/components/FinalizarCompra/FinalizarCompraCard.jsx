import Passos from './Passos/index';

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
