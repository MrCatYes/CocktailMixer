// Set the Style of the website

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

    body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  
    .navbar{
    background:${({ theme }) => theme.navbar}
  
  }

    #navtab{
    background:${({ theme }) => theme.navtab}
  
  }
    .card, .modal-content {
    background:${({ theme }) => theme.card}
}
    a {
    color: ${({ theme }) => theme.text};
    margin: 0 10px;
}

    .log {
    color:${({ theme }) => theme.formlabel}

}
    .popover-arrow {
    visibility:hidden}
}
 
  `;
