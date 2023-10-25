import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import logo from '../../assets/imagens/logo1.jpeg';
import { List, ListItem, ListItemIcon } from '@mui/material';
import { Avatar } from '@mui/material';
import { ListItemText } from '@mui/material';
import { UseAuth } from '../../Hooks/useAuth';
import { AuthContext } from '../../contexts/auth';

export default function Navbar({ children }) {
  const { authenticated,logout } = UseAuth();
  const navigate = useNavigate();
  const { tipoUsuario, nomeCompleto, setTipoUsuario, setNomeCompleto } =
    UseAuth();
  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const authContext = useContext(AuthContext);

  // Função para fazer logout quando o botão de logout é clicado
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    localStorage.clear();
    setNomeCompleto('');
    setTipoUsuario('');
    navigate('/');
  };

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem('usuario');
    if (usuarioRecuperado) {
      const usuarioLogado = JSON.parse(usuarioRecuperado);
      setTipoUsuario(usuarioLogado.tipoUsuario);
      setNomeCompleto(usuarioLogado.nomeCompleto);
    }
  }, [tipoUsuario, nomeCompleto]);

  const navbarStyles = {
    backgroundColor: 'rgb(32,193,148)',
    color: '#000',
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={navbarStyles}>
          <Toolbar>
            {tipoUsuario === 'Administrador' && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer('left', true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <img
              src={logo}
              alt="logo"
              style={{ width: '150px', height: '60px', marginRight: '10px' }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Marketplace
            </Typography>

            <List className="d-flex flexdirection-row">
              <ListItem
                component={Link}
                to="/comprador/minhas-compras"
                style={{ cursor: 'pointer' }}
              >
                <ListItemText primary="Minhas Compras" className="w-[128px]" />
              </ListItem>
              <ListItem
                component={Link}
                to="/comprador/medicamentos"
                style={{ cursor: 'pointer' }}
              >
                <ListItemText primary="Medicamentos" />
              </ListItem>
              <ListItem>
                {authContext.authenticated && <Avatar />}
                <ListItemText
                  primary={
                    authContext.authenticated ? authContext.nomeCompleto : ''
                  } />
              </ListItem>
              <ListItem
                component={Link}
                to="/faq"
                style={{ cursor: 'pointer' }}
              >
                <ListItemText primary="FAQ" />
              </ListItem>
              <ListItem>
                {authenticated && (
                  <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <ListItemText primary="Sair" />
                  </div>
                )}
              </ListItem>
            </List>
          </Toolbar>
        </AppBar>
        <Sidebar
          state={drawerState}
          setState={setDrawerState}
          toggleDrawer={toggleDrawer}
        ></Sidebar>
      </Box>
      <>{children}</>
    </>
  );
}
