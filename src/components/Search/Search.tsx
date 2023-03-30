import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSerchValue } from "../../app/slice/filter/slice";


const Search:React.FC = () => {
  const dispatch =useDispatch()


  const [value, setValue] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
	dispatch(setSerchValue(''))
	setValue("")
    inputRef.current?.focus();
  };

  const onChangeInput = React.useCallback(debounce((str:string) => {  
	dispatch(setSerchValue(str)) ;
  }, 500),[]);

  const handleText = (event:React.ChangeEvent<HTMLInputElement>) => {
	setValue(event.target.value);
	onChangeInput(event.target.value)
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
        <path d="M0 0h48v48H0z" fill="none" />
      </svg>
      <input
        ref={inputRef}
        placeholder="Поиск пиццы..."
        value={value}
        onChange={handleText}
        className={styles.input}
      />
      {value && (
        <svg
          className={styles.clear}
          onClick={onClickClear}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
