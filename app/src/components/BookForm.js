import { useContext } from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';
import FormGroup from '../styles/FormGroup';
import { DefaultButton } from '../styles/Buttons';

const StyledForm = styled.form`
  margin-bottom: 4rem;
`;

const BookForm = ({ addBook }) => {
  const { tokens } = useContext(UserContext);
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = async (data) => {
      const response = await Axios.post(`${process.env.REACT_APP_API_URL}/v1/books/`, data, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`
        }
      });

      addBook(response.data);
      reset();
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="title">Title
            <input type="text" name="title" id="title" ref={register({ required: true })} />
            {errors.title && <span>Title field is required</span>}
          </label>
        </FormGroup>
         <FormGroup>
          <label htmlFor="description">Description
            <textarea name="description" id="description" rows="4" ref={register({ required: true })} />
            {errors.description && <span>Description field is required</span>}
          </label>
        </FormGroup>
        <DefaultButton type="submit">Add Book</DefaultButton>
      </StyledForm>
    </>
  );
};

export default BookForm;