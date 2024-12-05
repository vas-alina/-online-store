import { useEffect, useLayoutEffect, useState } from "react";
import { loadProductAsync, saveProductAsync } from "../../../../action";
import {
  ProductCardPageContainer,
  ProductPageMainContainer,
} from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "../../../../components";

export const ProductCartForm = ({
  product: { id, imgUrl, title, color, form, desc, price },
}) => {
  const [imgUrlvalue, setImgUrlvalue] = useState(imgUrl);
  const [titlevalue, setTitlevalue] = useState(title);
  const [colorvalue, setColorvalue] = useState(color);
  const [formvalue, setFormvalue] = useState(form);
  const [pricevalue, setPricevalue] = useState(price);
  const [descvalue, setDescvalue] = useState(desc);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setIsLoading(true);
    dispatch(loadProductAsync(id))
      .then((data) => {
        console.log("Данные загружены:", data);
        setImgUrlvalue(imgUrl);
        setTitlevalue(title);
        setColorvalue(color);
        setFormvalue(form);
        setPricevalue(price);
        setDescvalue(desc);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [id, dispatch, imgUrl, title, color, form, price, desc]);

  const onSave = () => {
    dispatch(
      saveProductAsync(id, {
        imgUrl: imgUrlvalue,
        title: titlevalue,
        color: colorvalue,
        form: formvalue,
        desc: descvalue,
        price: pricevalue,
      })
    ).then((updatedProduct) => {
      console.log(updatedProduct);
      navigate(`/products/${id}`);
    });
  };
  const onImgChange = ({ target }) => setImgUrlvalue(target.value);
  const onTitleChange = ({ target }) => setTitlevalue(target.value);
  const onColorChange = ({ target }) => setColorvalue(target.value);
  const onFormChange = ({ target }) => setFormvalue(target.value);
  const onDescChange = ({ target }) => setDescvalue(target.value);
  const onPriceChange = ({ target }) => setPricevalue(target.value);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ProductCardPageContainer>
      <ProductPageMainContainer>
        <Input
          width="95%"
          placeholder="картинка"
          value={imgUrlvalue}
          onChange={onImgChange}
        />

        <Input
          width="95%"
          placeholder="Заголовок"
          value={titlevalue}
          onChange={onTitleChange}
        />
        <Input
          width="95%"
          placeholder="Форма"
          value={formvalue}
          onChange={onFormChange}
        />

        <Input
          width="95%"
          placeholder="Цвет"
          value={colorvalue}
          onChange={onColorChange}
        />

        <Input
          width="95%"
          placeholder="Описание"
          value={descvalue}
          onChange={onDescChange}
        />

        <Input
          width="95%"
          placeholder="Цена"
          value={pricevalue}
          onChange={onPriceChange}
        />

        <Button onClick={onSave}> Сохранить изменения</Button>
      </ProductPageMainContainer>
    </ProductCardPageContainer>
  );
};
