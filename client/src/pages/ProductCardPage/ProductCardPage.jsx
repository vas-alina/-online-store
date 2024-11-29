import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadProductAsync } from "../../action";
import { selectProduct, selectUserRole } from "../../selectors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useServerRequest } from "../../hooks";
import {
  GalleryContainer,
  MainImage,
  ThumbnailContainer,
  ThumbnailImage,
  ProductInfoContainer,
  ProductPageMainContainer,
  ProductTitle,
  ProductDescription,
  PriceAndCartContainer,
  ProductPrice,
  //   AddToCartButton,
  TabsContainer,
  TabButton,
  TabContent,
  CharacteristicsContainer,
  Characteristic,
  ReviewsContainer,
  Review,
  ReviewAuthor,
  ReviewText,
  ProductCardPageContainer,
  ProductForm,
  InputQuantity,
} from "./style";
import { Button, Icon } from "../../components";
import { useAddToCart } from "../../hooks/use-add-to-cart";

export const ProductCardPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("characteristics");
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectProduct);
  const userRole = useSelector(selectUserRole);
  const requestServer = useServerRequest();

  const { addToCart } = useAddToCart(userRole);


  

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      const productData = await dispatch(loadProductAsync(requestServer, id));

      if (productData.error) {
        setError(productData.error);
      }

      setIsLoading(false);
    };

    loadProduct();
  }, [requestServer, dispatch, id]);

//   const handleQuantityChange = (event) => {
//     const value = Number(event.target.value);
//     if (!isNaN(value)  >= 0) {
//       setCount(value);
//     }
//   };
const handleQuantityChange = (event) => {
    const value = Number(event.target.value); 
    let newQuantity = value; 
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setCount(newQuantity); 
    } else {

      setCount(0);
    }
    return newQuantity; 
  };



  const handleAddToCart = (product) => {
    // const {count} = product
    dispatch(addToCart({...product, count}));
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ProductCardPageContainer>
      <ProductPageMainContainer>
        <GalleryContainer>
          <ThumbnailContainer>
            <ThumbnailImage src={product.imgUrl} alt={product.title} />
            <ThumbnailImage src={product.imgUrl} alt={product.title} />
            <ThumbnailImage src={product.imgUrl} alt={product.title} />
          </ThumbnailContainer>
          <MainImage src={product.imgUrl} alt={product.title} />
        </GalleryContainer>

        <ProductInfoContainer>
          <ProductTitle>
            {product.title} {product.form} {product.color}
          </ProductTitle>
          <ProductDescription>{product.desc}</ProductDescription>

          <PriceAndCartContainer>
            <div>
              <ProductPrice>{product.price} ₽</ProductPrice>
            </div>
            <ProductForm>
        <label htmlFor="quantity">Количество м²:</label>
        <InputQuantity
          type="number"
          id="quantity"
          value={count}
          onChange={handleQuantityChange}
          min="1" 
        />
      </ProductForm>
          </PriceAndCartContainer>
          <div>
            <Button onClick={() => handleAddToCart(product)}> В корзину</Button>
            {console.log()}
            <Icon
              inactive={true}
              icon={FavoriteBorderIcon}
              margin="0 7px 0 0"
              size="18px"
              onClick={() => {}}
            />
          </div>
        </ProductInfoContainer>
      </ProductPageMainContainer>

      <TabsContainer>
        <TabButton
          isActive={activeTab === "characteristics"}
          onClick={() => setActiveTab("characteristics")}
        >
          Характеристики
        </TabButton>
        <TabButton
          isActive={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        >
          Отзывы
        </TabButton>
      </TabsContainer>

      {activeTab === "characteristics" ? (
        <TabContent>
          <CharacteristicsContainer>
            <Characteristic>Материал: Дерево</Characteristic>
            <Characteristic>Цвет: Орех</Characteristic>
          </CharacteristicsContainer>
        </TabContent>
      ) : (
        <TabContent>
          <ReviewsContainer>
            <Review>
              <ReviewAuthor>Алексей</ReviewAuthor>
              <ReviewText>Отличный товар!</ReviewText>
            </Review>
          </ReviewsContainer>
        </TabContent>
      )}
    </ProductCardPageContainer>
  );
};
