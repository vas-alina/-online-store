import { OrderCell, OrderRowContainer, RemoveButton } from "./styles";

export const OrderRow = ({ onOrderRemove, order }) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    city,
    commentOrder,
    createdAt,
    deliveryMethod,
    street,
    number,
    
  } = order;
 
  return (
    <OrderRowContainer>
      <OrderCell>{id}</OrderCell>
      <OrderCell>{`${firstName} ${lastName}`}</OrderCell>
      <OrderCell>{email}</OrderCell>
      <OrderCell>{phone}</OrderCell>
      <OrderCell>{city}</OrderCell>
      <OrderCell>{deliveryMethod}</OrderCell>
      <OrderCell>{createdAt}</OrderCell>
      <OrderCell>{street}</OrderCell>
      <OrderCell>{number}</OrderCell>
      <OrderCell>{commentOrder}</OrderCell>
      <OrderCell>
        <RemoveButton onClick={onOrderRemove}>Удалить</RemoveButton>
      </OrderCell>
    </OrderRowContainer>
  );
};
