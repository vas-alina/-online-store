import { getOrders} from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constans/role";
import { fetchRoles } from "./fetch-roles";

export const fetchOrders = async (hash) => {
  // const hash = "0.75233737197634065196893971005920320749282836914063"
  // fetchRoles(roleId)
  // console.log("Проверка роли:", roleId);
  console.log("Проверка доступа для хэша ответ:", hash);
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);
  console.log("Результат проверки доступа для заказов:", access);
  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }
  const orders = await getOrders();
  console.log("Полученные заказы:", orders);
  return {
    error: null,
    res: orders,
  };
};
