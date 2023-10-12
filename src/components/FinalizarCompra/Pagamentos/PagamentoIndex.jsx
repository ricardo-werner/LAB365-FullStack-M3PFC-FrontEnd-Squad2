import { Component } from 'react';
import { CartaoCredito } from './CartaoCreditoForm';
import { Boleto } from './BoletoForm';
import { Pix } from './PixForm';
import { Transferencia } from './TransferenciaForm';

export class Pagamento extends Component {
    constructor() {
        super();
        this.state = {
            selectedOption: '', // Estado para armazenar a opção selecionada
        };
    }

    handleSelectChange = (e) => {
        this.setState({ selectedOption: e.target.value });
    }

    render() {
        const { selectedOption } = this.state;

        return (
            <div className="form-floating">
                <select
                    className="form-select"
                    id="floatingSelect"
                    onChange={this.handleSelectChange}
                    value={selectedOption}
                >
                    <option value=""></option>
                    <option value="1">Cartão de Crédito</option>
                    <option value="2">Boleto</option>
                    <option value="3">Pix</option>
                    <option value="4">Transferência Bancária</option>
                </select>
                <label className="labelPagamento" htmlFor="floatingSelect">Selecione a Forma de Pagamento</label>

                {selectedOption === '1' && <CartaoCredito />}
                {selectedOption === '2' && <Boleto />}
                {selectedOption === '3' && <Pix />}
                {selectedOption === '4' && <Transferencia />}
            </div>
        );
    }
}


