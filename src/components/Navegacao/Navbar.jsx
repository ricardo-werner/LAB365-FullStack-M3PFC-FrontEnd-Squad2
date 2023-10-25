import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from './Sidebar';
import logo from '../../assets/imagens/logo1.jpeg';
import { List, ListItem} from '@mui/material';
import { Avatar } from '@mui/material';
import { ListItemText } from '@mui/material';
import { UseAuth } from '../../Hooks/useAuth';
import { AuthContext } from '../../contexts/auth';

export const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const { tipoUsuario, nomeCompleto, setTipoUsuario, setNomeCompleto } =
    UseAuth();
  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // ***Menu hamburguer para telas menores que 855px
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [listVisible, setListVisible] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setListVisible(true);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
    setListVisible(false);
  };

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 855) {
      setListVisible(false); // Exibir o menu no AppBar quando a tela é pequena
    } else {
      setListVisible(true); // Ocultar o menu no AppBar quando a tela for grande
    }
  }, []);

  // Registra um ouvinte de evento de redimensionamento para controlar o menu hamburguer
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // Função para fazer o logout e limpar o localStorage
  const performLogout = () => {
    localStorage.clear();
    setNomeCompleto('');
    setTipoUsuario('');
  };

  // Adicione um ouvinte de evento ao window para o evento beforeunload
  window.addEventListener('beforeunload', () => {
    // Realiza o logout ao fechar a aba do navegador
    performLogout();
  });

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
    const tokenExpirado = !localStorage.getItem('token'); //verifica se o token ainda está presente
    
    if (usuarioRecuperado && !tokenExpirado) {
      const usuarioLogado = JSON.parse(usuarioRecuperado);
      setTipoUsuario(usuarioLogado.tipoUsuario);
      setNomeCompleto(usuarioLogado.nomeCompleto);
    }else{
      setTipoUsuario(''); // Limpa o tipo de usuário
      setNomeCompleto(''); // Limpa o nome do usuário
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

            {menuOpen && (
              <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
                <List>
                  <ListItem
                    component={Link}
                    to="/comprador/minhas-compras"
                    style={{ cursor: 'pointer' }}
                  >
                    <ListItemText
                      primary="Minhas Compras"
                      className="w-[128px]"
                    />
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/comprador/medicamentos"
                    style={{ cursor: 'pointer' }}
                  >
                    <ListItemText primary="Medicamentos" />
                  </ListItem>
                  <ListItem>
                    <Avatar />
                    <ListItemText primary={nomeCompleto} />
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/faq"
                    style={{ cursor: 'pointer' }}
                  >
                    <ListItemText primary="FAQ" />
                  </ListItem>
                  <ListItem
                    onClick={handleLogout}
                    style={{ cursor: 'pointer' }}
                  >
                    <ListItemText primary="Sair" />
                  </ListItem>
                </List>
              </Drawer>
            )}

            {listVisible && (
              <List className="d-flex flexdirection-row">
                <ListItem
                  component={Link}
                  to="/comprador/minhas-compras"
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemText
                    primary="Minhas Compras"
                    className="w-[128px]"
                  />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/comprador/medicamentos"
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemText primary="Medicamentos" />
                </ListItem>
                <ListItem>
                  <Avatar />
                  <ListItemText primary={nomeCompleto} />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/faq"
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemText primary="FAQ" />
                </ListItem>
                <ListItem onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <ListItemText primary="Sair" />
                </ListItem>
              </List>
            )}
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
};
