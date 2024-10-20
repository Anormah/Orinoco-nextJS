import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Importer le contexte du panier
import { Product } from "../types"; // Importer le type Product

// Déclaration des props pour le composant, avec un produit en argument
interface ProductDetailsProps {
  product: Product; // Le produit à afficher, de type Product
}

// Composant fonctionnel pour afficher les détails d'un produit
export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart(); // Utilisation du hook useCart pour accéder aux fonctions du panier

  // États pour la quantité sélectionnée et la couleur sélectionnée
  const [quantity, setQuantity] = useState<number>(1); // Quantité initialisée à 1
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]); // Couleur par défaut (première couleur du produit)

  // Fonction appelée lors de l'ajout du produit au panier
  const handleAddToCart = () => {
    console.log("Ajout au panier:", {
      ...product, // Informations du produit
      quantity, // Quantité choisie
      color: selectedColor, // Couleur choisie
    });
    addToCart({ ...product, quantity, color: selectedColor }); // Appel de la fonction addToCart pour ajouter le produit au panier
  };

  // Fonction pour gérer le changement de couleur
  const handleColorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedColor(event.target.value as string); // Mettre à jour la couleur sélectionnée
  };

  // Rendu du composant, affichage des détails du produit
  return (
    <Card
      sx={{
        display: "flex", // Disposition en flexbox pour aligner les éléments horizontalement
        flexDirection: "row", // Aligner les éléments en ligne
        maxWidth: 800, // Largeur maximale du conteneur
        margin: "auto", // Centrer la carte sur la page
        mt: 5, // Marge supérieure
        borderRadius: 2, // Bordures arrondies
        boxShadow: 3, // Ombre autour de la carte
      }}
    >
      {/* Section pour l'image du produit */}
      <CardMedia
        component="img" // Utilisation du composant image de Material-UI
        height="300" // Hauteur de l'image
        image={product.imageUrl} // URL de l'image du produit
        alt={product.name} // Texte alternatif pour l'image
        sx={{ width: 300, objectFit: "contain", borderRadius: 2 }} // Style de l'image
      />

      {/* Section pour le contenu texte et les actions */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Distribuer les éléments sur l'espace disponible
          pl: 2, // Padding à gauche
        }}
      >
        {/* Nom du produit */}
        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>

        {/* Description du produit */}
        <Typography variant="body1" sx={{ my: 2 }}>
          {product.description}
        </Typography>

        {/* Prix du produit */}
        <Typography variant="h5" color="primary">
          {product.price / 100} € {/* Prix converti en euros */}
        </Typography>

        {/* Sélection de la couleur */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="color-select-label">Choisir une couleur</InputLabel>
          <Select
            labelId="color-select-label"
            value={selectedColor} // Couleur sélectionnée
            onChange={handleColorChange} // Appelée lors du changement de couleur
            label="Choisir une couleur" // Lien avec l'étiquette InputLabel
            sx={{ mb: 1 }} // Marge inférieure
          >
            {/* Boucle pour générer les options de couleur */}
            {product.colors.map((color) => (
              <MenuItem key={color} value={color}>
                {color} {/* Nom de la couleur */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sélection de la quantité */}
        <Typography variant="body1" sx={{ mt: 2 }}>
          Quantité :
        </Typography>

        {/* Section pour l'entrée de la quantité et le bouton d'ajout */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <input
            type="number" // Type de champ numérique
            min="1" // Quantité minimale = 1
            value={quantity} // Quantité sélectionnée
            onChange={(e) => setQuantity(Number(e.target.value))} // Mettre à jour la quantité
            style={{
              marginRight: "16px", // Marge droite
              width: "60px", // Largeur de l'input
              borderRadius: "4px", // Bordures arrondies
              padding: "8px", // Padding interne
              border: "1px solid #ccc", // Bordure grise claire
            }}
          />

          {/* Bouton pour ajouter au panier */}
          <Button
            variant="contained" // Bouton rempli
            onClick={handleAddToCart} // Appel de la fonction lors du clic
            sx={{ mt: 1, backgroundColor: "#3f51b5", color: "#fff" }} // Style du bouton
          >
            Ajouter au panier {/* Texte du bouton */}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
