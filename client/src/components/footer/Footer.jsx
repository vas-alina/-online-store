import styled from "styled-components";
import { ScVk } from "@styled-icons/evil/ScVk";
import { ScInstagram } from "@styled-icons/evil/ScInstagram";
import { ScTelegram } from "@styled-icons/evil/ScTelegram";
import { ScYoutube } from "@styled-icons/evil/ScYoutube";
import { ScOdnoklassniki } from "@styled-icons/evil/ScOdnoklassniki";
import { Icon } from "../Icon/Icon";

const FooterContainer = styled.footer`

  background-color: #2e2e2e;
  padding: 10px 20px;
  color: #fff;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 5px;
  border-bottom: 1px solid #444;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  a {
    color: #fff;
    text-decoration: none;
    margin-top: 5px;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const FooterSections = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

`;

const Section = styled.div`
  margin-right: 20px;
  margin-bottom: 10px;

  h4 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

const Copyright = styled.div`
  text-align: center;
  padding: 5px 0;
  border-top: 1px solid #444;
  font-size: 0.9em;
`;

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
              color="orange"
              hoverColor="darkorange"
            />
          </a>
          <a href="#">
            <Icon
              icon={ScInstagram}
              size="50px"
              color="orange"
              hoverColor="darkorange"
            />
          </a>
          <a href="#">
            <Icon
              icon={ScTelegram}
              size="50px"
              color="orange"
              hoverColor="darkorange"
            />
          </a>
          <a href="#">
            <Icon
              icon={ScYoutube}
              size="50px"
              color="orange"
              hoverColor="darkorange"
            />
          </a>
          <a href="#">
            <Icon
              icon={ScOdnoklassniki}
              size="50px"
              color="orange"
              hoverColor="darkorange"
            />
          </a>
        </SocialIcons>
      </FooterTop>

      <FooterSections>
        <Section>
          <h4>Услуги</h4>
          <ul>
            <li>
              <a href="#">Благоустройство территории</a>
            </li>
          </ul>
        </Section>

        <Section>
          <h4>Каталог</h4>
          <ul>
            <li>
              <a href="#">Тротуарная плитка и брусчатка</a>
            </li>
            <li>
              <a href="#">Бордюры</a>
            </li>
            <li>
              <a href="#">Газонная решетка</a>
            </li>
          </ul>
        </Section>

        <Section>
          <h4>Компания</h4>
          <ul>
            <li>
              <a href="#">О нас</a>
            </li>
            <li>
              <a href="#">Заводы</a>
            </li>
          </ul>
        </Section>
      </FooterSections>

      <Copyright>© 2024 Еврострой. Все права защищены</Copyright>
    </FooterContainer>
  );
};
