import React from "react";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { addContact,updateContact } from "../slices/contactSlice";

const ContactInput = ({update,setUpdate,contact,setContact,oldObj,setOldObj}) => {
  const allContacts = useSelector((state) => state.contacts.allContacts);
  const dispatch = useDispatch();
  const updateContactFunc = () => {
    if(contact.Number.length<5){
      return alert("Number Must Contain Atleast 5 Digits")
    }
    const numberExists = allContacts.findIndex(
      (obj) => obj.Number === contact.Number
    );
    // if He/She wanna change the number and the new number is already taken
    if (numberExists !== -1 && oldObj.Number!==contact.Number) {
      setUpdate(false);
      alert("Number Already Exists");
      return;
    }
    dispatch(updateContact({ oldObj, newObj: contact }));
  };
  const addContactFunc = () => {
    if(contact.Number.length<5){
      return alert("Number Must Contain Atleast 5 Digits")
    }
    const numberExists = allContacts.findIndex(
      (obj) => obj.Number === contact.Number
    );
    if (numberExists !== -1) {
      alert("Number Already Exists");
      return;
    }
    dispatch(addContact(contact));
  };
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit");
          }}
          className="w-[80%] h-max lg:h-16 gap-2 p-2 lg:gap-0 min-w-80 flex flex-col lg:flex-row justify-around items-center bg-yellow-400 rounded"
        >
          <input
            type="text"
            className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950"
            placeholder="Name"
            name="Name"
            value={contact.Name}
            onChange={(e) => {
              setContact((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <input
            type="number"
            className="focus:outline-none px-1 h-8 bg-gray-900 rounded focus:bg-gray-950 inputNum"
            placeholder="Number"
            name="Number"
            value={contact.Number}
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
            name="Address"
            value={contact.Address}
            onChange={(e) => {
              setContact((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <div
            type="submit"
            onClick={() => {
              if (!update) {
                addContactFunc();
                setContact({ Name: "", Number: "", Address: "" });
              } else {
                updateContactFunc();
                setUpdate(false);
                setContact({ Name: "", Number: "", Address: "" });
                setOldObj({ Name: "", Number: "", Address: "" });
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
