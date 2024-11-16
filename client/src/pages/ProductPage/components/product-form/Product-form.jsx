import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Icon, Input } from "../../../../components";
import { saveProductAsync } from "../../../../action";
import { SpecialPanel } from "../special-panel/Special-panel";
import { sanitazeContent } from "./utils";
import { useServerRequest } from "../../../../hooks";
import { useNavigate } from "react-router";
import { PROP_TYPE } from "../../../../constans";

const ProductFormContainer = ({
  className,
  product: { id, title, imgUrl, content, publishedAt },
}) => {
  const [imgUrlvalue, setImageUrlvalue] = useState(imgUrl);
  const [titlevalue, setTitlevalue] = useState(title);

  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlvalue(imgUrl);
    setTitlevalue(title);
  }, [imgUrl, title]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const onSave = () => {
    const newContent = sanitazeContent(contentRef.current.innerHTML);

    dispatch(
      saveProductAsync(requestServer, {
        id,
        imgUrl: imgUrlvalue,
        title: titlevalue,
        content: newContent,
      })
      //TODO: исправлен продукт на продуктс
    ).then(({ id }) => navigate(`/products/${id}`));
  };
  const onImageChange = ({ target }) => setImageUrlvalue(target.value);
  const onTitleChange = ({ target }) => setTitlevalue(target.value);
  return (
    <div className={className}>
      <Input
        value={imgUrlvalue}
        placeholder="Изображение..."
        onChange={onImageChange}
      />
      <Input
        value={titlevalue}
        placeholder="Заголовок..."
        onChange={onTitleChange}
      />
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={
          <Icon
            id="fa-floppy-o"
            size="21px"
            margin="0 10px 0 0"
            onClick={onSave}
          />
        }
      />
      <div
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="product-text"
      >
        {content}
      </div>
    </div>
  );
};

export const ProductForm = styled(ProductFormContainer)`
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }
  & .product-text {
    min-height: 80px;
    border: 1px solid #000;
    font-size: 18px;
    white-space: pre-line;
  }
`;
ProductFormContainer.propTypes = {
  product: PROP_TYPE.POST.isRequired,
};
