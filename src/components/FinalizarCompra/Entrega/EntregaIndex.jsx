import React, { useState, useEffect, useContext } from "react";
import { api } from "../../../service/api";
import { Paper, Grid, Box, Button, Typography } from "@mui/material";
import { FormCadastrarNovoEndereco } from "../../Endereco/CadastroNovoEndereco";

import { AuthContext } from "../../../contexts/auth"; // Importe o contexto de autenticação

export function Endereco() {
  const { user } = useContext(AuthContext); // Obtenha o usuário do contexto de autenticação
  const usuarioId = user ? user.id : null; // Obtenha o usuarioId do usuário logado
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");

  const fetchEnderecos = async () => {
    try {
      // Obtenha o token de autenticação do localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Token de autenticação não encontrado no localStorage."
        );
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await api.get(`/comprador/endereco`);
      setEnderecos(response.data);
      if (!response.ok) {
        throw new Error("Não foi possível obter os endereços.");
      }

      const data = await response.json();
      setEnderecos(data);
    } catch (error) {
      console.error("Erro ao buscar os endereços:", error);
    }
  };

  const handleEnderecoSelect = (enderecoId) => {
    setEnderecoSelecionado(enderecoId);
  };

  useEffect(() => {
    fetchEnderecos();
  }, []);

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
                cursor: "pointer",
                backgroundColor:
                  endereco.id === enderecoSelecionado
                    ? "rgb(32, 193, 148)"
                    : "white", // Cor de fundo quando selecionado
              }}
              onClick={() => handleEnderecoSelect(endereco.id)}
            >
              <Typography variant="body2" p={2}>
                CEP: {endereco.cep}, Logradouro: {endereco.logradouro}, Número:{" "}
                {endereco.numero}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Renderize o modal para o novo endereço */}
      <FormCadastrarNovoEndereco onAdressCreated={fetchEnderecos} />
    </Box>
  );
}
