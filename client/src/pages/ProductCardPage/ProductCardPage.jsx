import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { addProductToFavorites, loadProductAsync } from "../../action";
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
  ImageContainer,
  FavoriteButtonContainer,
} from "./style";
import { Button, Icon } from "../../components";
import { ProductCartForm } from "./component/product-form/product-form";
import { addProductToCart } from "../../action/add-product-to-cart";
import { FavoriteButton } from "../../components";
import { Comments } from "./component/comments/Comments";

export const ProductCardPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("characteristics");
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectProduct);
  const userRole = useSelector(selectUserRole);

  const userId = useSelector(selectUserId);
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
 
  const handleAddToCart = () => {
    const productId = product.id;
    dispatch(addProductToCart(productId, count, userId));
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
              <ImageContainer>
                <FavoriteButtonContainer>
                  <FavoriteButton product={product} size={50}/>
                </FavoriteButtonContainer>
                <MainImage src={product.imgUrl} alt={product.title} />
              </ImageContainer>
            </GalleryContainer>

            <ProductInfoContainer>
              <ProductTitle>
                {product.title} {product.form} {product.color}
              </ProductTitle>

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
                <Button
                  width="150px"
                  onClick={() => handleAddToCart(product, userId)}
                >
                  В корзину
                </Button>
              </div>
              <ProductDescription>{product.desc}</ProductDescription>
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
            <ProductDescription>{product.desc}</ProductDescription>

            <Characteristic>Ширина -- -- -- {product.width}</Characteristic>
            <Characteristic>Длина -- -- -- {product.length}</Characteristic>
            <Characteristic>Высота -- -- -- {product.height}</Characteristic>
          </CharacteristicsContainer>
        </TabContent>
      ) : (
        <TabContent>
          <ReviewsContainer>
            <Review>
              <Comments comments={product.comments} productId={product.id} />
            </Review>
          </ReviewsContainer>
        </TabContent>
      )}
    </ProductCardPageContainer>
  );
};
