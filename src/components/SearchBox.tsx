import React, { useState } from "react";
import Loading from "./Loading";

export type Option = {
  key: number;
  value: string;
};

interface SearchBoxProps {
  options: Option[];
  loading?: boolean;
  error?: boolean;
  onChange?: (value: string) => void;
  onSelect?: (option: Option) => void;
}

const SearchBox = ({
  options,
  loading = false,
  error = false,
  onChange,
  onSelect,
}: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [cursor, setCursor] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setCursor(0);

    if (!value) {
      setIsOpen(false);
      return;
    }

    onChange && onChange(value);
    setIsOpen(true);
  };

  const handleSelectOption = (option: Option) => {
    setInputValue(option.value);
    setIsOpen(false);
    onSelect && onSelect(option);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        cursor > 0 && setCursor((prev) => prev - 1);
        break;
      case "ArrowDown":
        cursor < options.length - 1 && setCursor((prev) => prev + 1);
        break;
      case "Enter":
        handleSelectOption(options[cursor]);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      // We don't need a default case
    }
  };

  return (
    <div className="w-full flex flex-col items-start relative bg-cyan-800 border-slate-600 py-6 px-6 rounded-xl h-36">
      <label className="mb-2 text-white font-semibold">Location</label>
      <input
        className="focus:ring-2 focus:ring-blue-300 focus:outline-none appearance-none w-80 text-sm leading-6 text-white placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-400 shadow-sm"
        type="text"
        placeholder="Search for a location..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {error && (
        <div className="text-red-500 mt-2 text-sm">
          Something went wrong! Please, try again.
        </div>
      )}
      {isOpen && !error && (
        <ul className="absolute z-10 top-20 mt-5 w-80 bg-gray-400 border-black py-2 px-4 rounded-lg text-left text-gray-700">
          {!loading &&
            options.map((option, key) => (
              <li
                tabIndex={-1}
                role="option"
                className={`my-2 px-2 cursor-pointer ${
                  key === cursor && "bg-slate-200 rounded-md"
                }`}
                key={option.key}
                onClick={() => handleSelectOption(option)}
              >
                <span>{option.value}</span>
              </li>
            ))}

          {!loading && options.length === 0 && <li>No options</li>}
          <Loading isLoading={loading} />
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
