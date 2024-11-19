import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Icon } from "../../../Icon/Icon";
import { ROLE } from "../../../../bff/constans/role";
import { IconsBlock } from "../../styled";
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from "../../../../selectors";
import { logout } from "../../../../action";
import { checkAccess } from "../../../../utils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

import TocIcon from "@mui/icons-material/Toc";
const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const ControlPanelContainer = ({ className }) => {
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const dispatch = useDispatch();
  const session = useSelector(selectUserSession);
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout(session));
    sessionStorage.removeItem("userData");
    navigate("/");
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);
  return (
    <div className={className}>
      <RightAligned>
        {roleId === ROLE.GUEST ? (
          <>
            <IconsBlock>
              <Icon
                icon={AccountCircleIcon}
                size="25px"
                color="var(--item-color)"
                hoverColor="darkorange"
              />
              <Link to="/login">Войти</Link>
            </IconsBlock>
          </>
        ) : (
          <>
            <UserName>{login}</UserName>
            <Icon
              icon={LogoutIcon}
              size="25px"
              color="var(--item-color)"
              hoverColor="darkorange"
              onClick={onLogout}
            />
          </>
        )}
        <IconsBlock>
          <Icon
            icon={FavoriteBorderIcon}
            size="25px"
            color="var(--item-color)"
            hoverColor="darkorange"
          />
          <Link to="/favorite">Избранное</Link>
        </IconsBlock>

        <IconsBlock>
          <Icon
            icon={ShoppingCartIcon}
            size="25px"
            color="var(--item-color)"
            hoverColor="darkorange"
          />
          <Link to="/cart">Корзина</Link>
        </IconsBlock>

        <RightAligned>
          {isAdmin && (
            <>
              <Link to="/post">
                <Icon
                  icon={TocIcon}
                  size="25px"
                  color="var(--item-color)"
                  hoverColor="darkorange"
                />
              </Link>
              <Link to="/users">
                <Icon
                  icon={GroupIcon}
                  size="25px"
                  color="var(--item-color)"
                  hoverColor="darkorange"
                />
              </Link>
            </>
          )}
        </RightAligned>
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
