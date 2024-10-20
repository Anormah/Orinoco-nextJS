// src/app/page.tsx
"use client";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/teddies") // Modifier l'URL selon la catégorie choisie
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Vérifie les données ici
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        Liste des produits
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              {" "}
              {/* Utilisation de _id comme clé */}
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
