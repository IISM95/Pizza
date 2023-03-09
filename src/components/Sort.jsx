import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../app/slice/filterSlice";
//Header вынесли в родительский что бы иеть доступ в Categories

export const list = [
  { name: "популярности(DESC)", sortProperty: "rating" },
  { name: "популярности(ASC)", sortProperty: "-rating" },
  { name: "цена(DESC)", sortProperty: "price" },
  { name: "цена(ASC)", sortProperty: "-price" },
  { name: "алфавиту(DESC)", sortProperty: "title" },
  { name: "алфавиту(ASC)", sortProperty: "-title" },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filterSlice.sort);

  //открыть ||  закрыть популярности
  const [sortOpen, SetSortOpen] = React.useState(false);

  //что бы сортировка закрывалась если нажму где угодно на странице
  const sortRef = React.useRef();

  const onClickPopulate = (obj) => {
    dispatch(setSort(obj));
    SetSortOpen(false);
  };

  //если не было клика по сортировке а был в другом месте сайта, то закрыть окно сортировки return внизу делает unmount
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        SetSortOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => SetSortOpen(!sortOpen)}>{sort.name}</span>
      </div>

      {sortOpen && (
        <div className="sort__popup">
          <ul>
            {list.map((i, index) => (
              <li
                className={sort.sortProperty === i.sortProperty ? "active" : ""}
                key={index}
                onClick={() => onClickPopulate(i)}
              >
                {i.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Sort;
//{list.map((i,index)=><li className={activePopularity === index ? 'active' : ""} key={index} onClick={()=>onClickPopulate(index)}>{i}</li>)}
//выбор попуряности если  индекс равен activeIndes сделать его активным onClick передает  в стейт нажатый индекс
