import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;
    navbar: string;
    navtab: string;
    toggleBorder: string;
    gradient: string;
    card: string;
    formlabel: string;
  }
}