
import styled from 'styled-components';
import BR from "../../../../assets/HomePageCatalog/bord.png"
import TP from "../../../../assets/HomePageCatalog/trot_pl.png"
import GR from "../../../../assets/HomePageCatalog/gazon_resh.png"

const CatalogContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 80%;
  margin: 20px auto;
`;

const CatalogItem = styled.div`
  position: relative;
  width: 30%;
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;

  &:hover .overlay {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: center;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;

  h3 {
    font-size: 1.5em;
    margin: 0;
  }

  p {
    font-size: 1em;
    margin: 5px 0 0;
  }
`;

const Text = styled.span`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`

export const CatalogBlocks = () => {
return (
    <>  

<CatalogContainer>
      <CatalogItem>
      <Image src={BR} alt="Бордюры" />
        <Overlay className="overlay">
          <h3>Бордюры</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, explicabo?</p>
        </Overlay>
      </CatalogItem>
      <CatalogItem>
      <Image src={TP} alt="Тротуарная плитка" />
        <Overlay className="overlay">
          <h3>Тротуарная плитка</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, deleniti.</p>
        </Overlay>
      </CatalogItem>
      <CatalogItem>
      <Image src={GR} alt="Газонная решетка" />
        <Overlay className="overlay">
          <h3>Газонная решетка</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, iusto.</p>
        </Overlay>
      </CatalogItem>
    </CatalogContainer>
  <Text>Перейти в каталог &gt; </Text>
    </>
  
  
  
);
};