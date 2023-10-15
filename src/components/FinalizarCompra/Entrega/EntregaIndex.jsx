import React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';

export function Endereco() {
    return (
        <Box p={4}>
            <Typography variant="body1" p={2}>
                Endereço de Entrega
            </Typography>
            <Select label="Selecione o Endereço de Entrega">
                <MenuItem value={10}>Endereço1</MenuItem>
                <MenuItem value={20}>Endereço2</MenuItem>
            </Select>
        </Box>
    );
}


