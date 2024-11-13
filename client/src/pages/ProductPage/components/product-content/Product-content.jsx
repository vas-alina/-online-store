import styled from "styled-components";
import { H2, Icon } from "../../../../components";
import { SpecialPanel } from "../special-panel/Special-panel";
import { useNavigate } from "react-router";
import { PROP_TYPE } from "../../../../constans";

const ProductContentContainer = ({
  className,
  product: { id, title, imageUrl, content, publishedAt },
}) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <img src={imageUrl} alt={title} />
      <H2>{title}</H2>
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="-20px 0 20px"
        editButton={
          <Icon
            id="fa-pencil-square-o"
            margin="0 20px 0 0"
            size="21px"
           // TODO: исправлен product на products
            onClick={() => navigate(`/products/${id}/edit`)}
          />
        }
      />
      <div className="product-text">{content}</div>
    </div>
  );
};

export const ProductContent = styled(ProductContentContainer)`
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }
  & .product-text {
    font-size: 18px;
    white-space: pre-line;
  }
`;
ProductContentContainer.propTypes = {
  product: PROP_TYPE.POST.isRequired,
};
