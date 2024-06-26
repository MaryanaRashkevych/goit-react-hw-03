import { useState, useEffect } from "react"
import css from "./App.module.css";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";

const initialContacts = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
];
 
export default function App() {
  // const [contacts, setContacts] = useState(initialContacts);
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : initialContacts;  
  });
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    console.log("Contacts updated:", contacts);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
 
  
  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contactId !== contact.id);
    });
  };
 
  const visibleContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      
    </div>
  );
}
