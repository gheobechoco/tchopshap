

import { Box, Typography, Container, Grid, useTheme } from "@mui/material"

// Steps data
const steps = [
  {
    id: 1,
    title: "Choisissez un restaurant",
    description: "Parcourez notre sélection de restaurants de qualité près de chez vous.",
  },
  {
    id: 2,
    title: "Sélectionnez vos plats",
    description: "Parcourez le menu et ajoutez vos plats préférés à votre panier.",
  },
  {
    id: 3,
    title: "Livraison rapide",
    description: "Payez en ligne et recevez votre commande en un temps record.",
  },
]

export default function HowItWorks() {
  const theme = useTheme()

  return (
    <Box sx={{ py: 8, bgcolor: "#F8F9FA" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            Comment ça marche
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Commandez votre repas en trois étapes simples et rapides
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((step) => (
            <Grid item xs={12} sm={4} key={step.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "#FFF0E0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF6B1A",
                    fontWeight: "bold",
                    fontSize: 20,
                    mb: 3,
                  }}
                >
                  {step.id}
                </Box>

                <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                  {step.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 250, mx: "auto" }}>
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}