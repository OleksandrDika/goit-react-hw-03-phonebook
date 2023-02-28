import { FormField } from 'components/Filter/Filter.styled';
import React from 'react';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <FormField>
      Find contacts by name
      <input type="text" value={value} onChange={onChange} />
    </FormField>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
