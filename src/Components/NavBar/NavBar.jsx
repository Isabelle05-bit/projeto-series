import { useEffect, useState } from "react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { cores, fonteTitulo } from "../../theme";

const links = [
  { to: "/", label: "Início" },
  { to: "/series", label: "Minhas Séries" },
  { to: "/sobre", label: "Sobre" },
];

// Barra superior fixa: transparente no topo e escura ao rolar a página
function NavBar() {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 30);
    aoRolar();
    window.addEventListener("scroll", aoRolar);
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const estiloLink = {
    color: "text.secondary",
    fontWeight: 500,
    px: 1.5,
    minWidth: 0,
    "&:hover": { color: "#fff", backgroundColor: "transparent" },
    "&.active": { color: "#fff", fontWeight: 700 },
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: rolou
          ? cores.fundo
          : "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
        transition: "background 0.4s ease",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 6 }, minHeight: { xs: 60, md: 68 } }}>
        <IconButton
          aria-label="Abrir menu"
          onClick={() => setMenuAberto(true)}
          sx={{ display: { md: "none" }, mr: 1, color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component={RouterLink}
          to="/"
          sx={{
            fontFamily: fonteTitulo,
            fontSize: { xs: "1.7rem", md: "2.1rem" },
            color: cores.vermelho,
            textDecoration: "none",
            letterSpacing: "0.04em",
            mr: { md: 4 },
            lineHeight: 1,
          }}
        >
          Minhas Séries
        </Typography>

        <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
          {links.map((link) => (
            <Button key={link.to} component={NavLink} to={link.to} end sx={estiloLink}>
              {link.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          component={RouterLink}
          to="/cadastro"
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ whiteSpace: "nowrap" }}
        >
          Nova série
        </Button>
      </Toolbar>

      <Drawer
        open={menuAberto}
        onClose={() => setMenuAberto(false)}
        slotProps={{ paper: { sx: { width: 240, backgroundColor: cores.fundo } } }}
      >
        <Typography sx={{ fontFamily: fonteTitulo, fontSize: "1.8rem", color: cores.vermelho, p: 2 }}>
          Minhas Séries
        </Typography>
        <List>
          {[...links, { to: "/cadastro", label: "Cadastrar série" }].map((link) => (
            <ListItemButton
              key={link.to}
              component={NavLink}
              to={link.to}
              end
              onClick={() => setMenuAberto(false)}
              sx={{ "&.active": { borderLeft: `4px solid ${cores.vermelho}`, fontWeight: 700 } }}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
