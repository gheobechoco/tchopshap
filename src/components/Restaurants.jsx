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
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Person, Search as SearchIcon, ShoppingBasket, Star } from "@mui/icons-material";
import Footer from "../components/Footer";

const categories = [
  "Tous",
  "Burgers",
  "Pizza",
  "Sushi",
  "Cuisine Africaine",
  "Cuisine Française",
  "Desserts",
];

const restaurantsData = [
  {
    name: "Le Bistrot Parisien",
    category: "Cuisine Française",
    rating: 4.9,
    time: "25-35 min",
    price: "5.00 €",
    description: "Cuisine française traditionnelle revisitée avec des produits de saison.",
    address: "10 Rue de Rivoli, Paris",
    image: "/images/bistrot-pari.svg",
  },
  {
    name: "Sushi Palace",
    category: "Sushi",
    rating: 4.8,
    time: "30-45 min",
    price: "4.00 €",
    description: "Sushis et sashimis préparés par des chefs japonais expérimentés.",
    address: "22 Rue du Faubourg Saint-Honoré, Paris",
    image: "/images/sushi-palace.svg",
  },
  {
    name: "Le Burger Gourmet",
    category: "Burgers",
    rating: 4.7,
    time: "20-30 min",
    price: "2.50 €",
    description: "Les meilleurs burgers artisanaux de la ville avec des ingrédients frais et locaux.",
    address: "15 Rue de la Paix, Paris",
    image: "/images/burger-gourmet.svg",
  },
  {
    name: "Douceurs Sucrées",
    category: "Desserts",
    rating: 4.7,
    time: "15-25 min",
    price: "3.00 €",
    description: "Pâtisseries artisanales et desserts gourmands pour tous les goûts.",
    address: "17 Boulevard Haussmann, Paris",
    image: "/images/douceur-sucrer .svg",
  },
  {
    name: "Pasta Fresca",
    category: "Pizza",
    rating: 4.6,
    time: "25-35 min",
    price: "6.00 €",
    description: "Pâtes italiennes fraîches préparées sur place.",
    address: "3 Rue des Petits Champs, Paris",
    image: "/images/pasta Fresca.svg",
  },
  {
    name: "Tacos Maison",
    category: "Pizza",
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
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredRestaurants = restaurantsData.filter(resto => {
    const categoryMatch = selectedCategory === "Tous" || resto.category === selectedCategory;
    const searchMatch = resto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       resto.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === "Note") return b.rating - a.rating;
    if (sortBy === "Temps de livraison") {
      return parseInt(a.time.split('-')[0]) - parseInt(b.time.split('-')[0]);
    }
    return 0;
  });

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          boxShadow: "none",
          // En version mobile, l'AppBar prendra toute la largeur du viewport
          width: isMobile ? '100%' : 'auto',
          // Si vous avez une largeur maximale sur le Container, centrez l'AppBar si nécessaire
          maxWidth: isMobile ? 'none' : 'lg',
          margin: isMobile ? 0 : '0 auto',
        }}
      >
        <Toolbar sx={{
          // Ajustez le padding horizontal de la Toolbar en version mobile si nécessaire
          px: isMobile ? 2 : undefined,
          display: 'flex',
          justifyContent: 'space-between', // Aligne les éléments à gauche et à droite
        }}>
          <Typography variant="h6" sx={{ color: "#FF7A00", fontWeight: "bold" }}>
            TchôpShap
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 3, display: isMobile ? 'none' : 'flex' }}>
            <Typography sx={{ color: "black" }}>Accueil</Typography>
            <Typography sx={{ color: "black", fontWeight: "bold" }}>Restaurants</Typography>
            <Typography sx={{ color: "black" }}>Plats</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2, display: isMobile ? 'none' : 'flex' }}>
              <Person sx={{ color: "black", mr: 0.5 }} />
              <Typography sx={{ color: "black" }}>Connexion</Typography>
            </Box>
            <Badge badgeContent={1} color="error">
              <ShoppingBasket sx={{ color: "black" }} />
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: isMobile ? 2 : 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Restaurants
        </Typography>

        <Paper sx={{
          p: 2,
          mb: 3,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
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
            <InputBase
              placeholder="Rechercher un restaurant..."
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Toutes les catégories</InputLabel>
            <Select
              label="Toutes les catégories"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="Tous">Toutes les catégories</MenuItem>
              {categories.slice(1).map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Trier par</InputLabel>
            <Select label="Trier par" value={sortBy} onChange={handleSortChange}>
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

        <Grid
          container
          spacing={3}
          display='grid'
          gridTemplateColumns={{
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr'
          }}
        >
          {sortedRestaurants.map((resto, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={resto.image}
                  alt={resto.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
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
      <Footer />
    </Box>
  );
}