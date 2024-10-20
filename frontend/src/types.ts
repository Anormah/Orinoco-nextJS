// src/types.ts

// Type pour les informations d'un produit
export interface Product {
  _id: string; // ID unique du produit
  name: string; // Nom du produit
  price: number; // Prix du produit
  color: string; // Couleur du produit
  description: string; // Description du produit
  imageUrl: string; // URL de l'image du produit
  quantity: number; // Quantité pour le panier (facultatif)
}

// Type pour les informations de contact de l'utilisateur lors de la commande
export interface Contact {
  firstName: string; // Prénom de l'utilisateur
  lastName: string; // Nom de l'utilisateur
  address: string; // Adresse de livraison
  city: string; // Ville de l'adresse de livraison
  email: string; // Adresse email de l'utilisateur
}

// Type pour les données de la commande
export interface Order {
  contact: Contact; // Informations de contact de l'utilisateur
  products: string[]; // Tableau contenant les IDs des produits commandés
  orderId?: string; // ID de la commande générée par le backend (facultatif)
}

// Type pour représenter un élément dans le panier
export interface CartItem extends Product {
  quantity: number; // Quantité du produit dans le panier
}

// Type pour les réponses de l'API (produits et commande)
export interface ApiResponse<T> {
  data: T; // Les données retournées par l'API
  error?: string; // Message d'erreur, le cas échéant
}
