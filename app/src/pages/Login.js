import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../contexts/UserContext';
import Container from '../styles/Container';
import FormGroup from '../styles/FormGroup';
import { DefaultButton } from '../styles/Buttons';

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    handleLogin(data);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <DefaultButton type="submit">Login</DefaultButton>
      </form>
    </Container>
  );
};

export default Login;