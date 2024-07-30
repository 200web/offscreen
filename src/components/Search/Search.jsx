import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
// import { setSearchValue } from "../../Redux/filterSlice";
// import { useDispatch } from "react-redux";

// function Categories({ value, OnClickCategory })
const Search = ({ value, onChange, placeholder }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  // const [value, setValue] = React.useState();
  // const dispatch = useDispatch();
  // const inputRef = React.useRef();
  // const onClickClear = () => {
  //   dispatch(setSearchValue(""));
  //   setValue("");
  //   inputRef.current.focus();
  // };

  // const updateSearchValue = React.useCallback(
  //   debounce((str) => {
  //     dispatch(setSearchValue(str));
  //   }, 300),
  //   []
  // );
  // const onChangeSearch = (event) => {
  //   setValue(event.target.value);
  //   updateSearchValue(event.target.value);
  // };

  return (
    <div className={styles.root}>
      <input
        // ref={inputRef}
        // value={value}
        // onChange={onChangeSearch}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
      {/* {value && (
        <svg
          // onClick={onClickClear}
          className={styles.cancel}
          data-name="Capa 1"
          id="Capa_1"
          viewBox="0 0 20 19.84"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
        </svg>
      )} */}
    </div>
  );
};

export default Search;
