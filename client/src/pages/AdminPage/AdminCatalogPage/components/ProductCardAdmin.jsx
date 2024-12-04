import { ButtonGroup } from "@mui/material";
import { ActionButton, CardContainer, ProductDetail, ProductImage, ProductInfo, ProductTitle } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../../selectors";


const ProductCardAdmin = ({ product, onEdit, onDelete }) => {
const { id } = product
const navigate = useNavigate()

const handleClick = () => {
  navigate(`/products/${id}/`);
}
  return (
    <CardContainer>
      <ProductImage src={product.imgUrl} alt={product.title} />
      <ProductInfo>
       
        <ProductTitle onClick={handleClick} >{product.title}</ProductTitle>
        
        
        <ProductDetail>
          <strong>ID товара:</strong> {product.id}
        </ProductDetail>
        <ProductDetail>
          <strong>Категория:</strong> {product.category}
        </ProductDetail>
        <ProductDetail>
          <strong>Цвет:</strong> {product.color}
        </ProductDetail>
        <ProductDetail>
          <strong>Форма:</strong> {product.form}
        </ProductDetail>
        <ProductDetail>
          <strong>Ширина:</strong> {product.weight} см
        </ProductDetail>
        <ProductDetail>
          <strong>Высота:</strong> {product.height} см
        </ProductDetail>
        <ProductDetail>
          <strong>Цена:</strong> {product.price} руб.
        </ProductDetail>
      </ProductInfo>
      <ButtonGroup>
        <ActionButton onClick={() => onEdit(product.id)}>
          Редактировать
        </ActionButton>
        <ActionButton delete onClick={() => onDelete(product.id)}>
          Удалить
        </ActionButton>
      </ButtonGroup>
    </CardContainer>
  );
};

export default ProductCardAdmin;
