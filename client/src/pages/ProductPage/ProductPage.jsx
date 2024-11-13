import { useEffect, useLayoutEffect, useState } from "react";
import { useMatch, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Comments, ProductContent, ProductForm } from "./components";
import { PrivateContent } from "../../components";
import { useServerRequest } from "../../hooks";
import { selectProduct } from "../../selectors";
import { RESET_PRODUCT_DATA, loadProductAsync } from "../../action";
import styled from "styled-components";
import { ROLE } from "../../constans";
import { Error } from './../../components/error/Error';

const ProductContainer = ({ className }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const isCreating = !!useMatch("/products");
  const isEditing = !!useMatch("/products/:id/edit");
  const requestServer = useServerRequest();
  const product = useSelector(selectProduct);

  useLayoutEffect(() => {
    dispatch(RESET_PRODUCT_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }

    dispatch(loadProductAsync(requestServer, params.id)).then((productData) => {
      setError(productData.error);
      setIsLoading(false);
    });
  }, [dispatch, requestServer, params.id, isCreating]);

  if (isLoading) {
    return null;
  }

  const SpecificProductPage =
    isCreating || isEditing ? (
      <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
        <div className={className}>
          <ProductForm products={product} />
        </div>
      </PrivateContent>
    ) : (
      <div className={className}>
        <ProductContent products={product} />
        <Comments comments={product.comments} productId={product.id} />
      </div>
    );
  return error ? <Error error={error} /> : SpecificProductPage;
};

export const Product = styled(ProductContainer)`
  margin: 40px 0;
  padding: 0px 80px;
`;
