import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Icon } from "../../../../components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const ActionBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2px;
`
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  margin: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  :hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 10px 0;
`;

const Price = styled.p`
  font-size: 14px;
  color: #555;
`;

const Description = styled.p`
  font-size: 12px;
  color: #777;
`;

export const ProductCard = ({ product }) => {
    const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };
  return (
  
      <Card onClick={handleCardClick}>
      <Image src={product.imgUrl} alt={product.title} />
      <Title>{product.title}</Title>
      <Price>{product.priceRegular} ₽</Price>
      <Description>{product.desc}</Description>
      <ActionBlock>
<Icon
           icon={FavoriteBorderIcon}
           size="25px"
           color="var(--item-color)"
           hoverColor="darkorange"
         />
<Icon
           icon={AddShoppingCartIcon}
           size="25px"
           color="var(--item-color)"
           hoverColor="darkorange"
           border="1px solid var(--item-color)"
           borderRadius="2px"
         />

      </ActionBlock>
      
    </Card>

     ); 
};
