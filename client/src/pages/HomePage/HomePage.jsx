import { AboutBlock, InfoBlocks } from "./components/Features";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import data from "../../db.json";
import mainImg1 from "../../assets/mainImg1.png";
import mainImg2 from "../../assets/mainImg2.png";
import aboutImg1 from "../../assets/Frame675.jpg";
import aboutImg2 from "../../assets/Frame676.jpg";
import { Button } from "../../components";
import { ProductCard } from "../CatalogPage/components/product-card/ProductCard";
import { CatalogBlocks } from "./components/Features/CatalogBlock";
import { CustomSlider } from "./../../components/Slider/Slider";

const ProductGroup = styled.div`
  margin-top: 20px;
`;
const ProductGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 80%;
  gap: 25px;
`;

const mainImageArray = [
  { src: mainImg1, alt: "First Slide" },
  { src: mainImg2, alt: "Second Slide" },
];

const aboutImageArray = [
  { src: aboutImg1, alt: "First Slide" },
  { src: aboutImg2, alt: "Second Slide" },
];
const recomendProducts = [5, 6, 7, 1, 2];

const HomePageContainer = ({ className }) => {
  //TODO:не забыть!
  const products = data.products;
  return (
    <>
      <Helmet>
        <title>Еврострой 1</title>
      </Helmet>
      <div className="customSlider">
        <CustomSlider images={mainImageArray} width="100%" height="auto" />
      </div>

      <InfoBlocks />
      <ProductGroup>
        <h2>Новинки</h2>
        
        {/* <ProductGroupContainer>
          {products
            .filter((p) => recomendProducts.includes(p.id))
            .map((p) => (
              <ProductCard {...p} key={p.id} />
            ))}
        </ProductGroupContainer> */}
      </ProductGroup>
      <CatalogBlocks />
      <AboutBlock>
        <div className="about-text">
          <h2>Еврострой -</h2>
          <h3>
            Еврострой завод-производитель дорожно-тротуарного покрытия на юге
            России. Производим вибропрессованную тротуарную плитку/брусчатку,
            газонную решетку и бордюры на немецком оборудовании высокой точности
            «Knauer», «Zenith», «Hess». <br></br> <br></br>На выбор 15 форм
            плитки, более 20 вариантов цветов из коллекция Колор микс, а так же
            премиум сегмент из коллекции MINERAL.<br></br>
            <br></br> Работаем на рынке 30 лет, первый завод открылся в Сочи
            1994 году. Сегодня в Краснодарском крае расположены три завода общей
            мощностью — 3500 кв. м за смену. Предоставляем услуги по укладке
            тротуарной плитки под ключ. Работаем по договору с гарантией 10 лет.
          </h3>
          <br />
          <Button width="300px">Подробнее</Button>
        </div>
        <div className="about-slide">
          <CustomSlider images={aboutImageArray} width="700px" height="500px" />
        </div>
      </AboutBlock>
    </>
  );
};

export const HomePage = styled(HomePageContainer)`
  top: 50px;
`;
