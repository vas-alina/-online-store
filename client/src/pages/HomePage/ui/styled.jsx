import styled from "styled-components";

export const AboutBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 80%;
  padding: 5%;

  .about-text {
    flex: 1;
    max-width: 50%;
    padding-right: 20px;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 1.2rem;
      line-height: 1.5;
      font-weight: normal;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
