import React from "react";
import Categories from "../components/Catigories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  
} from "../app/slice/filterSlice";
import qs from "qs";
import { fetchPizzas } from "../app/slice/pizzaSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false); 
  const isMounted = React.useRef(false); 
 
  const { categoryId, sort, currentPage , serchValue} = useSelector(
    (state) => state.filterSlice
  );
  const { items, status } = useSelector((state) => state.pizzaSlice);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };



  const filteredItems = items.filter((item) =>
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
        currentPage,
      })
    );
  };

  
  React.useEffect(() => {
    if (isMounted.current) {
      const qeryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${qeryString}`);
    }
    isMounted.current = true;
  }, [sort.sortProperty, categoryId, currentPage]);


  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortlist = list.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFilters({ ...params, sortlist }));
      isSearch.current = true; 
    }
  }, []);


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
          items={items}
          activeCategory={categoryId}
          setActiveCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            произошла ошибка загрузки <icon>😕</icon>
          </h2>
          <p>К сожалению, не удалось загрузить питцы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content_items">
          {
    
            status === "loading"
              ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
              : filteredItems.map((i) => <Link to={`/pizza/${i.id}`} key={i.id}> 
				   <PizzaBlock  {...i} />
				  </Link> 
                 
                )
          }
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;

