import { CustomSlider } from "../../../../components/Slider/Slider";
import AboutImg1 from "../../../../assets/Frame675.jpg";
import AboutImg2 from "../../../../assets/Frame676.jpg";
import { AboutBlockContainer, AboutBlockItem } from "./style";


const aboutImageArray = [
  { src: AboutImg1, alt: "First Slide" },
  { src: AboutImg2, alt: "Second Slide" },
];

export const AboutBlock = () => {
  return (
    <AboutBlockContainer>
      <AboutBlockItem>
        <h3>
          «Еврострой» — завод-производитель дорожно-тротуарного покрытия –
          тротуарная плитка, брусчатка, бордюры, газонная решетка - производится
          на немецком оборудовании высокой точности «Knauer», «Zenith», «Hess».
          Мы работаем на рынке 30 лет, первый завод открылся в 1994 года.
          Сегодня три завода расположены в городе Сочи, Краснодаре и республике
          Адыгея.
        </h3>
      </AboutBlockItem>
      <AboutBlockItem>
        <CustomSlider images={aboutImageArray} width="100%" height="500px" />
      </AboutBlockItem>
    </AboutBlockContainer>
  );
};
