import { InfoBlocks } from "./components/InfoBlock/InfoBlock";
import { AboutBlock } from "./components/AboutBlock/AboutBlock";
import { H2, Title } from "../../components";
import { ROLE } from "../../constans";
import { selectUserRole } from "../../selectors";
import { useSelector } from "react-redux";
import { checkAccess } from "../../utils";
import { AdminPage } from "../AdminPage/AdminPage";
import { MainBlock } from "./components/MainBlock/MainBlock";
import { HomePageContainer, RecomendProductBlock, TitleBlock } from "./style";
import { ProductCard } from "../../components/product-card/ProductCard";
import { useServerRequest } from "../../hooks";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const roleId = useSelector(selectUserRole);
  const isAdmin = checkAccess([ROLE.ADMIN], roleId);
  const [products, setProducts] = useState([]);

  const requestServer = useServerRequest();

  useEffect(() => {
    requestServer("fetchProducts")
      .then(({ res: { products } }) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке продуктов:", error);
      });
  }, [requestServer]);
  console.log(products);

  const recomendProducts = [2, 5, 8, 3, 6, 10, 1, 4];

  const recommendedProducts = products
    .filter((product) => recomendProducts.includes(Number(product.id)))
    .slice(0, 8);
  console.log(recommendedProducts);

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
          <H2 className="recomendTitle">Рекомендуемые товары</H2>
          <RecomendProductBlock>
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))
            ) : (
              <p>Нет рекомендуемых продуктов.</p>
            )}
          </RecomendProductBlock>
        </>
      )}
    </HomePageContainer>
  );
};
