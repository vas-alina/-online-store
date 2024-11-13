import { useState } from "react";
import { Favorites, Orders, ProfileSettings } from "./components";
import { Container, Content, MenuItem, Sidebar   } from "./styles";

export const PersonalPage = () => {

        const [activeSection, setActiveSection] = useState('profile');

        const renderContent = () => {
          switch (activeSection) {
            case 'orders':
              return <Orders />;
            case 'favorites':
              return <Favorites />;
            case 'profile':
            default:
              return <ProfileSettings />;
          }
        };
      
        return (
          <Container>
            <Sidebar>
              <MenuItem active={activeSection === 'orders'} onClick={() => setActiveSection('orders')}>
                Мои заказы
              </MenuItem>
              <MenuItem active={activeSection === 'favorites'} onClick={() => setActiveSection('favorites')}>
                Избранное
              </MenuItem>
              <MenuItem active={activeSection === 'profile'} onClick={() => setActiveSection('profile')}>
                Профиль и настройки
              </MenuItem>
            </Sidebar>
            <Content>{renderContent()}</Content>
          </Container>
        );  
}