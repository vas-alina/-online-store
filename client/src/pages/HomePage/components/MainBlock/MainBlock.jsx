import MainImg1 from "../../../../assets/HomePage/Wrapper1.png";
import { Button } from "../../../../components";
import { ButtonContainer, Image, MainBlockContainer } from "./style";

export const MainBlock = () => {
  return (
    <MainBlockContainer>
      <Image src={MainImg1} alt="Main Image" />
      <ButtonContainer>
        <Button height="50px" fontSize="30px">
          {" "}
          Перейти в каталог{" "}
        </Button>
      </ButtonContainer>
    </MainBlockContainer>
  );
};
