import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Container from '../styles/Container';
import FormGroup from '../styles/FormGroup';
import { DefaultButton } from '../styles/Buttons';

const Register = () => {
  const { userData, handleRegister } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    handleRegister(data);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="name">Full Name
            <input type="text" name="name" id="name" ref={register({ required: true })} />
            {errors.name && <span>Nmae field is required</span>}
          </label>
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email
            <input type="email" name="email" id="email" ref={register({ required: true })} />
            {errors.email && <span>Email field is required</span>}
          </label>
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password
            <input type="password" name="password" id="password" ref={register({ required: true })} />
            {errors.password && <span>Password field is required</span>}
          </label>
        </FormGroup>
        <DefaultButton type="submit">Register</DefaultButton>
      </form>
      { userData && <Redirect to="/" />}
    </Container>
  );
};

export default Register;