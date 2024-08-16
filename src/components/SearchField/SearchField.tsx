import { useState } from "react";

import "./SearchField.scss";

interface Props {
  onSubmitClick: (inputValue: string) => void;
  onResetClick: () => void;
}

export default function SearchField({ onSubmitClick, onResetClick }: Props) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="search-field">
      <input
        className="search-field__input"
        type="text"
        value={searchValue}
        placeholder="Some name (case sensitive)"
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <button
        className="search-field__button"
        onClick={() => onSubmitClick(searchValue)}
      >
        Search
      </button>
      <button
        className="search-field__button search-field__button--outline"
        onClick={() => {
          setSearchValue("");
          onResetClick();
        }}
      >
        Reset
      </button>
    </div>
  );
}
