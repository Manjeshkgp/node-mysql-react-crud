import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteContact } from "../slices/contactSlice";

const Contact = ({ data, setUpdate, setOldObj, setContact }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-[80%] h-max lg:h-16 gap-2 p-2 lg:gap-0 min-w-80 flex flex-col lg:flex-row justify-around items-center bg-indigo-500 rounded">
        <p className="lg:w-[28%]">{data?.full_name}</p>
        <p className="lg:w-[28%]">{data?.job_title}</p>
        <p className="lg:w-[28%]">{data?.phone}</p>
        <div className="flex">
          <div
            className="px-1 cursor-pointer"
            onClick={() => {
              setUpdate(true);
              setOldObj({...data,contact_id1:data.Contacts[0].contact_id,contact_id2:data.Contacts[1].contact_id,
                contactName1: data.Contacts[0].name,
                contactPhone1: data.Contacts[0].contact_phone,
                contactRelation1: data.Contacts[0].relatioship,
                contactName2: data.Contacts[1].name,
                contactPhone2: data.Contacts[1].contact_phone,
                contactRelation2: data.Contacts[1].relatioship
              });
              setContact({...data,contact_id1:data.Contacts[0].contact_id,contact_id2:data.Contacts[1].contact_id,
                contactName1: data.Contacts[0].name,
                contactPhone1: data.Contacts[0].contact_phone,
                contactRelation1: data.Contacts[0].relationship,
                contactName2: data.Contacts[1].name,
                contactPhone2: data.Contacts[1].contact_phone,
                contactRelation2: data.Contacts[1].relationship
              });
            }}
          >
            <AiOutlineEdit className="w-7 h-7 bg-yellow-500 rounded p-1 hover:bg-yellow-600" />
          </div>
          <div
            onClick={async() => {
              const res = await fetch(`http://localhost:4000/employees/${data?.employee_id}`,{
                method:"DELETE"
              });
              if(res.status===200){
              dispatch(deleteContact(data));
              setUpdate(false);}
            }}
            className="px-1 cursor-pointer"
          >
            <AiOutlineDelete className="w-7 h-7 bg-red-500 rounded p-1 hover:bg-red-600" />
          </div>
        </div>
        <p>{}</p>
      </div>
    </>
  );
};

export default Contact;
