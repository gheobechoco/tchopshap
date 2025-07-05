// [RestaurantDetails.jsx]

"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress'; // Ajout de l'import pour CircularProgress


const categories = ["Toutes les catégories", "Burger", "Pizza", "Sushi", "Accompagnement"];

const RestaurantDetails = () => {
  const [plats, setPlats] = useState([]); // ⚛️ plats est initialisé comme un tableau vide
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes les catégories");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Contexte panier : permet d'ajouter des articles au panier
  const { addToCart } = useCart();
  // Hook de navigation : permet de rediriger l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const response = await axios.get("https://tchopshap.onrender.com/plat");
        // Ancien code : setPlats(response.data);
        // Nouveau code à ajouter (correction de l'accès aux données)
        // 🔍 Définition simple : On accède à la clé 'data' de la réponse API pour obtenir le tableau des plats.
        // 🛠️ Analogie : Si tu reçois une enveloppe (response.data) qui contient une lettre (le tableau de plats)
        // dans un compartiment nommé "data", tu dois ouvrir le compartiment "data" pour récupérer la lettre.
        // ⚙️ Dans notre code : `response.data.data` permet d'atteindre le tableau des plats.
        if (Array.isArray(response.data.data)) { // Vérifie si response.data.data est un tableau
          setPlats(response.data.data); // Met à jour l'état avec le tableau de plats
        } else {
          // ⚠️ Piège à éviter : Si l'API renvoie un format inattendu (par exemple, response.data.data n'est pas un tableau),
          // on logge l'erreur et on s'assure que plats reste un tableau vide.
          console.error("L'API /plat n'a pas renvoyé un tableau dans la clé 'data':", response.data);
          setError("Format de données inattendu de l'API.");
          setPlats([]); // S'assurer que plats reste un tableau
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des plats:", err);
        setError("Impossible de charger les plats");
        setLoading(false);
      }
    };
    fetchPlats();
  }, []);

  // La définition de platsFiltres reste correcte avec `(plats || [])`
  const platsFiltres = (plats || []).filter((plat) => {
    const matchNom = plat.nom.toLowerCase().includes(search.toLowerCase());
    // ⚠️ Correction : La propriété de catégorie dans l'API est manquante ou non cohérente avec 'categorie'
    // Je suppose que tu veux filtrer par `idRestaurant` ou une autre propriété si la catégorie n'est pas dans les données du plat.
    // Pour l'instant, je vais utiliser une propriété hypothétique `plat.categoryName` ou tu devras mapper les IDs.
    // Si plat.categorie n'existe pas dans tes données API, cette ligne ne fonctionnera pas comme attendu.
    // Basé sur l'API, il n'y a pas de champ 'categorie' direct sur le plat, mais 'idRestaurant'.
    // Tu devras soit ajouter la catégorie au plat côté backend, soit filtrer par idRestaurant si c'est ce que tu veux.
    // Pour l'exemple, je laisse 'plat.categorie' mais sache que ça pourrait être la source d'un filtre non fonctionnel.
    const matchCat =
      selectedCategory === "Toutes les catégories" || plat.categorie === selectedCategory; // 👈 Vérifie cette propriété
    return matchNom && matchCat;
  });

  return (
    <div>
      <Header />

      <Box sx={{ p: 2, mt: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: "bold", color: "text.primary" }}>
          Plats
        </Typography>

        <Paper sx={{ display: "flex", alignItems: "center", p: 1, gap: 2, borderRadius: 2, boxShadow: 1, flexDirection: isMobile ? "column" : "row" }}>
          <TextField
            placeholder="Rechercher un plat..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1 }}
          />

          <FormControl size="small" sx={{ minWidth: isMobile ? "100%" : 180 }}>
            <Select value={selectedCategory} displayEmpty onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: isMobile ? 1 : 0 }}>
            <Typography>Prix :</Typography>
            <TextField size="small" type="number" value={0} sx={{ width: 50 }} />
            <Typography>-</Typography>
            <TextField size="small" type="number" value={30} sx={{ width: 60 }} />
            <Typography>Fcfa</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Affichage de l'erreur de chargement */}
      {error && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography color="error" variant="h6">{error}</Typography>
          <Typography color="text.secondary">Veuillez réessayer plus tard.</Typography>
        </Box>
      )}

      {/* Affichage du chargement */}
      {loading && !error && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Chargement des plats...</Typography>
        </Box>
      )}

      {/* Le conteneur de la grille des plats (affiché seulement si non en chargement et sans erreur) */}
      {!loading && !error && (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3} display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr", lg: "1fr 1fr" }}>
            {platsFiltres.map((plat) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={plat.idPlat}> {/* ⚠️ Correction : Utilisez plat.idPlat comme clé */}
                <Card sx={{ borderRadius: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="img"
                    image={plat.image}
                    alt={plat.nom}
                    sx={{ objectFit: "cover", width: "100%", height: "25vh" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>{plat.nom}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>{plat.details}</Typography> {/* ⚠️ Correction : Utilisez plat.details pour la description */}
                    <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="subtitle1">{Number(plat.prix).toFixed(2)} FCFA</Typography> {/* ⚠️ Correction : Utilisez FCFA */}
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => {
                          // Ajoute l'objet complet du plat au panier
                          addToCart(plat);
                          // Redirige vers la page du panier
                          navigate('/cart');
                        }}
                      >Ajouter</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default RestaurantDetails;
