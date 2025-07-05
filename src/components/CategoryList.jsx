"use client"

import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Link,
  useTheme,
} from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useState, useEffect } from "react"
import axios from "axios"

export default function CategoryList() {
  const theme = useTheme()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api-tchop-shap.onrender.com/api/v1/categories")
        setCategories(response.data)
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error)
      }
    }
    fetchCategories()
  }, [])

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

        {/* Première rangée */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(4, 1fr)",
            },
            gap: 2,
            width: "100%",
          }}
        >
          {categories.slice(0, 4).map((category) => (
            <Card
              key={category.idCategorie}
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
                alt={category.categorie}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ textAlign: "center", py: 1.5 }}>
                <Typography variant="body2" fontWeight="bold">
                  {category.categorie}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Deuxième rangée */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(4, 1fr)",
            },
            gap: 2,
            width: "100%",
            mt: 2,
          }}
        >
          {categories.slice(4).map((category) => (
            <Card
              key={category.idCategorie}
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
                alt={category.categorie}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ textAlign: "center", py: 1.5 }}>
                <Typography variant="body2" fontWeight="bold">
                  {category.categorie}
                </Typography>
              </CardContent>
            </Card>
          ))}

          {/* Espaces vides pour alignement si besoin */}
          <Box sx={{ display: { xs: "none", sm: "block" } }} />
          <Box sx={{ display: { xs: "none", sm: "block" } }} />
        </Box>
      </Container>
    </Box>
  )
}
