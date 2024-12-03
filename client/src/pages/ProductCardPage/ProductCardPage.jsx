import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { loadProductAsync } from "../../action";
import { selectProduct, selectUserId, selectUserRole } from "../../selectors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
import { ProductCartForm } from "./component/product-form/product-form";
import { addProductToCart } from "../../action/add-product-to-cart";

export const ProductCardPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("characteristics");
  const [count, setCount] = useState(0);
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();

  const product = useSelector(selectProduct);
  const userRole = useSelector(selectUserRole);
 
  const userId = useSelector(selectUserId)
console.log(userId, "ответ от селестора")

  const isEditing = useMatch("/products/:id/edit");

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      const productData = await dispatch(loadProductAsync(id));

      if (productData.error) {
        setError(productData.error);
      }

      setIsLoading(false);
    };

    loadProduct();
  }, [dispatch, id, userId]);


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
  console.log(userId, "ответ после загрузки")
  const handleAddToCart = (product, userId) => {
    console.log(userId)
    const productId = product.id
    dispatch(
      addProductToCart(productId, count, userId)
    );
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ProductCardPageContainer>
      {isEditing ? (
        <ProductCartForm key={product.id} product={product} />
      ) : (
        <>
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
                <Button onClick={() => handleAddToCart(product, userId)}>
                  В корзину
                </Button>
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
        </>
      )}

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
