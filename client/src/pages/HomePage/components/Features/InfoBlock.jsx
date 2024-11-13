
import styled from 'styled-components';


const InfoBlocksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 75%;
  height: 200px;
  background-color: #f8f8f8;
  padding: 0;
  margin: 20px auto;
`;

const Info = styled.div`
  flex: 1;
  text-align: center;
  padding: 0 15px;
  animation: forwards;
  
  h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  p {
    font-size: 1em;
    color: #666;
    margin: 5px 0 0 0;
  }

  &:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }
`;

export const InfoBlocks = () => {
  return (
    <InfoBlocksContainer>
      <Info>
        <h3>Соответствие ГОСТ</h3>
     <br />
        <p>Наличие сертификатов соответствия и протоколы испытаний</p>
      </Info>
      <Info>
        <h3>Выбор цветов и форм</h3>
        <p>15 форм, 3 фактуры и более 40 вариантов цветов</p>
      </Info>
      <Info>
        <h3>Отсутствие рисков</h3>
        <br />
        <p>Честная смета и работа по договору</p>
      </Info>
      <Info>
        <h3>Работа под ключ</h3>
        <br />
        <p>Комплексное благоустройство территории</p>
      </Info>
    </InfoBlocksContainer>
  );
};

