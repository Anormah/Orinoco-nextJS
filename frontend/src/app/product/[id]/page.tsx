// src/app/product/[id]/page.tsx
"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductDetails from "../../../components/ProductDetails";
import { Product } from "../../../types";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params; // Récupération de l'ID du produit
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ID du produit:", id); // Vérifiez que l'ID est correct
    fetch(`http://localhost:3000/api/teddies/${id}`) // Utilisation de l'ID pour récupérer le produit
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du produit");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du produit:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : product ? (
        <ProductDetails product={product} />
      ) : (
        <Typography variant="h6" color="error">
          Produit non trouvé.
        </Typography>
      )}
    </Box>
  );
}
