import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');


  :root {
    --main-font: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;
    --main-bg-color: rgba(255, 255, 255, 1);
    --primary-color: #846573;
    --secondary-color: #ec4c4c;
    --footer-input-bg-color: rgba(244, 242, 242, 1);
    --item-color: rgba(71, 65, 65, 1);
    --content-width: 100vw;
    --content-min-height: 100%;
  }

 
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: var(--main-font);
    overflow-x: hidden;
  }

  body {
    background-color: var(--main-bg-color);
    width: var(--content-width); 
    min-height: var(--content-min-height); 
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }


  #root {
    width: 100vw;       
    min-height: 100vh;  
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--main-bg-color); 
    box-sizing: border-box;
  }
`;

export default GlobalStyle;