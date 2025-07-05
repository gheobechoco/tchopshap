"use client"

import { Box, Typography, Container, Grid, Link, Stack, Divider, useTheme } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"


export default function Footer() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        bgcolor: "#1A202C",
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={10} sx={{ justifyContent: "center" }}>
          {/* TchôpShap Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
              TchôpShap
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8, maxWidth: 300 }}>
              Votre plateforme de livraison de repas préférée. Rapide, fiable et délicieux.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                <FacebookIcon fontSize="small" />
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                <InstagramIcon fontSize="small" />
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                <TwitterIcon fontSize="small" />
              </Link>
            </Stack>
          </Grid>

          {/* Liens Rapides Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
              Liens Rapides
            </Typography>

            <Stack spacing={1} sx={{marginRight:"90px"}}>
              <Link href="/" color="inherit" underline="hover" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                Accueil
              </Link>
              <Link href="/restaurants" color="inherit" underline="hover" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                Restaurants
              </Link>
              <Link href="/details" color="inherit" underline="hover" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                Plats
              </Link>
              <Link href="/Login" color="inherit" underline="hover" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                Inscription
              </Link>
              <Link href="/checkout" color="inherit" underline="hover" sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
                Connexion
              </Link>
            </Stack>
          </Grid>

          {/* Contact Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
              Contact
            </Typography>

            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <LocationOnIcon sx={{ mr: 1, mt: 0.3, fontSize: 20, color: "#FF6B1A" }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  123 Avenue de la République,
                  <br />
                  75011 Paris
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center"}}>
                <PhoneIcon sx={{ mr: 1, fontSize: 20, color: "#FF6B1A" }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +33 1 23 45 67 89
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ mr: 1, fontSize: 20, color: "#FF6B1A" }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  contact@tchopshap.fr
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        
      </Container>
      <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Typography variant="body2" align="center" sx={{ opacity: 0.6 }}>
          © 2025 TchôpShap. Tous droits réservés.
        </Typography>
    </Box>
  )
}

