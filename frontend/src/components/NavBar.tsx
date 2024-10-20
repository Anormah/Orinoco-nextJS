// src/components/NavBar.tsx
import { AppBar, Badge, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useCart } from "../context/CartContext"; // Importation du contexte

const NavBar = () => {
  const { itemCount } = useCart(); // Accéder au compteur d'articles

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Box
            component="img"
            src="http://localhost:3000/images/logo.png"
            alt="Logo"
            sx={{ height: 40, marginRight: 2, cursor: "pointer" }}
          />
        </Link>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
        />
        <Link href="/cart">
          <Button color="inherit">
            <Badge badgeContent={itemCount} color="secondary">
              Mon Panier
            </Badge>
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
