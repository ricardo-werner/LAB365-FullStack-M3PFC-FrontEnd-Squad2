import * as React from 'react';
import { ListItemButton } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListSubheader } from '@mui/material';
import { MdMedication } from 'react-icons/md';
import { MdAddBox } from 'react-icons/md';
import { MdDashboard } from 'react-icons/md';
import { MdHelpCenter } from 'react-icons/md';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

// Componente para listar opções do Menu Lateral

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/dashboard/medicaments">
            <ListItemIcon>
                <MdMedication />
            </ListItemIcon>
            <ListItemText primary="Medicamentos" />
        </ListItemButton>
        <ListItemButton component={Link} to="/navegacao/">
            <ListItemIcon>
                <MdAddBox />
            </ListItemIcon>
            <ListItemText primary="Novo Medicamento" />
        </ListItemButton>
        <ListItemButton component={Link} to="/navegacao/">
            <ListItemIcon>
                <MdDashboard />
            </ListItemIcon>
            <ListItemText primary="Nova Farmácia" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Mais opções
        </ListSubheader>
        <ListItemButton component={Link} to="/navegacao/">
            <ListItemIcon>
                <MdHelpCenter />
            </ListItemIcon>
            <ListItemText primary="Ajuda" />
        </ListItemButton>
        <ListItemButton>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <ListItemIcon>
                    <MdLogout />
                </ListItemIcon>
                <ListItemText primary="Sair" />
            </Link>
        </ListItemButton>
    </React.Fragment>
);
