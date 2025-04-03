

import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Link, useTheme } from "@mui/material"; 
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; 

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
      <Container maxWidth="lg">
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

        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={2} key={category.id}>
              <Card
                sx={{
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
                  height="140"
                  image={category.image}
                  alt={category.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center", py: 1.5 }}>
                  <Typography variant="body2">{category.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}