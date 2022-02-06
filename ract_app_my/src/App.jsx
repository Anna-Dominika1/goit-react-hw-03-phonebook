import ContactForm from "./ContactForm/ContactForm";
import React, { Component } from "react";
import { info } from "@pnotify/core";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import "./App.css";
class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    this.setState({ contacts: JSON.parse(localStorage.getItem("contacts")) });
  }
  componentDidUpdate() {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }
  filterOnChange = ({ target }) => {
    this.setState({ filter: target.value });
  };
  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((element) => element.id !== id),
    }));
  };
  addContact = (contactData) => {
    this.setState((prevState) => ({
      contacts: [contactData, ...prevState.contacts],
    }));
    info({ text: `Contact successfully added`, delay: 700 });
  };

  render() {
    const query = this.state.filter.toLocaleLowerCase();
    const visibleContacts = this.state.contacts.filter((element) =>
      element.name.toLocaleLowerCase().includes(query)
    );
    console.log(this.state.contacts);
    return (
      <>
        <div className="phonebook__wrapper">
          <div className="form-wrapper">
            <h1 className="headline">Phonebook</h1>

            <h2>Add new contact</h2>
            <ContactForm
              handleSubmit={this.addContact}
              contacts={this.state.contacts}
            />
          </div>
          <div className="list-wrapper">
            <h2>Contacts</h2>
            <Filter value={this.state.filter} onChange={this.filterOnChange} />

            <ContactList
              deleteContact={this.deleteContact}
              contacts={visibleContacts}
            />
          </div>
        </div>
      </>
    );
  }
}
export default App;
