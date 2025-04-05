"use client"

import { Box, Typography, Container, Card, CardMedia, CardContent, Link, useTheme } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

// Sample category data
const categories = [
  { id: 1, name: "Burgers", image: "/images/burger.svg" },
  { id: 2, name: "Pizza", image: "/images/pizza.svg" },
  { id: 3, name: "Sushi", image: "/images/sushi.svg" },
  { id: 4, name: "Cuisine Africaine", image: "/images/cuisine-afro.svg" },
  { id: 5, name: "Cuisine Française", image: "/images/cuisine-francaise.svg" },
  { id: 6, name: "Desserts", image: "/images/desserts.svg" },
]

export default function CategoryList() {
  const theme = useTheme()

  return (
    <Box sx={{ py: 6 }}>
      <Container sx={{ px: { xs: 1, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h2" fontWeight="bold">
            Catégories
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

        {/* Conteneur principal avec justifyContent: start pour aligner à gauche */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // 2 colonnes sur mobile
              sm: "repeat(4, 1fr)", // 4 colonnes sur tablette et desktop
            },
            gap: 2,
            width: "100%",
          }}
        >
          {/* Première rangée: 4 premières catégories */}
          {categories.slice(0, 4).map((category) => (
            <Card
              key={category.id}
              sx={{
                boxShadow: "none",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s",
                height: "100%",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[3],
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ textAlign: "center", py: 1.5 }}>
                <Typography variant="body2">{category.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Deuxième rangée: 2 dernières catégories dans un conteneur séparé */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // 2 colonnes sur mobile
              sm: "repeat(4, 1fr)", // 4 colonnes sur tablette et desktop
            },
            gap: 2,
            width: "100%",
            mt: 2, // Marge entre les deux rangées
          }}
        >
          {categories.slice(4).map((category, index) => (
            <Card
              key={category.id}
              sx={{
                boxShadow: "none",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s",
                height: "100%",
                // Pas de gridColumn ici pour garder la même taille que les autres cartes
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[3],
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ textAlign: "center", py: 1.5 }}>
                <Typography variant="body2">{category.name}</Typography>
              </CardContent>
            </Card>
          ))}
          {/* Ajouter des éléments vides pour maintenir l'alignement */}
          <Box sx={{ display: { xs: "none", sm: "block" } }} /> {/* Élément vide pour la 3ème colonne */}
          <Box sx={{ display: { xs: "none", sm: "block" } }} /> {/* Élément vide pour la 4ème colonne */}
        </Box>
      </Container>
    </Box>
  )
}

