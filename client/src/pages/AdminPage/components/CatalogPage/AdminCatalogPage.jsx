// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import styled from "styled-components";
// import { Container } from "../../../CartPage/style";
// import { useServerRequest } from "../../../../hooks/use-server-request";
// import { selectUserRole } from "../../../../selectors/select-user-role";
// import { checkAccess } from "../../../../utils/check-access";
// import { ROLE } from "../../../../constans/role";
// import { TableRow } from "../../../users/components";
// import { UserRow } from "../../../users/components";
// import { PrivateContent } from './../../../../components/PrivateContent/PrivateContent';

// export const AdminCatalogPage = () => {
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [shouldUpdateProductList, setShouldUpdateProductList] = useState(false);
//   const userRole = useSelector(selectUserRole);
//   const requestServer = useServerRequest();

//   useEffect(() => {
//     if (!checkAccess([ROLE.ADMIN], userRole)) {
//       return;
//     }
//     requestServer("fetchProducts").then(({ res: { products } }) => {
//       setProducts(products);
//     });
//   }, [requestServer]);

//   return (
//     <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
//       <Container>
//         <h2>Заказы</h2>
//         <div>
//           <TableRow>
//             <div className="login-column">Логин</div>
//             <div className="registered-at-column">Дата заказа</div>
//             <div className="role-column">Роль</div>
//           </TableRow>
//           {products.map(({ id, login, registeredAt, roleId }) => (
//             // <ProductsRow
//             //   key={id}
//             //   id={id}
//             //   login={login}
//             //   registeredAt={registeredAt}
//             //   roleId={roleId}
//             //   roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
//             // />
//           ))}
//         </div>
//       </Container>
//     </PrivateContent>
//   );
// };
