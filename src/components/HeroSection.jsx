

import { Box, Typography, Container, TextField, Button, useTheme, alpha } from "@mui/material"; 
import SearchIcon from "@mui/icons-material/Search"; 

export default function HeroSection() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#FF6B1A", // Vibrant orange color from the image
        color: "white",
        pt: { xs: 10, sm: 12 }, // Extra padding top to account for the fixed header
        pb: { xs: 10, sm: 12 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 600 }}>
          {/* Main heading */}
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Commandez vos plats préférés en quelques clics
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontWeight: "normal",
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            }}
          >
            TchôpShap vous livre les meilleurs restaurants directement chez vous.
          </Typography>

          {/* Search bar */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
              maxWidth: 550,
            }}
          >
            <TextField
              fullWidth
              placeholder="Entrez votre adresse de livraison"
              variant="outlined"
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  borderTopRightRadius: { sm: 0 },
                  borderBottomRightRadius: { sm: 0 },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              sx={{
                bgcolor: "#FF7A00",
                color: "#FFF",
                borderTopLeftRadius: { xs: 4, sm: 0 },
                borderBottomLeftRadius: { xs: 4, sm: 0 },
                px: 3,
                "&:hover": {
                  bgcolor: theme.palette.common.white ,
                  color: theme.palette.primary.main,
                },
              }}
            >
              Rechercher
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Wave shape at bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: -20,
          left: 0,
          width: "100%",
          height: "100px",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fillOpacity='1' d='M0,96L80,106.7C160,117,320,139,480,138.7C640,139,800,117,960,112C1120,107,1280,117,1360,122.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      />
    </Box>
  )
}