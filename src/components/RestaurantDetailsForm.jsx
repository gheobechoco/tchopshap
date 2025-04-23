import React, { useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
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
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const plats = [
  {
    nom: "Burger Classique",
    description: "Boeuf, salade, tomate, oignons, fromage, sauce maison",
    prix: 12.0,
    image: "/images/burger-classique.svg",
    categorie: "Burger",
  },
  {
    nom: "Burger Végétarien",
    description: "Galette de légumes, salade, tomate, oignons, sauce",
    prix: 11.6,
    image: "/images/burger-vegetarien.svg",
    categorie: "Burger",
  },
  {
    nom: "Burger du Chef",
    description: "Double steak, bacon, cheddar, sauce spéciale",
    prix: 15.0,
    image: "/images/burger-chef.svg",
    categorie: "Burger",
  },
  {
    nom: "Frites Maison",
    description: "Frites avec herbes, ketchup, sel de mer",
    prix: 4.5,
    image: "/images/frite-maison.svg",
    categorie: "Accompagnement",
  },
  {
    nom: "Margherita",
    description: "Sauce tomate, mozzarella, basilic frais",
    prix: 10.5,
    image: "/images/margherita.svg",
    categorie: "Pizza",
  },
  {
    nom: "Quatre Fromages",
    description: "Mozzarella, gorgonzola, parmesan, chèvre",
    prix: 13.9,
    image: "/images/quatre-fromage.svg",
    categorie: "Pizza",
  },
  {
    nom: "Calzone",
    description: "Pâte repliée, jambon, champignons, fromage",
    prix: 14.5,
    image: "/images/calzone.svg",
    categorie: "Pizza",
  },
  {
    nom: "Plateau Découverte",
    description: "10 pièces maki, california, sashimi",
    prix: 18.9,
    image: "/images/plateau-decouvert.svg",
    categorie: "Sushi",
  },
  {
    nom: "California Rolls",
    description: "Avocat, saumon, concombre, sésame",
    prix: 8.0,
    image: "/images/california.svg",
    categorie: "Sushi",
  },
  {
    nom: "Sashimi Saumon",
    description: "6 tranches de saumon frais",
    prix: 12.5,
    image: "/images/sashimi.svg",
    categorie: "Sushi",
  },
];

const categories = ["Toutes les catégories", "Burger", "Pizza", "Sushi", "Accompagnement"];

const RestaurantDetails = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes les catégories");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const platsFiltres = plats.filter((plat) => {
    const matchNom = plat.nom.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "Toutes les catégories" || plat.categorie === selectedCategory;
    return matchNom && matchCat;
  });

  return (
    <div>
      <Header />

      <Box sx={{ p: 2, mt: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Plats
        </Typography>

        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            gap: 2,
            borderRadius: "12px",
            boxShadow: 1,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <TextField
            placeholder="Rechercher un plat..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1 }}
          />

          <FormControl size="small" sx={{ minWidth: isMobile ? "100%" : 180 }}>
            <Select
              value={selectedCategory}
              displayEmpty
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Filtre prix */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: isMobile ? 1 : 0 }}>
            <span>Prix:</span>
            <TextField size="small" type="number" value={0} sx={{ width: 50 }} />
            <span>-</span>
            <TextField size="small" type="number" value={30} sx={{ width: 60 }} />
            <span>€</span>
          </Box>
        </Paper>
      </Box>

      {/* grilles pour les plats */}
      <Box sx={{ p: 3 }}>
        <Grid
          container
          spacing={3}
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr", // Modifié à 2 colonnes sur md
            lg: "1fr 1fr ", // Modifié à 2 colonnes sur lg
          }}
        >
          {platsFiltres.map((plat, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Card sx={{ borderRadius: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  sx={{ objectFit: "cover", width: "100%", height: "25vh" }}
                  image={plat.image}
                  alt={plat.nom}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {plat.nom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {plat.description}
                  </Typography>
                  <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle1">{plat.prix.toFixed(2)} €</Typography>
                    <Link href="/Cart" sx={{ textDecoration: "none" }}>
                      <Button variant="contained" color="warning" size="small">
                        Ajouter
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default RestaurantDetails;