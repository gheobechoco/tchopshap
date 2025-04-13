import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, CssBaseline } from "@mui/material"
import Home from "./pages/Home"
import theme from "./theme"
import "./App.css" // Assurez-vous que votre App.css est importé
import Checkout from "./pages/Profile"
import LoginForm from "./components/LoginForm"
import Cart from "./pages/Cart"
import Restaurants from "./pages/Restaurants"
import Details from "./pages/RestaurantDetails"
import OrderConfirmation from "./pages/OrderConfirmation"; // N'oublie pas cet import




function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />   
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/details" element={<Details />} />
          <Route path="/confirmation" element={<OrderConfirmation/>} />

        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

