"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Link,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

export default function RestaurantOnSpot() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("https://api-tchop-shap.onrender.com/api/v1/restaurants");
        console.log("▶ restaurants API:", response.data);
        setRestaurants(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des restaurants :", error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <Box sx={{ py: 6, bgcolor: "#f9f9f9" }}>
      <Container sx={{ px: { xs: 1, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 2 : 0,
          }}
        >
          <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: isMobile ? 2 : 0 }}>
            Restaurants
          </Typography>
          <Link
            href="#"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "primary.main",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Voir tout
            <ArrowForwardIosIcon sx={{ fontSize: 14, ml: 0.5 }} />
          </Link>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {restaurants.map((res) => (
            <Card
              key={res.idRestaurant}
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
                "&:hover": { transform: "translateY(-5px)", boxShadow: theme.shadows[3] },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={res.image || "/images/placeholder.png"}
                alt={res.nom}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {res.nom}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mb: 1.5, flexDirection: isMobile ? "column" : "row" }}
                >
                  <Chip
                    icon={<StarIcon sx={{ color: "#4CAF50 !important", fontSize: 16 }} />}
                    label="—"
                    size="small"
                    sx={{ bgcolor: "#E8F5E9", color: "#4CAF50", fontWeight: "bold" }}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {res.adresse}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
