import styled from "styled-components";

 export const AboutBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 0;
  max-width: 80%;
  padding: 5%;

  .about-text {
    flex: 1;
    max-width: 50%;
    padding-right: 20px;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      margin-top: 10px;
    }

    h3 {
      font-size: 19px;
      line-height: 1.2;
      font-weight: normal;
    }
  }

  .about-slide {
    margin: 0 auto;
    flex: 1;
    max-width: 50%;
  }

  .customSlider {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
`;