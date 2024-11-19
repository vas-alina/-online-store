import { OrderCell, OrderRowContainer, RemoveButton } from "./styles";


export const OrderRow = ({ order}) => {
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
        userId 
      } = order;
      console.log(order)
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
            {/* <RemoveButton onClick={onOrderRemove}>Удалить</RemoveButton> */}
          </OrderCell>
        </OrderRowContainer>
      );
};
