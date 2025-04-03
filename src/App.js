// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from "./pages/Home";

// Créer un thème avec la couleur orange 
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B1A',
    },
  },
});

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
  );
}

export default App;