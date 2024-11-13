import { Input, CheckboxLabel, TextArea } from "../styles";

export const ProfileSettings = () => (
    <div>
      <h2>Профиль пользователя</h2>
      <h3>Личные данные</h3>
      <Input type="text" placeholder="Фамилия" />
      <Input type="text" placeholder="Имя" />
      <Input type="text" placeholder="Отчество" />
      <Input type="text" placeholder="Телефон" />
      <CheckboxLabel>
        <input type="checkbox" /> Подписаться на анонсы событий и акций
      </CheckboxLabel>
      <h3>Адрес доставки</h3>
      <Input type="text" placeholder="Адрес доставки" />
      <TextArea placeholder="Комментарий" />
    </div>
  );