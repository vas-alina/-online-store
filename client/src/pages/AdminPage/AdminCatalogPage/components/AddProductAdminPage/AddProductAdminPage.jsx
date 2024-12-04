import { useNavigate } from "react-router-dom";
import { Input, PrivateContent } from "../../../../../components";
import { request } from "../../../../../utils/request";
import { AddProductAdminContainer, FormField } from "./style"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../../../selectors";
import { checkAccess } from "../../../../../utils";
import { ROLE } from "../../../../../constans";
export const AddProductAdminPage = () => {
    const navigate = useNavigate(); 
    const userRole = useSelector(selectUserRole);
  
  const [roles, setRoles] = useState([])
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState({
      img_url: "",
      title: "",
      price: "",
      category: "",
      color: "",
      form: "",
      width: "",
      height: "",
      length: "",
      desc: "",
    });
  

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
          return;
        }
       request("/api/users/roles")
       .then(
          (rolesRes) => {
            if (rolesRes.error) {
              setError(rolesRes.error);
              return;
            }
            setRoles(rolesRes.data);
          }
        );
      }, [userRole]);
  
    const handleChange = (field, value) => {
      setProductData((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!checkAccess([ROLE.ADMIN], userRole)) {
        return;
      }
      try {
         const response = request('/api/products', 'POST', { product: productData });
  
        if (response.error) {
          setError(response.error);
        } else {
          navigate('/catalog'); 
        }
      } catch (error) {
        console.error('Ошибка при сохранении товара:', error);
        setError('Ошибка при сохранении товара');
      }
    };
  
    return (
        
      <AddProductAdminContainer>
          <PrivateContent access={[ROLE.ADMIN]} serverError={error}></PrivateContent>
      <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <Input
        width="95%"
        placeholder="Название"
        value={productData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <Input
        width="95%"
        placeholder="Картинка"
        value={productData.img_url}
        onChange={(e) => handleChange("img_url", e.target.value)}
      />
      <Input
        width="95%"
        placeholder="Цена"
        value={productData.price}
        onChange={(e) => handleChange("price", e.target.value)}
      />
     
      <Input
        width="95%"
        placeholder="форма"
        value={productData.form}
        onChange={(e) => handleChange("form", e.target.value)}
      />
     
      <Input
        width="95%"
        placeholder="Цвет"
        value={productData.color}
        onChange={(e) => handleChange("color", e.target.value)}
      />
     
      <Input
        width="95%"
        placeholder="Категория"
        value={productData.category}
        onChange={(e) => handleChange("category", e.target.value)}
      />
     
      <Input
        width="95%"
        placeholder="Ширина"
        value={productData.width}
        onChange={(e) => handleChange("width", e.target.value)}
      />
     
      <Input
        width="95%"
        placeholder="Высота"
        value={productData.height}
        onChange={(e) => handleChange("height", e.target.value)}
      />
     
     
      <Input
        width="95%"
        placeholder="Длина"
        value={productData.length}
        onChange={(e) => handleChange("length", e.target.value)}
      />
     
     
      <Input
        width="95%"
        placeholder="Описание"
        value={productData.desc}
        onChange={(e) => handleChange("desc", e.target.value)}
      />
     
      
      <button type="submit">Добавить</button>
      {error}
    </form>
  

      </AddProductAdminContainer>
    
  );
}