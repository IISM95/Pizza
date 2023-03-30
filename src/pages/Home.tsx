import React from "react";
import Categories from "../components/Catigories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  
} from "../app/slice/filter/slice";
import qs from "qs";
import { fetchPizzas, SearchPizzaParams } from "../app/slice/pizzaSlice";
import { RootState, useAppDispatch } from "../app/store";

const Home:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false); 
  const isMounted = React.useRef(false); 


 
  const { categoryId, sort, currentPage , serchValue} = useSelector(
    (state:RootState) => state.filterSlice
  );
  const { items, status } = useSelector((state:RootState) => state.pizzaSlice);

  const onChangeCategory =React.useCallback( (id:number) => {
	dispatch(setCategoryId(id));
 }, []
)
  const onChangePage = (page:number) => {
    dispatch(setCurrentPage(page));
  };

  const filteredItems = items.filter((item:any) =>
    item.title.toLowerCase().includes(serchValue.toLowerCase())
  );
 
  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = serchValue ? `search=${serchValue}` : ""; 
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage:String(currentPage),
      })
    );
  };


//   React.useEffect(() => {
//     if (isMounted.current) {
//       const qeryString = qs.stringify({
//         sortProperty: sort.sortProperty,
//         categoryId,
//         currentPage,
//       });
//       navigate(`?${qeryString}`);
//     }
//     isMounted.current = true;
//   }, [sort.sortProperty, categoryId, currentPage]);

//   React.useEffect(() => {
//     if (window.location.search) {
//       const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
//       const sort = list.find((obj) => obj.sortProperty === params.sortBy);
	
//       dispatch(setFilters({ 
// 			serchValue: params.search,
// 			categoryId:Number(params.category),
// 			currentPage: Number(params.currentPage),
// 			sort: sort ? sort : list
// 		 }));
//       isSearch.current = true; 
//     }
//   }, [dispatch]);

  
  React.useEffect(() => {
    window.scrollTo(0, 0); 
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [sort.sortProperty, categoryId, serchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          activeCategory={categoryId}
          setActiveCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            произошла ошибка загрузки <span>😕</span>
          </h2>
          <p>К сожалению, не удалось загрузить питцы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content_items">
          {
            status === "loading"
              ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
              : filteredItems.map((i:any) =>
				   <PizzaBlock  key={i.id} {...i} />    
                )
          }
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;