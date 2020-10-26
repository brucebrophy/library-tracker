import styled from 'styled-components';
import Container from '../styles/Container';
import BookForm from '../components/BookForm';

const PageHeader = styled.h1`
  font-size: 3rem;
  color: white;
`;

const Books = () => {
  return (
    <Container>
      <PageHeader>Create Book</PageHeader>
      <BookForm />
      <PageHeader>Books</PageHeader>
    </Container>
  );
};

export default Books;