"use client";

import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from "@mui/material";
import { Person, Search as SearchIcon, ShoppingBasket, Star } from "@mui/icons-material";

const categories = [
  "Tous",
  "Burgers",
  "Pizza",
  "Sushi",
  "Cuisine Africaine",
  "Cuisine Française",
  "Desserts",
];

const restaurants = [
  {
    name: "Le Bistrot Parisien",
    rating: 4.9,
    time: "25-35 min",
    price: "5.00 €",
    description: "Cuisine française traditionnelle revisitée avec des produits de saison.",
    address: "10 Rue de Rivoli, Paris",
    image: "/images/bistrot-pari.svg",
  },
  {
    name: "Sushi Palace",
    rating: 4.8,
    time: "30-45 min",
    price: "4.00 €",
    description: "Sushis et sashimis préparés par des chefs japonais expérimentés.",
    address: "22 Rue du Faubourg Saint-Honoré, Paris",
    image: "/images/sushi-palace.svg",
  },
  {
    name: "Le Burger Gourmet",
    rating: 4.7,
    time: "20-30 min",
    price: "2.50 €",
    description: "Les meilleurs burgers artisanaux de la ville avec des ingrédients frais et locaux.",
    address: "15 Rue de la Paix, Paris",
    image: "/images/burger-gourmet.svg",
  },
  {
    name: "Douceurs Sucrées",
    rating: 4.7,
    time: "15-25 min",
    price: "3.00 €",
    description: "Pâtisseries artisanales et desserts gourmands pour tous les goûts.",
    address: "17 Boulevard Haussmann, Paris",
    image: "/images/douceur-sucrer .svg",
  },
  {
    name: "Pasta Fresca",
    rating: 4.6,
    time: "25-35 min",
    price: "6.00 €",
    description: "Pâtes italiennes fraîches préparées sur place.",
    address: "3 Rue des Petits Champs, Paris",
    image: "/images/pasta Fresca.svg",
  },
  {
    name: "Tacos Maison",
    rating: 4.5,
    time: "20-30 min",
    price: "4.50 €",
    description: "Tacos gourmands à la française, faits maison.",
    address: "8 Avenue de Clichy, Paris",
    image: "/images/pizza-napoli.svg",
  },
];

export default function RestaurantsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("Popularité");

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "white", boxShadow: "none" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ color: "#FF7A00", fontWeight: "bold" }}>
            TchôpShap
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 3 }}>
            <Typography sx={{ color: "black" }}>Accueil</Typography>
            <Typography sx={{ color: "black", fontWeight: "bold" }}>Restaurants</Typography>
            <Typography sx={{ color: "black" }}>Plats</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <Person sx={{ color: "black", mr: 0.5 }} />
              <Typography sx={{ color: "black" }}>Connexion</Typography>
            </Box>
            <Badge badgeContent={1} color="error">
              <ShoppingBasket sx={{ color: "black" }} />
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Restaurants
        </Typography>

        <Paper sx={{ p: 2, mb: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              px: 2,
            }}
          >
            <SearchIcon sx={{ color: "action.active", mr: 1 }} />
            <InputBase placeholder="Rechercher un restaurant..." fullWidth />
          </Box>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Toutes les catégories</InputLabel>
            <Select label="Toutes les catégories" value="">
              <MenuItem value="">Toutes les catégories</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Popularité</InputLabel>
            <Select label="Popularité" value={sortBy} onChange={handleSortChange}>
              <MenuItem value="Popularité">Popularité</MenuItem>
              <MenuItem value="Note">Note</MenuItem>
              <MenuItem value="Temps de livraison">Temps de livraison</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              sx={{
                bgcolor: selectedCategory === category ? "#FF7A00" : "transparent",
                color: selectedCategory === category ? "white" : "black",
                border: selectedCategory === category ? "none" : "1px solid #e0e0e0",
                "&:hover": { bgcolor: selectedCategory === category ? "#FF7A00" : "#f5f5f5" },
              }}
            />
          ))}
        </Box>

        <Grid container spacing={3} display='grid' gridTemplateColumns='1fr 1fr'>
          {restaurants.map((resto, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardMedia component="img" height="160" image={resto.image} alt={resto.name} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {resto.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} my={1}>
                    <Chip
                      icon={<Star sx={{ color: "white" }} fontSize="small" />}
                      label={resto.rating}
                      color="success"
                      size="small"
                    />
                    <Typography variant="body2">{resto.time}</Typography>
                    <Typography variant="body2">{resto.price}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {resto.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {resto.address}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
