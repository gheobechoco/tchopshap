  "use client";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
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

  export default function RestaurantsPage() {
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [sortBy, setSortBy] = useState("Popularité");
    const [searchQuery, setSearchQuery] = useState("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    const [categories, setCategories] = useState([])
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("https://tchopshap.onrender.com/categorie");
          setCategories(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement des catégories :", error);
        }
      };
      fetchCategories();
    }, []);

    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
      const fetchRestaurants = async () => {
        try {
          const response = await axios.get("https://tchopshap.onrender.com/restaurant");
          setRestaurants(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement des restaurants :", error);
        }
      };
      fetchRestaurants();
    }, []);

    const handleSortChange = (event) => {
      setSortBy(event.target.value);
    };

    const filteredRestaurants = restaurants.filter((resto) => {
      // 1) filtrage sur la catégorie (voir remarque plus bas)
      const categoryMatch =
        selectedCategory === "Tous" ||
        resto.idCategorie === selectedCategory;
    
      // 2) recherche sur le nom (nom) et l'adresse (adresse)  
      const lowerQuery = searchQuery.toLowerCase();
      const name = (resto.nom || "").toLowerCase();
      const address = (resto.adresse || "").toLowerCase();
    
      const searchMatch =
        name.includes(lowerQuery) ||
        address.includes(lowerQuery);
    
      return categoryMatch && searchMatch;
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
                  <MenuItem key={category.idcategorie} value={category.category}>{category.category}</MenuItem>
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
                key={category.idCategorie}
                label={category.categorie}
                onClick={() => setSelectedCategory(category.categorie)}
                sx={{
                  bgcolor: selectedCategory === category ? "#FF7A00" : "transparent",
                  color: selectedCategory === category ? "white" : "black",
                  border: selectedCategory === category ? "none" : "1px solid #e0e0e0",
                  "&:hover": { bgcolor: selectedCategory === category ? "#FF7A00" : "#f5f5f5" },
                }}
              />
            ))}
          </Box>

          <Grid container spacing={3} display='grid'
            gridTemplateColumns={{
              xs: '1fr', 
              sm: '1fr 1fr',
              md: '1fr 1fr'
            }}
          >
            {filteredRestaurants.map((resto, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={resto.image}
                    alt={resto.nom}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {resto.nom}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {resto.adresse}
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