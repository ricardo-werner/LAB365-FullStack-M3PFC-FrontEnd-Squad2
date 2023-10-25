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
            <div className="mt-4 form-floating">
                <select
                    className="form-select" style={{ backgroundColor: 'rgb(32,193,148)' }}
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
                <label className="labelPagamento" htmlFor="floatingSelect" style={{ "fontWeight": "bold" }}>Selecione a Forma de Pagamento</label>

                {selectedOption === '1' && <CartaoCredito />}
                {selectedOption === '2' && <Boleto />}
                {selectedOption === '3' && <Pix />}
                {selectedOption === '4' && <Transferencia />}
            </div>
        );
    }
}


