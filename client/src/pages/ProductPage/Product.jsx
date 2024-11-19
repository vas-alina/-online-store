import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadProductAsync} from '../../action';
import { selectProduct, selectUserRole } from '../../selectors';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useServerRequest } from '../../hooks';
import {
  ProductPageContainer,
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
  AddToCartButton,
  TabsContainer,
  TabButton,
  TabContent,
  CharacteristicsContainer,
  Characteristic,
  ReviewsContainer,
  Review,
  ReviewAuthor,
  ReviewText,
} from './style';
import { Button, Icon } from '../../components';
import { useAddToCart } from './../../hooks/use-add-to-cart';



export const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const product = useSelector(selectProduct);
  const userRole = useSelector(selectUserRole);
  const requestServer = useServerRequest();
  const [activeTab, setActiveTab] = useState('characteristics');
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <ProductPageContainer>
      <ProductPageMainContainer>

<GalleryContainer>
      
      <ThumbnailContainer>
        <ThumbnailImage src={product.imgUrl} alt={product.title}/>
        <ThumbnailImage src={product.imgUrl} alt={product.title} />
        <ThumbnailImage src={product.imgUrl} alt={product.title} />
      </ThumbnailContainer>
      <MainImage src={product.imgUrl} alt={product.title}/>
    </GalleryContainer>

    <ProductInfoContainer>
      <ProductTitle>{product.title} {product.form} {product.color}</ProductTitle>
      <ProductDescription>{product.desc}</ProductDescription>

      <PriceAndCartContainer>
        <div>
          <ProductPrice>{product.price} ₽</ProductPrice>
          <ProductPrice>{product.count} м2</ProductPrice>
        </div>
        
      </PriceAndCartContainer>
      <div>
        <Button onClick={() => handleAddToCart(product)} >  В корзину</Button>
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
          isActive={activeTab === 'characteristics'}
          onClick={() => setActiveTab('characteristics')}
        >
          Характеристики
        </TabButton>
        <TabButton
          isActive={activeTab === 'reviews'}
          onClick={() => setActiveTab('reviews')}
        >
          Отзывы
        </TabButton>
      </TabsContainer>

      {activeTab === 'characteristics' ? (
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
    
  </ProductPageContainer>
    
  );
};