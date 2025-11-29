import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  AuthProvider  from "./Hooks/useAuth";


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import NavBar from "./Component/NavBar/NavBar";
import Tabs from './Component/Tabs/Tabs';

import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "./Component/Themes/Theme";
import { useDarkMode } from "./Component/Themes/DarkMode";
import { GlobalStyles } from "./Component/Themes/GlobalStyle";


const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  // Dark and light mode Toggler
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  //Check if the theme is light
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />

    <Router>    
      <AuthProvider>

      <NavBar toggleTheme={toggleTheme} theme={theme} />
<Tabs toggleTheme={toggleTheme} theme={theme} />

      <Routes>
        {/* <Route path="/" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/" element= {<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>    
      </AuthProvider>

    </Router>
    </ThemeProvider>

  );
}

export default App;