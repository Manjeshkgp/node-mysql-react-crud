import React from "react";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { addContact, updateContact } from "../slices/contactSlice";

const ContactInput = ({
  update,
  setUpdate,
  contact,
  setContact,
  oldObj,
  setOldObj,
}) => {
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const dispatch = useDispatch();
  const updateContactFunc = async() => {
    const res = await fetch(`http://localhost:4000/employees/${oldObj.employee_id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(contact)
    })
    const msg = await res.json();
    if(res.status===200){
    dispatch(updateContact({ oldObj, contact }));
    }else{
      alert(msg)
    }
  };
  const addContactFunc = async () => {
    const res = await fetch(`http://localhost:4000/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    const msg = await res.json();
    if (res.status === 200) {
      const res2 = await fetch(
        `http://localhost:4000/employees/${msg.employee_id}`
      );
      if (res2.status === 200) {
        const data = await res2.json();
        dispatch(addContact(data[0]));
      }
    }
  };
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit");
          }}
          className="w-[80%] h-max lg:h-96 gap-2 p-2 lg:gap-0 min-w-80 flex flex-col lg:flex-row justify-around items-center bg-yellow-400 rounded"
        >
          <div className="flex w-[90%] lg:w-[28%] flex-col gap-4">
            <input
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="Full Name"
              name="full_name"
              value={contact.full_name}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950 inputNum"
              placeholder="Email"
              name="email"
              value={contact.email}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="Job Title"
              name="job_title"
              value={contact.job_title}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="Phone"
              name="phone"
              value={contact.phone}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="Address"
              name="address"
              value={contact.address}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="City"
              name="city"
              value={contact.city}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="State"
              name="state"
              value={contact.state}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex w-[90%] lg:w-[28%] flex-col gap-4">
            <input
              
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="Primary Emergency Contact Name"
              name="contactName1"
              value={contact.contactName1}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950 inputNum"
              placeholder="Number"
              name="contactPhone1"
              value={contact.contactPhone1}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="Relationship"
              name="contactRelation1"
              value={contact.contactRelation1}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex w-[90%] lg:w-[28%] flex-col gap-4">
            <input
              
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="Secondary Emergency Contact Name"
              name="contactName2"
              value={contact.contactName2}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950 inputNum"
              placeholder="Number"
              name="contactPhone2"
              value={contact.contactPhone2}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
            <input
              
              type="text"
              className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
              placeholder="Relationship"
              name="contactRelation2"
              value={contact.contactRelation2}
              onChange={(e) => {
                setContact((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </div>
          <div
            type="submit"
            onClick={() => {
              if (!update) {
                addContactFunc();
                setContact({
                  full_name: "",
                  email: "",
                  job_title: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  contactName1: "",
                  contactPhone1: "",
                  contactRelation1: "",
                  contactName2: "",
                  contactPhone2: "",
                  contactRelation2: "",
                });
              } else {
                updateContactFunc();
                setUpdate(false);
                setContact({
                  full_name: "",
                  email: "",
                  job_title: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  contactName1: "",
                  contactPhone1: "",
                  contactRelation1: "",
                  contactName2: "",
                  contactPhone2: "",
                  contactRelation2: "",
                });
                setOldObj({
                  full_ame: "",
                  email: "",
                  job_title: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  contactName1: "",
                  contactPhone1: "",
                  contactRelation1: "",
                  contactName2: "",
                  contactPhone2: "",
                  contactRelation2: "",
                });
              }
            }}
          >
            <Button>{update ? "Update" : "Add"}</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactInput;
