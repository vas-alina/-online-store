import { getOrders} from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constans/role";
import { fetchRoles } from "./fetch-roles";

export const fetchOrders = async (hash) => {


  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }
  const orders = await getOrders();

  return {
    error: null,
    res: orders,
  };
};
