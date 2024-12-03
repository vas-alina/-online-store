
import { ScVk } from "@styled-icons/evil/ScVk";
import { ScInstagram } from "@styled-icons/evil/ScInstagram";
import { ScTelegram } from "@styled-icons/evil/ScTelegram";
import { ScYoutube } from "@styled-icons/evil/ScYoutube";
import { ScOdnoklassniki } from "@styled-icons/evil/ScOdnoklassniki";
import { Icon } from "../Icon/Icon";
import { ContactInfo, Copyright, FooterContainer, FooterTop, SocialIcons } from "./style";



export const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <ContactInfo>
          <a href="tel:+78612179252">+7 (861) 217-92-52</a>
          <a href="mailto:market6@evrostroy1.ru">market6@evrostroy1.ru</a>
          <p>г. Краснодар, Восточно-Кругликовская ул., 42/3к1</p>
        </ContactInfo>

        <SocialIcons>
          <a href="#">
            <Icon
              icon={ScVk}
              size="50px"
              color="white"
              
            />
          </a>
          <a href="#">
            <Icon
              icon={ScInstagram}
              size="50px"
              color="white"
            />
          </a>
          <a href="#">
            <Icon
              icon={ScTelegram}
              size="50px"
              color="white"
            />
          </a>
          <a href="#">
            <Icon
              icon={ScYoutube}
              size="50px"
              color="white"
            />
          </a>
          <a href="#">
            <Icon
              icon={ScOdnoklassniki}
              size="50px"
              color="white"
            />
          </a>
        </SocialIcons>
      </FooterTop>
      <Copyright>© 2024 Еврострой. Все права защищены</Copyright>
    </FooterContainer>
  );
};
