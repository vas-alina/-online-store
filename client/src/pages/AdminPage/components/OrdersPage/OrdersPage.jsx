import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PrivateContent } from "../../../../components";
import { Container } from "../../../CartPage/style";
import { useServerRequest } from "../../../../hooks/use-server-request";
import { selectUserRole } from "../../../../selectors/select-user-role";
import { checkAccess } from "../../../../utils/check-access";
import { ROLE } from "../../../../constans/role";
import { HeaderRow, OrderPageTitle, Table, TableRow } from "./style";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateOrderList, setShouldUpdateOrderList] = useState(false);
  const userRole = useSelector(selectUserRole);
  const requestServer = useServerRequest();

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
      requestServer("fetchOrders").then((ordersRes) => {
        if (ordersRes.error) {
          setErrorMessage(ordersRes.error);
          return;
        }
      setOrders(ordersRes.res);
    });
  }, [requestServer, shouldUpdateOrderList, userRole]);

  const onOrderRemove = (orderId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
    requestServer("removeOrder", orderId).then(() => {
      setShouldUpdateOrderList(!shouldUpdateOrderList);
    });
  };

  return (
    <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
      <Container>
        <OrderPageTitle>Заказы</OrderPageTitle>
        <Table>
          <HeaderRow>
            <div>Логин</div>
            <div>Дата заказа</div>
            <div>Сумма заказа</div>
            <div>Действия</div>
          </HeaderRow>
          {orders.map(
            ({
              id,
              userId,
              createdAt,
              firstName,
              lastName,
              deliveryMethod,
              city,
              street,
              number,
              comment_order,
            }) => (
              <TableRow key={id}>
                <div>{`${firstName} ${lastName}` || userId}</div>
                <div>{new Date(createdAt).toLocaleDateString()}</div>
                <div>{`${city}, ${street}, д.${number}`}</div>
                <div>
                  <button onClick={() => onOrderRemove(id)}>Удалить</button>
                </div>
              </TableRow>
            )
          )}
        </Table>
        {orders.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Заказов пока нет.
          </p>
        )}
      </Container>
    </PrivateContent>
  );
};
