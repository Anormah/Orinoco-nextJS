"use client"; // Ce fichier est destiné à être exécuté uniquement côté client.

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types";

// Définition d'une interface pour les produits dans le panier, incluant la quantité et la couleur
interface CartProduct extends Product {
  quantity: number; // Quantité du produit dans le panier
  color: string; // Couleur choisie pour le produit
}

// Interface pour le contexte du panier, définissant les types des éléments manipulés
interface CartContextType {
  cart: CartProduct[]; // Tableau de produits dans le panier
  addToCart: (product: CartProduct) => void; // Fonction pour ajouter un produit au panier
  removeFromCart: (id: string, color: string) => void; // Fonction pour retirer un produit du panier
  clearCart: () => void; // Fonction pour vider entièrement le panier
  itemCount: number; // Nombre total d'articles dans le panier
}

// Création du contexte du panier avec une valeur par défaut non définie
const CartContext = createContext<CartContextType | undefined>(undefined);

// Composant fournisseur de contexte pour envelopper l'application
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Utilisation du hook useState pour stocker le panier (initialement vide)
  const [cart, setCart] = useState<CartProduct[]>([]);

  // Effet déclenché une seule fois après le montage du composant pour charger le panier depuis localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Vérification si le code est exécuté côté client
      const storedCart = localStorage.getItem("cart"); // Récupération du panier stocké dans localStorage
      if (storedCart) {
        setCart(JSON.parse(storedCart)); // Mise à jour du panier avec les données stockées
      }
    }
  }, []);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product: CartProduct) => {
    setCart((prevCart) => {
      // Recherche d'un produit existant avec le même ID et la même couleur
      const existingProductIndex = prevCart.findIndex(
        (item) => item._id === product._id && item.color === product.color
      );

      // Si le produit existe déjà dans le panier, augmenter la quantité
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart]; // Copie du panier existant
        updatedCart[existingProductIndex].quantity += product.quantity; // Augmentation de la quantité du produit
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedCart)); // Mise à jour de localStorage
        }
        return updatedCart; // Mise à jour du state avec le panier modifié
      }

      // Sinon, ajout du nouveau produit dans le panier
      const updatedCart = [...prevCart, product];
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Mise à jour de localStorage
      }
      return updatedCart; // Mise à jour du state avec le nouveau produit ajouté
    });
  };

  // Fonction pour retirer un produit du panier
  const removeFromCart = (id: string, color: string) => {
    setCart((prevCart) => {
      // Filtrage pour enlever l'élément avec l'ID et la couleur spécifiés
      const updatedCart = prevCart.filter(
        (item) => !(item._id === id && item.color === color)
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Mise à jour de localStorage après suppression
      }
      return updatedCart; // Mise à jour du state avec le panier modifié
    });
  };

  // Fonction pour vider entièrement le panier
  const clearCart = () => {
    setCart([]); // Réinitialise l'état du panier
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart"); // Supprime les données du panier dans localStorage
    }
  };

  // Calcul du nombre total d'articles dans le panier
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Effet pour sauvegarder le panier dans localStorage à chaque fois que le panier change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart)); // Mise à jour de localStorage avec le panier actuel
    }
  }, [cart]); // Le panier est sauvegardé chaque fois que `cart` change

  return (
    // Fournir les fonctions et données du panier à travers le contexte
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, itemCount }}
    >
      {children} {/* Rendu des enfants dans le contexte */}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte du panier
export const useCart = () => {
  const context = useContext(CartContext); // Récupération du contexte
  if (!context) {
    throw new Error("useCart must be used within a CartProvider"); // Lève une erreur si utilisé hors du CartProvider
  }
  return context; // Retourne les données et fonctions du panier
};
