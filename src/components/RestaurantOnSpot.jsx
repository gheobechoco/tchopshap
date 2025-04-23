"use client";

import { Box, Typography, Container, Card, CardMedia, CardContent, Link, Stack, Chip, useTheme, useMediaQuery } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import EuroIcon from "@mui/icons-material/Euro"
import StarIcon from "@mui/icons-material/Star"

// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "Le Burger Gourmet",
    image: "/images/burger-gourmet.svg",
    rating: 4.7,
    deliveryTime: "20-30 min",
    price: "2.50 €",
    description: "Les meilleurs burgers artisanaux de la ville avec des ingrédients frais et locaux.",
  },
  {
    id: 2,
    name: "Pizza Napoli",
    image: "/images/pizza-napoli.svg",
    rating: 4.5,
    deliveryTime: "25-40 min",
    price: "3.00 €",
    description: "Authentiques pizzas napolitaines cuites au feu de bois.",
  },
  {
    id: 3,
    name: "Sushi Palace",
    image: "/images/sushi-palace.svg",
    rating: 4.8,
    deliveryTime: "30-45 min",
    price: "4.00 €",
    description: "Sushis et sashimis préparés par des chefs japonais expérimentés.",
  },
  {
    id: 4,
    name: "Saveurs d'Afrique",
    image: "/images/saveur-afrique.svg",
    rating: 4.8,
    deliveryTime: "35-50 min",
    price: "3.50 €",
    description: "Cuisine africaine authentique avec des saveurs riches et épicées.",
  },
  {
    id: 5,
    name: "Le Bistrot Parisien",
    image: "/images/bistrot-pari.svg",
    rating: 4.9,
    deliveryTime: "25-35 min",
    price: "5.00 €",
    description: "Cuisine française traditionnelle revisitée avec des produits de saison.",
  },
  {
    id: 6,
    name: "Douceurs Sucrées",
    image: "/images/douceur-sucrer .svg",
    rating: 4.7,
    deliveryTime: "15-25 min",
    price: "3.00 €",
    description: "Pâtisseries artisanales et desserts gourmands pour tous les goûts.",
  },
]

export default function RestaurantOnSpot() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ py: 6, bgcolor: "#f9f9f9" }}>
      <Container sx={{ px: { xs: 1, sm: 2 } }}>
        {/* Réduire les marges du conteneur */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexDirection: isMobile ? 'column' : 'row', // Stack on mobile
            gap: isMobile ? 2 : 0
          }}
        >
          <Typography variant="h5" component="h2" fontWeight="bold" sx={{mb: isMobile? 2: 0}}>
            Restaurants Populaires
          </Typography>

          <Link
            href="#"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Voir tout
            <ArrowForwardIosIcon sx={{ fontSize: 14, ml: 0.5 }} />
          </Link>
        </Box>
        {/* Utilisation de CSS Grid pour les restaurants */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // 1 colonne sur mobile
              sm: "repeat(2, 1fr)", // 2 colonnes sur tablette
              md: "repeat(2, 1fr)" // 3 on desktop
            },
            gap: 3,
            width: "100%",
          }}
        >
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: "none",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[3],
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={restaurant.image}
                alt={restaurant.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {restaurant.name}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 1.5, flexDirection: isMobile? 'column': 'row' }}>
                  <Chip
                    icon={<StarIcon sx={{ color: "#4CAF50 !important", fontSize: 16 }} />}
                    label={restaurant.rating}
                    size="small"
                    sx={{
                      bgcolor: "#E8F5E9",
                      color: "#4CAF50",
                      fontWeight: "bold",
                      "& .MuiChip-icon": { ml: 0.5 },
                      mb: isMobile? 0.5: 0
                    }}
                  />

                  <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
                    <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">{restaurant.deliveryTime}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
                    <EuroIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">{restaurant.price}</Typography>
                  </Box>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {restaurant.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
