import React, { useState, useEffect, useContext } from 'react';
import { api } from '../../../service/api';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { AuthContext } from '../../../contexts/auth'; // Importe o contexto de autenticação
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';

export const Endereco = () => {
  const { user } = useContext(AuthContext); // Obtenha o usuário do contexto de autenticação
  const usuarioId = user ? user.id : null; // Obtenha o usuarioId do usuário logado
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState('');

  useEffect(() => {
    if (usuarioId) {
      const fetchEnderecos = async () => {
        try {
          // Obtenha o token de autenticação do localStorage
          const token = localStorage.getItem('token');

          if (!token) {
            throw new Error(
              'Token de autenticação não encontrado no localStorage.'
            );
          }

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await api.get(`/comprador/endereco`);
          setEnderecos(response.data);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };

      fetchEnderecos();
    }
  }, [usuarioId]);

  const handleEnderecoSelect = (enderecoId) => {
    setEnderecoSelecionado(enderecoId);
  };

  return (
    <Box p={4}>
      <Typography variant="body1" p={2}>
        Endereço de Entrega
      </Typography>

      <Grid container spacing={2}>
        {enderecos.map((endereco) => (
          <Grid item xs={6} key={endereco.id}>
            <Paper
              elevation={endereco.id === enderecoSelecionado ? 5 : 3} // Elevação maior quando selecionado
              sx={{
                p: 2,
                cursor: 'pointer',
                backgroundColor:
                  endereco.id === enderecoSelecionado
                    ? 'rgb(32, 193, 148)'
                    : 'white', // Cor de fundo quando selecionado
              }}
              onClick={() => handleEnderecoSelect(endereco.id)}
            >
              <Typography variant="body2" p={2}>
                CEP: {endereco.cep}, Logradouro: {endereco.logradouro}, Número:{' '}
                {endereco.numero}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
