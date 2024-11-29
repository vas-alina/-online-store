import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { AuthFormError, Button, H2, Input } from "../../components";
import { useResetForm } from "../../hooks";
import { setUser, setCart, setFavorites } from "../../action";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constans/role";
import { AuthorizationContainer, StyledLink } from "./style";

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(
      /^\w+$/,
      "Неверно заполнен логин. Допускаются только буквы и цифры"
    )
    .min(3, "Неверно заполнен логин. Минимум 3 символа")
    .max(15, "Неверно заполнен логин. Максимум 15 символов"),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %"
    )
    .min(6, "Неверно заполнен пароль. Минимум 6 символов")
    .max(30, "Неверно заполнен пароль. Максимум 30 символов"),
});

export const Authorization = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();

  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    server
      .authorize(login, password)
      .then(({ error, res }) => {
        if (error) {
          setServerError(`Ошибка запроса: ${error}`);
          return;
        }

        dispatch(setUser(res));
        sessionStorage.setItem("userData", JSON.stringify(res));

        Promise.all([server.fetchCart(res.id), server.fetchFavorites(res.id)])
          .then(([cartData, favoritesData]) => {
            dispatch(setCart(cartData));
            sessionStorage.setItem("cartData", JSON.stringify(cartData));

            dispatch(setFavorites(favoritesData));
            sessionStorage.setItem(
              "favoritesData",
              JSON.stringify(favoritesData)
            );
          })
          .catch((fetchError) => {
            console.error(
              "Ошибка при загрузке данных корзины или избранного:",
              fetchError
            );

            
          });
      })
      .catch((authError) => {
        setServerError(`Ошибка авторизации: ${authError}`);
      });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }
  return (
    <AuthorizationContainer>
      <H2>Авторизация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин..."
          {...register("login", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Пароль..."
          {...register("password", {
            onChange: () => setServerError(null),
          })}
        />
        <Button type="submit" disabled={!!formError}>
          Авторизоваться
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
        <StyledLink>
          <Link to="/register">Регистрация </Link>
        </StyledLink>
      </form>
    </AuthorizationContainer>
  );
};
