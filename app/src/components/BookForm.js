import { useForm } from "react-hook-form";
import styled from 'styled-components';
import FormGroup from '../styles/FormGroup';
import { DefaultButton } from '../styles/Buttons';

const StyledForm = styled.form`
  margin-bottom: 4rem;
`;

const BookForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
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
        <DefaultButton type="submit">Add Book</DefaultButton>
      </StyledForm>
    </>
  );
};

export default BookForm;