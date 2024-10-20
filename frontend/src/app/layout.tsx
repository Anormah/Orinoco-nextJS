"use client";

import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import Footer from "../components/Footer"; // Importer le composant Footer
import NavBar from "../components/NavBar"; // Importer le composant NavBar
import { CartProvider } from "../context/CartContext"; // Importer le composant CartProvider
import theme from "../theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Orinoco</title>
        <link rel="icon" href="http://localhost:3000/images/favicon.ico" />
      </head>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Assure que le body prend 100% de la hauteur de la page
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartProvider>
            <NavBar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                minHeight: "95vh", // Le contenu doit prendre au moins 95% de la hauteur
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {children}
              </Container>
            </Box>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
