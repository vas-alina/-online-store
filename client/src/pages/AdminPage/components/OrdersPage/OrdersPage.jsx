import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { PrivateContent } from "../../../../components";
import { Container } from "../../../CartPage/style";
import { useServerRequest } from './../../../../hooks/use-server-request';
import { selectUserRole } from './../../../../selectors/select-user-role';
import { checkAccess } from './../../../../utils/check-access';
import { ROLE } from './../../../../constans/role';
import { TableRow } from "../../../users/components";
import { UserRow } from "../../../users/components";

export const OrdersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
  const userRole = useSelector(selectUserRole);
  const requestServer = useServerRequest();

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
    Promise.all([
      requestServer("fetchUsers"),
      requestServer("fetchRoles"),
      requestServer("fetchOrders"),
    ]).then(([usersRes, rolesRes]) => {
      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        return;
      }

      setUsers(usersRes.res);
      setRoles(rolesRes.res);
      setOrders(rolesRes.res);
    });
  }, [requestServer, shouldUpdateUserList, userRole]);

  const onUserRemove = (orderId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
    requestServer("removeOrder", orderId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };
  return (
    <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
      <Container>
        <h2>Заказы</h2>
        <div>
          <TableRow>
            <div className="login-column">Логин</div>
            <div className="registered-at-column">Дата заказа</div>
            <div className="role-column">Роль</div>
          </TableRow>
          {orders.map(({ id, login, registeredAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registeredAt={registeredAt}
              roleId={roleId}
              roles={roles.filter(
                ({ id: roleId }) => roleId !== ROLE.GUEST,
              )}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
        </div>
      </Container>
    </PrivateContent>
  );
};

