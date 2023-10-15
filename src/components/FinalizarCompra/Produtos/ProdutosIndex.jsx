import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


export function Produtos() {
    return (
        <Box p={4}>
            <Paper elevation={1}>
                <Typography 
                    variant="body1" 
                    p={2}>
                    Produto
                </Typography>
            </Paper>
        </Box>
            
    );
}