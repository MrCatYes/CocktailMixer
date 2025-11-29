// Values colors of themes used in GlobalStyles.js

import { DefaultTheme } from "styled-components";



export const lightTheme:DefaultTheme = {
    body: "#FFECD1",
    text: "#FFECD1",
    navbar: "#001524",
    navtab: "#001524",

    toggleBorder: "#FFF",
    gradient: "linear-gradient(#39598A, #79D7ED)",
    card: "#001524",
    formlabel: "#001524",
  };
  
  export const darkTheme:DefaultTheme = {
    body: "#171717",
    text: "#EDEDED",
    navbar: "#444444",
    navtab: "#444444",

    toggleBorder: "#6B8096",
    gradient: "linear-gradient(#091236, #1E215D)",
    card: "#444444",
    formlabel: "#EDEDED",
  };
  const theme = (mode : String) => (mode === "dark" ? darkTheme : lightTheme);
  
  export default theme;
  