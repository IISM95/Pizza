import React from 'react';
import Categories from '../components/Catigories';
import Sort from '../components/Sort';
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";


const Home = () => {

	const [items, setItams] = React.useState([]);
	const [isLoading, setIsLoading ]= React.useState(true);
 
	React.useEffect(() => {
	  fetch("http://localhost:3000/pizza")
		 .then((res) => {
			return res.json();
		 })
		 .then((arr) => {
			setItams(arr);
			setIsLoading(false)
		 });
		 window.scrollTo(0,0) // когда с другой страницы перехожу в эту то окаваюсь вверху
	},[]);
	return (
		<>
			  <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content_items">
				{
					//если идет загрузка создаем новый массив из 6 undefined и заменем их на скелетоны если нет то отоброжаем пиццы
					isLoading ? [...new Array(8)].map((_,index) => <Skeleton key={index}/>) : items.map(i => <PizzaBlock key={i._id} {...i} />) 
				}
          </div>
		</>
	);
};

export default Home;