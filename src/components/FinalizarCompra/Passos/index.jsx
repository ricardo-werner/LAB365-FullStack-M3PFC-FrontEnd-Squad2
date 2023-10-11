import { Component } from 'react';
import Stepper from 'react-stepper-horizontal';
import { PiNumberCircleOneBold, PiNumberCircleTwoBold, PiNumberCircleThreeBold } from 'react-icons/pi';

class Passos extends Component {
    constructor() {
        super();
        this.state = {
            steps: [{
                title: 'Produto',
                PiNumberCircleOneBold,
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 1)
                }
            }, {
                title: 'Endereço',
                PiNumberCircleTwoBold,
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 2)
                }
            }, {
                title: 'Pagamento',
                PiNumberCircleThreeBold,
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 3)
                }
            }],

            currentStep: 0,
        };
        this.onClickNext = this.onClickNext.bind(this);
    }

    onClickNext() {
        const { currentStep } = this.state;
        this.setState({
            currentStep: currentStep + 1,
        });
    }

    onClickPrevious() {
        const { currentStep } = this.state;
        this.setState({
            currentStep: currentStep - 1,
        });
    }

    render() {
        const { steps, currentStep } = this.state;

        const onClickNext = () => {
            this.setState((prevState) => ({
                currentStep: prevState.currentStep + 1
            }));
        };

        const onClickPrevious = () => {
            this.setState((prevState) => ({
                currentStep: prevState.currentStep - 1
            }));
        };

        return (
            <div>
                <Stepper steps={steps} activeStep={currentStep} />
                <div className='d-flex justify-content-between p-5'>
                    <button type="button" className="btn btn-danger" onClick={onClickPrevious}>Voltar</button>
                    <button type="button" className="btn btn-primary" onClick={onClickNext} >Próximo</button>
                </div>
            </div>
        );
    }

}

export default Passos;