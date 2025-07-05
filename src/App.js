// [App.js]

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, CssBaseline } from "@mui/material"
import Home from "./pages/Home"
import theme from "./theme"
import "./App.css" // Assurez-vous que votre App.css est importé
import ProfileForm from "./pages/Profile" // 💡 CORRECTION : Importe ProfileForm sous son vrai nom
import LoginForm from "./components/LoginForm"
import Cart from "./pages/Cart"
import Restaurants from "./pages/Restaurants"
import Details from "./pages/RestaurantDetails"
import OrderConfirmation from "./pages/OrderConfirmation"; // N'oublie pas cet import
import Admin from "./pages/Admin"; // Import correct de la page Admin
import Register from "./components/Register"; // ou "./components/Signup" selon le nom du fichier
import OtpVerification from "./components/OtpVerification"; // ou pages si déplacé


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<ProfileForm />} />   {/* 💡 CORRECTION : Utilise ProfileForm ici */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/details" element={<Details />} />
          <Route path="/confirmation" element={<OrderConfirmation/>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App