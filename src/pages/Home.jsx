import React from 'react';
import Categories from '../components/Catigories';
import Sort from '../components/Sort';
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import AppContext from "../context";


const Home = () => {

	const [items, setItams] = React.useState([]);
	const [isLoading, setIsLoading ]= React.useState(true);
	
	//для Categories логика категории
   const [activeCategory, setActiveCategory] = React.useState(0)

	//для Sort логика сортировка
	const [activePopularity, setActivePopularityy] = React.useState({
		name: 'популярности',
		sortProperty: 'rating'
	})
 

	const { searchValu } = React.useContext(AppContext);
	const filteredItems = items.filter((item)=> item.title.toLowerCase().includes(searchValu.toLowerCase()))
	
	// let proba = activePopularity.name === "популярности"
	// console.log(proba);

// //если activePopularity категория пиццы  0(false) то вернивсе пиццы а так id всех пицц сравнивается с id который нажат
// const filtered = items.filter((item) => {  
// 	if(!activeCategory){
// 		return true
// 	}
// 	return item.category === activeCategory
// })


//
	React.useEffect(() => {
		setIsLoading(true)

		const order = activePopularity.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = activePopularity.sortProperty.replace('-','');
		const category= activeCategory > 0 ? `category=${activeCategory}` : ''

	  fetch(`https://63fa6b3d897af748dcced24c.mockapi.io/items?${category }&& sortBy=${sortBy}&&order=${order}`)
		 .then((res) => {
			return res.json();
		 })
		 .then((arr) => {
			setItams(arr);
			setIsLoading(false)
		 });
		 window.scrollTo(0,0) // когда с другой страницы перехожу в эту то окаваюсь вверху
	},[activePopularity,activeCategory]);
	return (
		<>
			  <div className="content__top">
            <Categories items={items} activeCategory={activeCategory} setActiveCategory={(i)=>setActiveCategory(i)}/>
            <Sort activePopularity={activePopularity} setActivePopularityy={(i)=>setActivePopularityy(i)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content_items">
				{
					//если идет загрузка создаем новый массив из 6 undefined и заменем их на скелетоны если нет то отоброжаем пиццы
					isLoading ? [...new Array(8)].map((_,index) => <Skeleton key={index}/>) : filteredItems.map((i,index) => <PizzaBlock key={index} {...i} />) 
				}
          </div>
		</>
	);
};

export default Home;

//setActiveCategory={(i)=>setActiveCategory(i)} когда в Catigories мы  выбираем категорию i передается через пропс в эту функцию