import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const { id } = useParams(); 
  const [pizza, setPizza] = React.useState<{
	imageUrl:string;
	title:string;
	price:number
  }>();

  const navigate = useNavigate()

  React.useEffect
    (() => {
      async function fetchpizza() {
        try {
          const { data } = await axios.get("https://63fa6b3d897af748dcced24c.mockapi.io/items/" + id);
          setPizza(data);
        } catch (error) {
			navigate('/') 
			alert('ошибка при получении пиццы')
		  }
      }
		fetchpizza();
    },[]);

	 if(!pizza) {
		return <>загрузка...</>
	 }
  return <div className="container">
	<img src={pizza.imageUrl} alt =""/>
	<h2>{pizza.title}</h2>
	<h4>{pizza.price}</h4>
  </div>;
};

export default FullPizza;

