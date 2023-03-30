import React from "react";


type CategoriesProps = {
	activeCategory: number;
	setActiveCategory: (i: number) => void  
}


const Categories: React.FC<CategoriesProps> = React.memo(({activeCategory,setActiveCategory})=>{

	const categories =["Все","Мясные","Вегетарианская","Гриль","Острые","Закрытые"]

	return (
		<div className="categories">
			  <ul>
			  {categories.map((item,index)=>{
				return <li key={index} className={activeCategory === index ? "active" : ""} onClick={()=>setActiveCategory(index)}>{item}</li>
			  })}
				 
			  </ul>
			</div>
	)
})
export default Categories
