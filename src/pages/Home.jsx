import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CategoryList";
import RestaurantOnSpot from "../components/RestaurantOnSpot";
import HowItWorks from "../components/HowItWorks";
import Download from "../components/Download";
import Footer from "../components/Footer";

export default function Home() {
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