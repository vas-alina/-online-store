
import { Icon } from "../../../../components";
import { TableRow } from "../table-row/Table-row";
import styled from "styled-components";
import { useState } from "react";
import { useServerRequest } from "../../../../hooks";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const UserRowContainer = ({
  className,
  id,
  login,
  registeredAt,
  roleId: userRoreId,
  roles,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoreId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoreId);
  const requestServer = useServerRequest();
  const isSaveButtonDisabled = selectedRoleId === initialRoleId;
  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };
  const onRoleSave = (userId, newUserRoleId) => {
    requestServer("updateUserRole", userId, newUserRoleId).then(() => {
      setInitialRoleId(newUserRoleId);
    });
  };

  return (
    <div className={className}>
      <TableRow border={true}>
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{registeredAt}</div>
        <div className="role-column">
          <select value={selectedRoleId} onChange={onRoleChange}>
            {roles.map(({ id: roleId, name: roleName }) => (
              <option key={roleId} value={roleId}>
                {roleName}
              </option>
            ))}
          </select>
          <Icon
            icon={FavoriteBorderIcon}
            margin="0 0 0 10px"
            disabled={isSaveButtonDisabled}
            onClick={() => onRoleSave(id, selectedRoleId)}
          />
        </div>
      </TableRow>
      <Icon icon={FavoriteBorderIcon} margin="0 0 0 10px" onClick={onUserRemove} />
    </div>
  );
};
export const UserRow = styled(UserRowContainer)`
  display: flex;
  margin-top: 10px;

  & select {
    padding: 0 5px;
    font-size: 16px;
  }
`;
