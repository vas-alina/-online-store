import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { H2 } from "../../components";
import { selectUserRole } from "../../selectors";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constans";
import { PrivateContent } from "../../components";
import { OrderRow } from "./components/OrderRow";
import { TableRow } from "../users/components";
import { OrdersContainer } from "./style";
import { request } from "../../utils/request";
import DeleteIcon from "@mui/icons-material/Delete";
export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [roles, setRoles] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateOrderList, setShouldUpdateOrderList] = useState(false);
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole)) {
      return;
    }
    Promise.all([request("/api/orders"), request("/api/users/roles")]).then(
      ([ordersRes, rolesRes]) => {
        if (ordersRes.error || rolesRes.error) {
          setErrorMessage(ordersRes.error || rolesRes.error);
          return;
        }

        setOrders(ordersRes.orders);
        setRoles(rolesRes.data);
      }
    );
  }, [shouldUpdateOrderList, userRole]);

  const onOrderRemove = (orderId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
    request(`/api/orders/${orderId}`, "DELETE").then(() => {
      
      setShouldUpdateOrderList(!shouldUpdateOrderList);
    });
  }
  return (
    <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
      <OrdersContainer>
        <H2>Заказы</H2>
        <div>
          <TableRow>
            <div className="order-id-column">ID заказа</div>
            <div className="customer-column">Клиент</div>
            <div className="order-date-column">Дата заказа</div>
            <div className="status-column">Статус</div>
            <div className="total-column">Сумма</div>
          </TableRow>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onOrderRemove={() => onOrderRemove(order.id)}
            />
          ))}
        </div>
      </OrdersContainer>
    </PrivateContent>
  );
};
