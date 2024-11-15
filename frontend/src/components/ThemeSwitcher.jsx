"use client";

import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  // Temayı localStorage'dan yükle
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark";
    }
    return false;
  });

  // Tema değiştiğinde body'nin data-theme özelliğini güncelle
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button onClick={toggleTheme} style={buttonStyle}>
      {isDarkMode ? "Koyu Tema" : "Açık Tema"}
    </button>
  );
};

// Basit stil
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "5px",
};

export default ThemeSwitcher;
