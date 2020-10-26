import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import Container from '../styles/Container';
import { Link } from 'react-router-dom';
import { DefaultButton } from '../styles/Buttons';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;

  .logo {
    text-decoration: none;
  }

  h1 {
    margin: 0;
    font-size: 3rem;
    color: white;
  }
  
  nav {
    display: flex;
    justify-content: end;
    gap: 1.5rem;

    a {
      font-size: 1.6rem;
      color: white;
      text-decoration: none;
    }
  }
`;

const Header = () => {
  const { userData, handleLogout } = useContext(UserContext);
  return (
    <Container>
      <StyledHeader>
        <Link className="logo" to="/">
          <h1>Library Tracker</h1>
        </Link>
        <nav>
          { !userData && <Link to="/register">Register</Link> }
          { userData && <DefaultButton color="#e0245e" onClick={() => handleLogout()}>Logout</DefaultButton>}
        </nav>
      </StyledHeader>
    </Container>
  );
};

export default Header;