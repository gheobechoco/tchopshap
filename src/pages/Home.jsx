import { useTheme, useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CategoryList";
import RestaurantOnSpot from "../components/RestaurantOnSpot";
import HowItWorks from "../components/HowItWorks";
import Download from "../components/Download";
import Footer from "../components/Footer";

export default function Home() {
  const theme = useTheme(); // 🔥 nécessaire AVANT d'utiliser `theme`
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Tu peux utiliser isMobile pour adapter l'affichage selon la taille d'écran

  return (
    <>
      <Header />
      <HeroSection />
      <CategoryList />
      <RestaurantOnSpot />
      <HowItWorks />
      <Download />
      <Footer />
    </>
  );
}
