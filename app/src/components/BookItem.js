import styled from 'styled-components';

const StyledBookItem = styled.div`
  margin: 2rem 0 2rem;
  padding: 1.5rem 2rem;
  color: white;
  border: 1px solid #38444d;
  border-radius: 1rem;
  h2 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.6rem;
  }
`;

const BookItem = ({ book }) => {
  return (
    <StyledBookItem>
      <h2>{ book.title }</h2>
      <p>{ book.description }</p>
    </StyledBookItem>
  );
};

export default BookItem;