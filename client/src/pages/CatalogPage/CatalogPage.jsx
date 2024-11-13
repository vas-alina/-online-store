// import { useMemo, useEffect, useState } from "react";
// import { useServerRequest } from "../../hooks";
// import { Pagination, PostCard, Search } from "./components";
// import { PAGINATION_LIMIT } from "../../constans";
// import { debounce, getLastPageFromLinks } from "./utils";
// import styled from "styled-components";

// const CatalogPageContainer = ({ className }) => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [lastPage, setLastPage] = useState(2);
//   const [searchPhrase, setSearchPhrase] = useState("");
//   const [shouldSearch, setShouldSearch] = useState(false);
//   const requestServer = useServerRequest();

//   useEffect(() => {
//     requestServer("fetchProducts", searchPhrase, page, PAGINATION_LIMIT).then(
//       ({ res: { products, links } }) => {
//         setProducts(products);
//         setLastPage(getLastPageFromLinks(links));
//       }
//     );
//   }, [requestServer, page, shouldSearch]);

//   const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

//   const onSearch = ({ target }) => {
//     setSearchPhrase(target.value);
//     startDelayedSearch(!shouldSearch);
//   };

//   return (
//     <div className={className}>
//       <div className="posts-and-search">
//         <Search onChange={onSearch} searchPhrase={searchPhrase} />
//         {products.length > 0 ? (
//           <div className="post-list">
//             {products.map(
//               ({ id, title, imageUrl, desc, commentsCount }) => (
//                 <PostCard
//                   key={id}
//                   id={id}
//                   imageUrl={imageUrl}
//                   title={title}
//                   desc={desc}
//                   commentsCount={commentsCount}
//                 />
//               )
//             )}
//           </div>
//         ) : (
//           <div className="no-posts-found">Ничего не нашлось</div>
//         )}
//       </div>

//       {lastPage > 1 && products.length > 0 && (
//         <Pagination page={page} lastPage={lastPage} setPage={setPage} />
//       )}
//     </div>
//   );
// };

// export const CatalogPage = styled(CatalogPageContainer)`
//   display: flex;
//   justify-content: space-between;
//   flex-direction: column;

//   & .post-list {
//     display: flex;
//     flex-wrap: wrap;
//     padding: 20px 20px 80px;
//   }

//   & .no-posts-found {
//     font-size: 18px;
//     margin-top: 40px;
//     text-align: center;
//   }
// `;
// const [activeSection, setActiveSection] = useState('allProducts');

//         const renderContent = () => {
//           switch (activeSection) {
//             case 'pavingSlabs':
//               return <PavingSlabs />;
//             case 'borders':
//               return <Borders />;
//             case 'lawnGrate':
//               return <LawnGrate />;
//             case 'allProducts':
//             default:
//               return <AllProducts />;
//           }
//         };
      
//         return (
//           <Container>
//             <Sidebar>
//               <MenuItem active={activeSection === 'pavingSlabs'} onClick={() => setActiveSection('pavingSlabs')}>
//                 Тротуарная плитка
//               </MenuItem>
//               <MenuItem active={activeSection === 'borders'} onClick={() => setActiveSection('borders')}>
//                 Бордюры
//               </MenuItem>
//               <MenuItem active={activeSection === 'lawnGrate'} onClick={() => setActiveSection('lawnGrate')}>
//                 Газонная решетка
//               </MenuItem>
//             </Sidebar>
//             <Content>{renderContent()}</Content>
//           </Container>
//         );

import { useState } from 'react';
import { ProductList } from './components/product-list/ProductList';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f2f2f2;
  padding: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const MenuItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? 'blue' : 'black')};
`;

export const CatalogPage = () => {
  const [activeSection, setActiveSection] = useState('allProducts');

  const renderContent = () => {
    switch (activeSection) {
      case 'pavingSlabs':
        return <ProductList category="pavingSlabs" title="Тротуарная плитка" />;
      case 'borders':
        return <ProductList category="borders" title="Бордюры" />;
      case 'lawnGrate':
        return <ProductList category="lawnGrate" title="Газонная решетка" />;
      case 'allProducts':
      default:
        return <ProductList title="Все товары" />;
    }
  };

  return (
    <Container>
      <Sidebar>
        <MenuItem
          active={activeSection === 'allProducts'}
          onClick={() => setActiveSection('allProducts')}
        >
          Все товары
        </MenuItem>
        <MenuItem
          active={activeSection === 'pavingSlabs'}
          onClick={() => setActiveSection('pavingSlabs')}
        >
          Тротуарная плитка
        </MenuItem>
        <MenuItem
          active={activeSection === 'borders'}
          onClick={() => setActiveSection('borders')}
        >
          Бордюры
        </MenuItem>
        <MenuItem
          active={activeSection === 'lawnGrate'}
          onClick={() => setActiveSection('lawnGrate')}
        >
          Газонная решетка
        </MenuItem>
      </Sidebar>
      <Content>{renderContent()}</Content>
    </Container>
  );
};

