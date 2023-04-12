import React, { useEffect } from "react";
import Header from "./components/Header";
import ContactInput from "./components/ContactInput";
import Contact from "./components/Contact";
import { useSelector } from "react-redux";
import { useState } from "react";

const App = () => {
  const contacts = useSelector((state) => state.contacts.allContacts);
  const sortedContacts = useSelector((state) => state.contacts.sortedContacts);
  const [searchedContacts,setSearchedContacts] = useState([...sortedContacts]);
  const [update, setUpdate] = useState(false);
  const [showSorted, setShowSorted] = useState(false);
  const [search, setSearch] = useState("");
  const [contact, setContact] = useState({
    Name: "",
    Number: "",
    Address: "",
  });
  const [oldObj, setOldObj] = useState({
    Name: "",
    Number: "",
    Address: "",
  });
  function searchArray() {
    // Convert the searchText to lowercase for case-insensitive search
    let searchText = search.toLowerCase();

    const result = sortedContacts.filter(obj => {
      const name = obj.Name.toLowerCase();
      const number = obj.Number.toLowerCase();
      return name.includes(searchText) || number.includes(searchText);
    });
    
    setSearchedContacts(result)
  }

  useEffect(()=>{
    searchArray()
  },[search])
  
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
                  key={contact?.Number}
                  data={contact}
                  setUpdate={setUpdate}
                  setOldObj={setOldObj}
                  setContact={setContact}
                />
              ))
            : contacts.map((contact) => (
                <Contact
                  key={contact?.Number}
                  data={contact}
                  setUpdate={setUpdate}
                  setOldObj={setOldObj}
                  setContact={setContact}
                />
              ))
          : searchedContacts?.map((contact) => (
            <Contact
              key={contact?.Number}
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
