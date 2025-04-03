"use client";

import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Button, 
  useTheme, 
  useMediaQuery 
} from "@mui/material"; 
import AppleIcon from "@mui/icons-material/Apple"; 
import ShopIcon from "@mui/icons-material/Shop"; 

export default function Download() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: "#fef6ed",
        color: "text.primary",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          {/* Texte et boutons */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                Télécharger notre application
              </Typography>

              <Typography variant="subtitle1" sx={{ mb: 4, maxWidth: 500 }}>
                Commandez vos plats préférés, suivez votre livraison en temps réel et profitez d'offres exclusives avec
                notre application mobile.
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AppleIcon />}
                    sx={{
                      bgcolor: "black",
                      color: "#FF6B1A",
                      py: 1.5,
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    App Store
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShopIcon />}
                    sx={{
                      bgcolor: "black",
                      color: "#FF6B1A",
                      py: 1.5,
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    Google Play
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/Image (14).svg" // Remplace par ton image réelle
              alt="Tacos"
              sx={{
                width: "100%",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
          </Grid>

        </Grid> {/* Fermeture de la grille principale */}
      </Container>
    </Box>
  );
}
