import { getRoles } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constans";

export const fetchRoles = async (hash) => {
  console.log("Проверка доступа для хэша fetch roles 1:", hash);
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);
  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  const roles = await getRoles();

  return {
    error: null,
    res: roles,
  };
};
