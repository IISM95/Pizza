import React from "react";


function Categories (){
// выбор категории если  индекс равен activeIndes сделать его активным onClick передает  в стейт нажатый индекс
const [activeCategory, setActiveCategory] = React.useState(0)

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
}
export default Categories