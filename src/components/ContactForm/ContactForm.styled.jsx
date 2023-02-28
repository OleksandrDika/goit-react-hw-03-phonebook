import styled from 'styled-components';

export const Forma = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid black;
  padding: 15px;
`;

export const FormField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  width: 200px;
`;

export const FormButton = styled.button`
  width: 100px;
  background-color: #2a6fbd;
`;
