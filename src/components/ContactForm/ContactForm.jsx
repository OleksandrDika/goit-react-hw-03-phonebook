import { Component } from 'react';
import { Forma, FormButton, FormField } from './ContactForm.styled';
import PropTypes from 'prop-types';
export class ContactForm extends Component {
  state = { name: '', number: '' };

  inputHundleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  hundleSubmit = e => {
    e.preventDefault();

    this.props.onFormSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <Forma onSubmit={this.hundleSubmit}>
        <FormField>
          Name
          <input
            type="text"
            value={this.state.name}
            onChange={this.inputHundleChange}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </FormField>
        <FormField>
          Number
          <input
            type="tel"
            value={this.state.number}
            onChange={this.inputHundleChange}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </FormField>

        <FormButton type="submit">Add contact</FormButton>
      </Forma>
    );
  }
}

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
