import React, { useEffect } from "react";
import Header from "./components/Header";
import ContactInput from "./components/ContactInput";
import Contact from "./components/Contact";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAll } from "./slices/contactSlice";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.allContacts);
  const sortedContacts = useSelector((state) => state.contacts.sortedContacts);
  const [searchedContacts,setSearchedContacts] = useState([...sortedContacts]);
  const [update, setUpdate] = useState(false);
  const [showSorted, setShowSorted] = useState(false);
  const [search, setSearch] = useState("");
  const [contact, setContact] = useState({
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
  const [oldObj, setOldObj] = useState({
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
  const getAllEmployee = async() => {
    const res = await fetch(`http://localhost:4000/employees/all`);
    const data = await res.json()
    console.log(data)
    if(res.status===200){
      dispatch(addAll(data));
    }
  }
  function searchArray() {
    // Convert the searchText to lowercase for case-insensitive search
    let searchText = search.toLowerCase();

    const result = sortedContacts.filter(obj => {
      const name = obj.full_name.toLowerCase();
      const number = obj.phone.toLowerCase();
      return name.includes(searchText) || number.includes(searchText);
    });
    
    setSearchedContacts(result)
  }

  useEffect(()=>{
    searchArray()
  },[search])
  
  useEffect(()=>{
    getAllEmployee()
  },[])

  return (
    <>
      <Header
        setShowSorted={setShowSorted}
        showSorted={showSorted}
        search={search}
        setSearch={setSearch}
      />
      <div className="h-max my-6 flex justify-center items-center">
        <ContactInput
          update={update}
          setUpdate={setUpdate}
          contact={contact}
          setContact={setContact}
          oldObj={oldObj}
          setOldObj={setOldObj}
        />
      </div>
      <div className="h-max my-6 flex flex-col gap-y-4 justify-center items-center">
        {search === ""
          ? showSorted
            ? sortedContacts.map((contact) => (
                <Contact
                  key={contact?.employee_id}
                  data={contact}
                  setUpdate={setUpdate}
                  setOldObj={setOldObj}
                  setContact={setContact}
                />
              ))
            : contacts.map((contact) => (
                <Contact
                  key={contact?.employee_id}
                  data={contact}
                  setUpdate={setUpdate}
                  setOldObj={setOldObj}
                  setContact={setContact}
                />
              ))
          : searchedContacts?.map((contact) => (
            <Contact
              key={contact?.employee_id}
              data={contact}
              setUpdate={setUpdate}
              setOldObj={setOldObj}
              setContact={setContact}
            />
          ))}
      </div>
    </>
  );
};

export default App;
