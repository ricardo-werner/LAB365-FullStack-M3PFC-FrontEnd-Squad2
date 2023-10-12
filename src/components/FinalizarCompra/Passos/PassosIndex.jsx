import { Component } from 'react';
import Stepper from 'react-stepper-horizontal';
import { PiNumberCircleOneBold, PiNumberCircleTwoBold, PiNumberCircleThreeBold } from 'react-icons/pi';
import { Produtos } from '../Produtos/ProdutosIndex';
import { Endereco } from '../Entrega/EntregaIndex';
import { Pagamento } from '../Pagamentos/PagamentoIndex';

export class Passos extends Component {
  constructor() {
    super();
    this.state = {
      steps: [
        {
          title: 'Produto',
          PiNumberCircleOneBold,
          onClick: (e) => {
            e.preventDefault();
            console.log('onClick', 1);
          }
        },
        {
          title: 'Endereço',
          PiNumberCircleTwoBold,
          onClick: (e) => {
            e.preventDefault();
            console.log('onClick', 2);
          }
        },
        {
          title: 'Pagamento',
          PiNumberCircleThreeBold,
          onClick: (e) => {
            e.preventDefault();
            console.log('onClick', 3);
          }
        }
      ],
      currentStep: 0,
      compraEfetuada: false,
    };
  }

  handleCompraEfetuada = () => {
    this.setState({
      compraEfetuada: true,
    });
  };

  onClickNext = () => {
    const { currentStep } = this.state;
    if (currentStep < 2) {
      this.setState({
        currentStep: currentStep + 1,
      });
    }
  };

  onClickPrevious = () => {
    const { currentStep } = this.state;
    if (currentStep > 0) {
      this.setState({
        currentStep: currentStep - 1,
        compraEfetuada: false,
      });
    }
  };

  render() {
    const { steps, currentStep, compraEfetuada } = this.state;

    return (
      <div>
        <Stepper steps={steps} activeStep={currentStep} />
        {currentStep === 0 && !compraEfetuada && <Produtos />}
        {currentStep === 1 && !compraEfetuada && <Endereco />}
        {currentStep === 2 && !compraEfetuada && <Pagamento />}

        {compraEfetuada && (
          <div className="alert alert-success" role="alert">
            Compra efetuada com sucesso, verifique seu e-mail.
          </div>
        )}

        <div className="d-flex justify-content-between p-5">
          {currentStep > 0 && !compraEfetuada && (
            <button type="button" className="btn btn-danger" onClick={this.onClickPrevious}>
              Voltar
            </button>
          )}
          {currentStep < 2 && !compraEfetuada && (
            <button type="button" className="btn btn-primary" onClick={this.onClickNext}>
              Próximo
            </button>
          )}
          {currentStep === 2 && !compraEfetuada && (
            <button type="button" className="btn btn-primary" onClick={this.handleCompraEfetuada}>
              Finalizar
            </button>
          )}
        </div>
      </div>
    );
  }
}
