import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, CssBaseline } from "@mui/material"
import Home from "./pages/Home"
import theme from "./theme"
import "./App.css" // Assurez-vous que votre App.css est importé

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

