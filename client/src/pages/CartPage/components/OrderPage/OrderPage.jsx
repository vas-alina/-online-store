import { useNavigate } from "react-router-dom";
import { Button, Input, Title } from "../../../../components";
import { useState } from "react";
import { Container } from "../../style";
import { AddressCard, AddressList, FormSection, OrderSummary, SectionContact, SectionSelectShipping, SectionShipping, TabButton, TabsContainer } from "./style";


const addresses = [
  "г.Сочи, пер. Армянский 1",
  "г.Краснодар, Джубгинский проезд 19",
  "а. Понежукай, ул. Ленина 1",
];

export const OrderPage = () => {
  const navigate = useNavigate();
  const [methodShipping, setMethodShipping] = useState("delivery");
  const [selectAdress, setSelectAdress] = useState(addresses[1]);
  return (
    <Container>
      <FormSection>
        <Title>Оформление заказа</Title>
        <Title as="h2">Контактные данные</Title>
        <SectionContact>
          <Input width="calc(50% - 40px)" placeholder="Имя" />
          <Input width="calc(50% - 40px)" placeholder="Фамилия" />
          <Input width="calc(50% - 40px)" placeholder="Телефон*" />
          <Input width="calc(50% - 40px)" placeholder="E-mail" />
        </SectionContact>

        <Title>Способ получения</Title>
        <TabsContainer>
          <TabButton
            isActive={methodShipping === "delivery"}
            onClick={() => setMethodShipping("delivery")}
          >
            Доставка
          </TabButton>

          <TabButton
            isActive={methodShipping === "pickup"}
            onClick={() => setMethodShipping("pickup")}
          >
            Самовывоз
          </TabButton>
        </TabsContainer>
        {methodShipping === "delivery" ? (
          <SectionShipping>
            <Input
              width="calc(110% - 40px)"
              placeholder="Город, населённый пункт"
            />
            <Input width="calc(50% - 40px)" placeholder="Улица" />
            <Input width="calc(50% - 40px)" placeholder="Дом, корпус, квартира" />
            <Input as="textarea" placeholder="Комментарий" rows="3" />
          </SectionShipping>
        ) : (
          <SectionSelectShipping>
            <Title as="h3">Выберите адрес производства:</Title>
            <AddressList>
              {addresses.map((address, index) => (
                <AddressCard
                  key={index}
                  isSelected={selectAdress === address}
                  onClick={() => setSelectAdress(address)}
                >
                  {address}
                </AddressCard>
              ))}
            </AddressList>
          </SectionSelectShipping>
        )}
      </FormSection>
      <OrderSummary>
        <Button type="button" onClick={() => navigate("/cart")}>
          ← Вернуться в корзину
        </Button>
        <p>количество товаров</p>
        <Title as="h2">сумма</Title>
        <Button>Подтвердить заказ</Button>
      </OrderSummary>
    </Container>
  );
};
