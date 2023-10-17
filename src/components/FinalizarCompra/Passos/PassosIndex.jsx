import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { Produtos } from '../Produtos/ProdutosIndex';
import { Endereco } from '../Entrega/EntregaIndex';
import { Pagamento } from '../Pagamentos/PagamentoIndex';


export function Passos() {
  const [currentStep, setCurrentStep] = useState(0);
  const [compraEfetuada, setCompraEfetuada] = useState(false);

  function handleNext() {
    setCurrentStep(currentStep + 1);
  }

  function handleBack() {
    setCurrentStep(currentStep - 1);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentStep}>
        <Step>
          <StepLabel>Produto</StepLabel>
        </Step>
        <Step>
          <StepLabel>Endereço</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pagamento</StepLabel>
        </Step>
      </Stepper>

      {currentStep === 0 && !compraEfetuada && <Produtos />}
      {currentStep === 1 && !compraEfetuada && <Endereco />}
      {currentStep === 2 && !compraEfetuada && <Pagamento />}

      {currentStep > 0 && !compraEfetuada && (
        <Button onClick={handleBack}>
          Voltar
        </Button>
      )}

      {currentStep < 2 && !compraEfetuada && (
        <Button onClick={handleNext}>
          Próximo
        </Button>
      )}

      {currentStep === 2 && !compraEfetuada && (
        <Button onClick={() => setCompraEfetuada(true)}>
          Finalizar
        </Button>
      )}

      {compraEfetuada && (
        <Alert severity="success">
          Compra efetuada com sucesso! Confira seu e-mail para mais informações.
        </Alert>
      )}
    </Box >
  );
}