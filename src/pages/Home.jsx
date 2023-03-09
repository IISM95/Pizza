import React from "react";
import Categories from "../components/Catigories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import AppContext from "../context";
import Pagination from "../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
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
  const isSearch = React.useRef(false); //нужен для проверки useEffect если в парамсах есть что то то не делать 2 запроса на бек
  const isMounted = React.useRef(false); // нужен что бы когда первый раз рендарем то в url не вписывал http://localhost:3001/?sortProperty=rating&categoryId=0& //а оставлял http://localhost:3001/

  ///////// сортировка по категориям1111 //12:55
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const { items, status } = useSelector((state) => state.pizzaSlice);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // поиск пицц
  const { searchValu } = React.useContext(AppContext);
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchValu.toLowerCase())
  );

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValu ? `search=${searchValu}` : ""; //поиск на беке
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

  // вот этот в вверх в url передает данные в верху сайта 15 видео 2) если был первый рендер то только тогда  нужно  вшивать параметры в url
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

  //делаем что бы страница при обновлении не пропадала 15 видео //1)если был 1 рендер то проверяем URL-параметры и сохраняем в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortlist = list.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFilters({ ...params, sortlist }));
      isSearch.current = true; //до того как выполниться основной useEffect внизу, смотрим что в парамсах а потом внизу запускает функцию fetchPizzas
    }
  }, []);

  // если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0); // когда с другой страницы перехожу в эту то окаваюсь вверху
    if (!isSearch.current) {
      //если у нас нет поиска !isSearch.current=true
      getPizzas();
    }
    isSearch.current = false;
  }, [sort.sortProperty, categoryId, searchValu, currentPage]);

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
            //если идет загрузка создаем новый массив из 6 undefined и заменем их на скелетоны если нет то отоброжаем пиццы
            status === "loading"
              ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
              : filteredItems.map((i, index) => (
                  <PizzaBlock key={index} {...i} />
                ))
          }
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;

//setActiveCategory={(i)=>setActiveCategory(i)} когда в Catigories мы  выбираем категорию i передается через пропс в эту функ

//    axios.get(
// 	`https://63fa6b3d897af748dcced24c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
// 	)
// 	.then((res)=>{
// 		setItams(res.data)
// 		setIsLoading(false)
// 	})
