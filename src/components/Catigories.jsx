import React from "react";


function Categories (){

const [activeIndes, setActiveIndes] = React.useState(0)

	const categories =["Все","Мясные","Вегетарианская","Гриль","Острые","Закрытые"]
	return (
		<div className="categories">
			  <ul>
			  {categories.map((item,index)=>{
				return <li key={index} className={activeIndes === index ? "active" : ""} onClick={()=>setActiveIndes(index)}>{item}</li>
			  })}
				 
			  </ul>
			</div>
	)
}
export default Categories