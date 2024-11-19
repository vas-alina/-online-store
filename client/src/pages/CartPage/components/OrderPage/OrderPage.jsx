import { useNavigate } from "react-router-dom";
import { Button, Input, Title } from "../../../../components";
import { useState } from "react";
import { Container } from "../../style";
import { useAddNewOrder } from "../../../../hooks";
import {
  AddressCard,
  AddressList,
  FormSection,
  OrderSummary,
  SectionContact,
  SectionSelectShipping,
  SectionShipping,
  TabButton,
  TabsContainer,
} from "./style";

const addresses = [
  {city:"г.Сочи",
  street: "пер. Армянский",
  number: "1"},

  {city:"г.Краснодар,",
  street: "Джубгинский проезд",
  number: "19"},

  {city:"а. Понежукай",
  street: "ул. Ленина",
  number: "1"}
];

export const OrderPage = () => {
  const navigate = useNavigate();
  const [methodShipping, setMethodShipping] = useState("delivery");
  const [selectAdress, setSelectAdress] = useState(addresses[1]);
  const { addNewOrder, error } = useAddNewOrder("customer");
  const [contactData, setContactData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });
  const [deliveryData, setDeliveryData] = useState({
    city: "",
    street: "",
    number: "",
    comment_order: "",
  });
  const handleContactChange = (field, value) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryChange = (field, value) => {
    setDeliveryData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    const orderData = {
      ...contactData,
      deliveryMethod: methodShipping,
      ...(methodShipping === "delivery"
        ? deliveryData
        : { pickupAddress: selectAdress }),
    };

    addNewOrder(orderData);
    console.log(orderData);
  };
  return (
    <Container>
      <FormSection>
        <Title>Оформление заказа</Title>
        <Title as="h2">Контактные данные</Title>
        <SectionContact>
          <Input
            width="calc(50% - 40px)"
            placeholder="Имя"
            value={contactData.first_name}
            onChange={(e) => handleContactChange("first_name", e.target.value)}
          />
          <Input
            width="calc(50% - 40px)"
            placeholder="Фамилия"
            value={contactData.last_name}
            onChange={(e) => handleContactChange("last_name", e.target.value)}
          />
          <Input
            width="calc(50% - 40px)"
            placeholder="Телефон*"
            value={contactData.phone}
            onChange={(e) => handleContactChange("phone", e.target.value)}
          />
          <Input
            width="calc(50% - 40px)"
            placeholder="E-mail"
            value={contactData.email}
            onChange={(e) => handleContactChange("email", e.target.value)}
          />
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
              value={deliveryData.city}
              onChange={(e) => handleDeliveryChange("city", e.target.value)}
            />
            <Input
              width="calc(50% - 40px)"
              placeholder="Улица"
              value={deliveryData.street}
              onChange={(e) => handleDeliveryChange("street", e.target.value)}
            />
            <Input
              width="calc(50% - 40px)"
              placeholder="Дом, корпус, квартира"
              value={deliveryData.number}
              onChange={(e) => handleDeliveryChange("number", e.target.value)}
            />
            <Input
              as="textarea"
              placeholder="Комментарий"
              rows="3"
              value={deliveryData.comment_order}
              onChange={(e) =>
                handleDeliveryChange("comment_order", e.target.value)
              }
            />
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
                  {address.city} {address.street} {address.number} 
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button onClick={handleSubmit}>Подтвердить заказ</Button>
      </OrderSummary>
    </Container>
  );
};
