import { createTheme } from "@mui/material"

// Thème avec des marges horizontales réduites
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B1A",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          // Marges horizontales réduites
          paddingLeft: "8px !important",
          paddingRight: "8px !important",
          "@media (min-width: 600px)": {
            paddingLeft: "16px !important",
            paddingRight: "16px !important",
          },
          // Augmenter la largeur maximale
          maxWidth: "100% !important",
        },
        maxWidthLg: {
          maxWidth: "1400px !important",
        },
      },
    },
    // Réduire le padding des cartes pour qu'elles soient plus compactes
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "8px !important",
          "&:last-child": {
            paddingBottom: "8px !important",
          },
        },
      },
    },
  },
})

export default theme

