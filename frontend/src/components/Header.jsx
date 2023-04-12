import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "./Button";
const Header = ({setShowSorted,showSorted,search, setSearch}) => {
  return (
    <>
      <div className="h-12 flex justify-center gap-4 items-center bg-yellow-400 text-gray-200">
        <div className="flex w-max bg-gray-950 rounded group">
          <AiOutlineSearch className="w-8 h-8 group-focus-within:hidden" />
          <input
            className="focus:outline-none bg-transparent h-8 px-1"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div onClick={()=>setShowSorted(!showSorted)}><Button>{showSorted?"Reset":"Sort By Name"}</Button></div>
      </div>
    </>
  );
};

export default Header;
