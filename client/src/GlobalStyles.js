import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');


  :root {
    --main-bg-color: rgba(255, 255, 255, 1);
    --color-primary-purple: rgba(132, 101, 115, 1);
    --color-primary-purple-opacity: rgba(132, 101, 115, 0.5);
    --color-secondary-red: rgba(236, 76, 76, 1);
    --color-accent-orange: rgba(247, 170, 71, 1);
    --footer-input-bg-color: rgba(244, 242, 242, 1);
    --item-color: rgba(71, 65, 65, 1);
    --text-color: rgba(0, 0, 0, 1);

    --content-width: 100vw;
    --content-min-height: 100%;
    --max-content-width: 2200px;

    --main-font: 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;

    --font-size-base: 16px;
    --font-size-title: 50px;
    --font-weight-bold: 700;

    --size-small: 8px;
    --size-medium: 16px;
    --size-large: 32px;

    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 32px;
    --spacing-top: 50px;
    --spacing-padding: 135px;
    --spacing-extra-extra-large: 150px;
  }

 
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: var(--main-font);
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
  }

  body {
    background-color: var(--main-bg-color);
    width: var(--content-width); 
    min-height: var(--content-min-height); 
  }

  a {
    text-decoration: none;
    color: var(--item-color);
  }


  #root {
    width: 100%; 
    min-height: 100vh;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--main-bg-color); 
    box-sizing: border-box;
  }

  /* @media (max-width: 768px) {
  body {
    width: 100%; 
    padding: 0.5rem;
  }

  #root {
    padding: 1rem;
  }

  h1, p, a {
    font-size: 90%; 
  }
} */
`;

export default GlobalStyle