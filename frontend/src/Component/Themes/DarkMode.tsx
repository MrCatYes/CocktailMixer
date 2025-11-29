// Dark and Light mode Component

import { useEffect, useState } from "react";
export const useDarkMode = (): [string, () => void, boolean] => {  const [theme, setTheme] = useState("light");
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = (mode: string) => {
    // set the theme in local storage

    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };
  // Switch the value
  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    // get the theme in local storage
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode("light");
    }
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
};
