import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteContact } from "../slices/contactSlice";

const Contact = ({ data, setUpdate, setOldObj, setContact }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-[80%] h-max lg:h-16 gap-2 p-2 lg:gap-0 min-w-80 flex flex-col lg:flex-row justify-around items-center bg-indigo-500 rounded">
        <p className="lg:w-[28%]">{data?.Name}</p>
        <p className="lg:w-[28%]">{data?.Number}</p>
        <p className="lg:w-[28%]">{data?.Address}</p>
        <div className="flex">
          <div
            className="px-1 cursor-pointer"
            onClick={() => {
              setUpdate(true);
              setOldObj(data);
              setContact(data);
            }}
          >
            <AiOutlineEdit className="w-7 h-7 bg-yellow-500 rounded p-1 hover:bg-yellow-600" />
          </div>
          <div
            onClick={() => {
              dispatch(deleteContact(data));
              setUpdate(false);
            }}
            className="px-1 cursor-pointer"
          >
            <AiOutlineDelete className="w-7 h-7 bg-red-500 rounded p-1 hover:bg-red-600" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
