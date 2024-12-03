import { InfoBlocks } from "./components/InfoBlock/InfoBlock";
import { AboutBlock } from "./components/AboutBlock/AboutBlock";
import { Title } from "../../components";
import { ROLE } from "../../constans";
import { selectUserRole } from "../../selectors";
import { useSelector } from "react-redux";
import { checkAccess } from "../../utils";
import { AdminPage } from "../AdminPage/AdminPage";
import { MainBlock } from "./components/MainBlock/MainBlock";
import { HomePageContainer,  TitleBlock } from "./style";

export const HomePage = () => {

  const roleId = useSelector(selectUserRole);
  const isAdmin = checkAccess([ROLE.ADMIN], roleId);


  return (
    <HomePageContainer>
      {isAdmin ? (
        <AdminPage />
      ) : (
        <>
          <MainBlock />
          <TitleBlock>
            <Title>
              Мощность заводов — 3 500 м2 тротуарной плитки/брусчатки за смену.
              Продукция соответствует ГОСТ 17608-2017. Предоставляем сертификаты
              соответствия и ежегодные протоколы испытаний.
            </Title>
          </TitleBlock>
          <AboutBlock></AboutBlock>
          <InfoBlocks />
        </>
      )}
    </HomePageContainer>
  );
};
