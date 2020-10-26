import { useForm } from "react-hook-form";
import Axios from 'axios';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ email, password }) => {
    console.log(email, password);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email
            <input type="email" name="email" id="email" ref={register({ required: true })} />
            {errors.email && <span>Email field is required</span>}
          </label>
        </div>
        <div>
          <label htmlFor="password">Password
            <input type="password" name="password" id="password" ref={register({ required: true })} />
            {errors.password && <span>Password field is required</span>}
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;