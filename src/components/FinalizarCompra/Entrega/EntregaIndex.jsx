import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { AuthContext } from '../../../contexts/auth'; // Importe o contexto de autenticação

export function Endereco() {
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
                        throw new Error('Token de autenticação não encontrado no localStorage.');
                    }

                    const headers = {
                        'Authorization': `Bearer ${token}`,
                    };

                    const response = await fetch(`http://localhost:3333/api/comprador/endereco?usuarioId=${usuarioId}`, {
                        method: 'GET',
                        headers: headers,
                    });

                    if (!response.ok) {
                        throw new Error('Não foi possível obter os endereços.');
                    }

                    const data = await response.json();
                    setEnderecos(data);
                } catch (error) {
                    console.error('Erro ao buscar os endereços:', error);
                }
            };

            fetchEnderecos();
        }
    }, [usuarioId]);

    return (
        <Box p={4}>
            <Typography variant="body1" p={2}>
                Endereço de Entrega
            </Typography>
            <Select
                label="Selecione o Endereço de Entrega"
                value={enderecoSelecionado}
                onChange={(e) => setEnderecoSelecionado(e.target.value)}
            >
                {enderecos.map((endereco) => (
                    <MenuItem key={endereco.id} value={endereco.id}>
                        CEP: {endereco.cep}, Logradouro: {endereco.logradouro}, Número: {endereco.numero}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}