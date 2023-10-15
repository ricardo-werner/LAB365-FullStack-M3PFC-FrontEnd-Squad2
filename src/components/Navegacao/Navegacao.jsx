import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
    CssBaseline,
    Drawer as MuiDrawer,
    Box,
    AppBar as MuiAppBar,
    Toolbar,
    List,
    Typography,
    IconButton,
    Divider,
    Container
} from '@mui/material';
import { MdMenu } from 'react-icons/md';
import { MdChevronLeft } from 'react-icons/md';
import { mainListItems, secondaryListItems } from './NavegacaoItem'; // Importa as opções do menu
import { Routes, Route } from 'react-router-dom'; // Importa componentes para gerenciar rotas
import PaginaNaoEncontrada from './404'
import logo from '../../assets/imagens/logo.png';

// Largura da Gaveta
const drawerWidth = 240;

// Define características de estilo para AppBar e também controla animação de abertura e fechamento.
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Personaliza o Drawer tornando responsivo durante a abertura e fechamento.
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(7),
                },
            }),
        },
    }),
);

export default function Navegacao() {

    const theme = useTheme();

    // Estado para controlar a abertura e fechamento do Drawer
    const [open, setOpen] = React.useState(false);

    // Função para alternar o estado do Drawer (abrir/fechar)
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar: Barra superior */}
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // Mantém o padding da direita quando o Drawer está fechado.
                    }}
                >
                    {/* Ícone para abrir o Drawer */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MdMenu />
                    </IconButton>
                    {/* Logo na barra superior */}
                    <img
                        style={{}}
                        alt="Logo"
                        src={logo}
                        width="50"
                        height="50"
                    />
                    {/* Título da aplicação */}
                    <Typography
                        component="p"
                        variant="p"
                        color="inherit"
                        fontWeight="bold"
                        noWrap
                        sx={{
                            flexGrow: 1,
                            ml: 1
                        }}
                    >
                        PharmaSellticos Marcketplace
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer: Menu lateral */}
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    {/* Ícone para fechar o Drawer */}
                    <IconButton onClick={toggleDrawer}>
                        <MdChevronLeft />
                    </IconButton>
                    {/* Logo no menu lateral */}
                    <img
                        style={{ padding: '5px' }}
                        alt="Logo"
                        src={logo}
                        width="180"
                        height="45"
                    />
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems} {/* Renderiza a lista de opções principais do menu */}
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems} {/* Renderiza a lista secundária de opções do menu */}
                </List>
            </Drawer>

            {/* Conteúdo principal */}
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="xl">
                    {/* Rotas internas para as opções do menu */}
                    <Routes>
                        <Route path="/" element={<login />} />
                        {/*<Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/medicamentos" element={<Medicamentos />} />
                        <Route path="/medicamentocreate" element={<MedicamentoCreate />} />
                        <Route path="/finalizar" element={<FinalizarCompraPage />} />
                        <Route path='/*' element={<PaginaNaoEncontrada />} />*/}
                    </Routes>
                </Container>
            </Box>
        </Box>
    );
}

