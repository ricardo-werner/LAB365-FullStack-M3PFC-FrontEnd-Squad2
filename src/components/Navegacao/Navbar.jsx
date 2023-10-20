import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import logo from '../../assets/imagens/logo1.jpeg'
import { List, ListItem, ListItemIcon } from '@mui/material';
import { Avatar } from '@mui/material';
import { ListItemText } from '@mui/material';
import { UseAuth } from '../../Hooks/useAuth';

export default function Navbar({ children }) {
  const navigate = useNavigate();
  const { tipoUsuario, nomeCompleto, setTipoUsuario, setNomeCompleto } = UseAuth();
  const [drawerState, setDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setNomeCompleto("");
    setTipoUsuario("");
    navigate("/")

  };

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem("usuario");
    if (usuarioRecuperado) {
      const usuarioLogado = JSON.parse(usuarioRecuperado);
      setTipoUsuario(usuarioLogado.tipoUsuario);
      setNomeCompleto(usuarioLogado.nomeCompleto);
    }
  }, [tipoUsuario, nomeCompleto]);

  const navbarStyles = {
    backgroundColor: "rgb(32,193,148)",
    color: "#000",
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={navbarStyles}>
          <Toolbar>
            {tipoUsuario === "Administrador" && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <img
              src={logo}
              alt="logo"
              style={{ width: "150px", height: "60px", marginRight: "10px" }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Marketplace
            </Typography>

            <List className="d-flex flexdirection-row">
              <ListItem component={Link} to="/minhasCompras" style={{ cursor: 'pointer' }}>
                <ListItemText primary="Minhas Compras" />
              </ListItem>
              <ListItem component={Link} to="/medicamentosCompradores" style={{ cursor: 'pointer' }}>
                <ListItemText primary="Medicamentos Comprador" />
              </ListItem>
              <ListItem>
                <Avatar />
                <ListItemText primary={nomeCompleto} />
              </ListItem>
              <ListItem component={Link} to="/faq" style={{ cursor: 'pointer' }}>
                <ListItemText primary="FAQ" />
              </ListItem>
              <ListItem onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <ListItemText primary="Sair" />
              </ListItem>
            </List>

          </Toolbar>
        </AppBar>
        <Sidebar state={drawerState}
          setState={setDrawerState}
          toggleDrawer={toggleDrawer}>
        </Sidebar>
      </Box>
      <>{children}</>
    </>
  );
}
