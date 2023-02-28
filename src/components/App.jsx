import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Conteiner } from './Conteiner.styled';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  onSubmitForm = newContact => {
    const sameNames = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (sameNames) {
      alert(`${newContact.name}is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { id: nanoid(), ...newContact }],
      };
    });
  };

  getVisibleContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const visibleContact = this.getVisibleContacts();
    return (
      <Conteiner>
        <h2>Phonebook</h2>
        <ContactForm onFormSubmit={this.onSubmitForm} />

        <div>
          <h2>Contacts</h2>
          {this.state.contacts.length > 0 && (
            <Filter value={this.state.filter} onChange={this.changeFilter} />
          )}

          {this.state.contacts.length > 0 && (
            <ContactList
              visibleContact={visibleContact}
              deleteContact={this.deleteContact}
            />
          )}
        </div>
      </Conteiner>
    );
  }
}
