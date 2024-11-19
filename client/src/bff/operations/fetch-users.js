import { getUsers } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constans/role";

export const fetchUsers = async (hash) => {
  console.log("Проверка доступа для хэша:", hash);
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);
  console.log("Результат проверки доступа для пользователей:", access);
  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }
  const users = await getUsers();
  console.log("Полученные пользователи:", users);
  return {
    error: null,
    res: users,
  };
};
