import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Sidebar } from "./Sidebar";
import logo from "../../assets/imagens/logo1.jpeg";
import { List, ListItem } from "@mui/material";
import { Avatar } from "@mui/material";
import { ListItemText } from "@mui/material";
import { UseAuth } from "../../Hooks/useAuth";
import { AuthContext } from "../../contexts/auth";

export const Navbar = ({ children }) => {
  const { logout } = UseAuth();
  const navigate = useNavigate();
  const { tipoUsuario, nomeCompleto, setTipoUsuario, setNomeCompleto } =
    UseAuth();
  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null); // Estado para controlar o menu de perfil

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const authContext = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    localStorage.clear();
    setNomeCompleto("");
    setTipoUsuario("");
    navigate("/");
  };

  const handleOpenProfileMenu = (event) => {
    //Função para abrir o menu quando clica no nome do usuario
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    //Função para fechar o menu do usuario
    setProfileMenuAnchor(null);
  };

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem("usuario");
    const tokenExpirado = !localStorage.getItem("token");

    if (usuarioRecuperado && !tokenExpirado) {
      const usuarioLogado = JSON.parse(usuarioRecuperado);
      setTipoUsuario(usuarioLogado.tipoUsuario);
      setNomeCompleto(usuarioLogado.nomeCompleto);
    } else {
      setTipoUsuario("");
      setNomeCompleto("");
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
            <List
              className="d-flex flexdirection-row"
              sx={{ whiteSpace: "nowrap" }}
            >
              <ListItem
                component={Link}
                to="/comprador/medicamentos"
                style={{ cursor: "pointer" }}
              >
                <ListItemText primary="Fazer Pedido" />
              </ListItem>
              {tipoUsuario ? (
                <>
                  <ListItem
                    onClick={handleOpenProfileMenu}
                    style={{ cursor: "pointer" }}
                  >
                    <Avatar />
                    <Box sx={{ width: "12px" }} /> {/* Espaço de 12 pixels */}
                    <ListItemText
                      primary={
                        authContext.authenticated
                          ? authContext.nomeCompleto
                          : ""
                      }
                    />
                  </ListItem>
                  <ListItem
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    <ListItemText primary="Sair" />
                  </ListItem>
                </>
              ) : (
                <ListItem
                  component={Link}
                  to="/comprador/cadastro"
                  style={{ cursor: "pointer" }}
                >
                  <ListItemText primary="Cadastrar" />
                </ListItem>
              )}
              <ListItem
                component={Link}
                to="/faq"
                style={{ cursor: "pointer" }}
              >
                <ListItemText primary="FAQ" />
              </ListItem>
            </List>
          </Toolbar>
        </AppBar>
        <Sidebar
          state={drawerState}
          setState={setDrawerState}
          toggleDrawer={toggleDrawer}
        ></Sidebar>
        <Menu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          onClose={handleCloseProfileMenu}
        >
          <MenuItem
            component={Link}
            to="/meus-dados" // Adicione a rota correta para "Meus Dados"
            onClick={handleCloseProfileMenu}
          >
            Meus Dados
          </MenuItem>
          <MenuItem
            component={Link}
            to="/comprador/minhas-compras" // Adicione a rota correta para "Minhas Compras"
            onClick={handleCloseProfileMenu}
          >
            Minhas Compras
          </MenuItem>
        </Menu>
      </Box>
      <>{children}</>
    </>
  );
};
