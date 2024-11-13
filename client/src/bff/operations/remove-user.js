import { deleteUser } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constans/role";

export const removeUser = async (hash, userId) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(hash, accessRoles)) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  deleteUser(userId);

  return {
    error: null,
    res: true,
  };
};
