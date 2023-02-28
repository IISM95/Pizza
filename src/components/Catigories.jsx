import React from "react";

//Header вынесли в родительский что бы можно было использовать 
function Categories ({activeCategory,setActiveCategory}){
  
	
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
//return <li key={index} className={activeCategory === index ? "active" : ""} onClick={()=>setActiveCategory(index)}>{item}</li>
// выбор категории если  индекс равен activeIndes сделать его активным onClick передает  в стейт нажатый индекс 