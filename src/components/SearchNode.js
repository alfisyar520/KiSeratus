import { React } from 'react';

const SearchNode = ({
  name,
  value,
  placeholder,
  onChange,
  selectPrevMatch,
  selectNextMatch,
  disabledNextBtn,
  disabledPrevBtn
}) => {
  const styledInputSearch = {
    outline: 0,
    borderWidth: "0 0 2px",
    borderColor: "#19A7CE",
  };

  const styledPrevBtn = {
    margin: "5px",
    padding: "6px 12px",
    backgroundColor: disabledPrevBtn ? "#9bd8e9" : "#19A7CE",
    color: "#fff",
    border: "none",
  };

  const styledNextBtn = {
    margin: "5px",
    padding: "6px 12px",
    backgroundColor: disabledNextBtn ? "#9bd8e9" : "#19A7CE",
    color: "#fff",
    border: "none",
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label htmlFor="find-box">
        Search:&nbsp;
        <input
          name={name}
          type="text"
          value={value != null ? value : ""}
          onChange={onChange}
          placeholder={placeholder ?? "Name"}
          style={styledInputSearch}
        />
      </label>
      <button
        type="button"
        style={styledPrevBtn}
        disabled={disabledPrevBtn}
        onClick={selectPrevMatch}
      >
        &lt;
      </button>

      <button
        type="button"
        style={styledNextBtn}
        disabled={disabledNextBtn}
        onClick={selectNextMatch}
      >
        &gt;
      </button>
    </div>
  );
};
export default SearchNode;
