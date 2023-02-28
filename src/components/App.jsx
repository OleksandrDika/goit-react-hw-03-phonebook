import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Conteiner } from './Conteiner.styled';
import startContacts from './contacts.json';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorCont = localStorage.getItem('contacts');
    console.log(localStorCont);
    if (localStorCont !== null) {
      const parseCont = JSON.parse(localStorCont);
      this.setState({ contacts: parseCont });
      return;
    }
    console.log(startContacts);
    this.setState({ contacts: startContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
