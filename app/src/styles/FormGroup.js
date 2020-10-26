import styled from 'styled-components';

const FormGroup = styled.div`
  display: inline-block;
  width: 100%;

  label {
    display: block;
    margin-bottom: 2rem;
    width: 100%;
    font-size: 1.8rem;
    letter-spacing: 1px;
    color: #FFF;
    span {
      display: inline-block;
      margin-top: 1rem;
      color: #cc0505;
    }
  }
  input,
  textarea {
    display: block;
    margin-top: 1rem;
    padding: 1.3rem 2rem;
    font-size: 1.6rem;
    border: 0;
    width: 100%;
    background: #253341;
    color: white;
    border-radius: 1rem;
    &:focus {
      outline: none;
    }
  }
`;

export default FormGroup;