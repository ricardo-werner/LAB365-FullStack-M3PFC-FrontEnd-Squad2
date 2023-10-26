import { Component, useContext } from 'react';
import { CartaoCredito } from './CartaoCreditoForm';
import { Boleto } from './BoletoForm';
import { Pix } from './PixForm';
import { Transferencia } from './TransferenciaForm';
import { CartContext } from '../../../contexts/carrinhoCompras';

export class Pagamento extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: '', // Estado para armazenar a opção selecionada
    };
  }

  handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    this.setState({ selectedOption });

    // Recupere os itens do carrinho do localStorage
    const itensCarrinho =
      JSON.parse(localStorage.getItem('itensCarrinho')) || [];

    // Atualize o tipo de pagamento em cada item do carrinho
    const itensCarrinhoComTipoPagamento = itensCarrinho.map((item) => ({
      ...item,
      tipoPagamento: selectedOption,
    }));

    console.log(itensCarrinhoComTipoPagamento, 'itensCarrinhoComTipoPagamento');
    // Atualize o localStorage com os itens do carrinho atualizados
    localStorage.setItem(
      'itensCarrinho',
      JSON.stringify(itensCarrinhoComTipoPagamento)
    );
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <div className="mt-4 form-floating">
        <select
          className="form-select"
          style={{ backgroundColor: 'rgb(32,193,148)' }}
          id="floatingSelect"
          onChange={this.handleSelectChange}
          value={selectedOption}
        >
          <option value=""></option>
          <option value="cartão de crédito">Cartão de Crédito</option>
          <option value="boleto">Boleto</option>
          <option value="PIX">Pix</option>
          <option value="transferência bancária">Transferência Bancária</option>
        </select>
        <label
          className="labelPagamento"
          htmlFor="floatingSelect"
          style={{ fontWeight: 'bold' }}
        >
          Selecione a Forma de Pagamento
        </label>

        {selectedOption === 'cartão de crédito' && <CartaoCredito />}
        {selectedOption === 'boleto' && <Boleto />}
        {selectedOption === 'PIX' && <Pix />}
        {selectedOption === 'transferência bancária' && <Transferencia />}
      </div>
    );
  }
}
