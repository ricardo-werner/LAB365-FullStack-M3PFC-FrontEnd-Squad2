import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

export default function PaginaNaoEncontrada() {
  const handleGoBack = () => {
    window.history.back(); // Volta para a página anterior
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '85vh',
      }}
    >
      <Grid item xs={12} sm={12} textAlign="center">
        <Typography variant='h1'>
          <b>404</b>
        </Typography>
        <Typography variant='p' color='text.secondary'>
          Isso é um erro.
        </Typography>
        <Typography variant='p' component='div'>
          A URL requisitada não foi encontrada em nossos servidores.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 5 }} onClick={handleGoBack}>
          Voltar
        </Button>
      </Grid>
    </Grid>
  );
}
