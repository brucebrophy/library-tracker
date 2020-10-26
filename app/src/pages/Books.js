import { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';
import Container from '../styles/Container';
import BookForm from '../components/BookForm';
import BookItem from '../components/BookItem';

const PageHeader = styled.h1`
  font-size: 3rem;
  color: white;
`;

const Books = () => {
  const { tokens } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getBooks = async () => {
    const response = await Axios.get(`${process.env.REACT_APP_API_URL}/v1/books/`, {
      headers: {
        Authorization: `Bearer ${tokens.access.token}`
      }
    });

    setBooks(response.data.results);
    setCurrentPage(response.data.page);
    setTotalPages(response.data.totalPages);
  }

  const addBook = (book) => {
    setBooks([...books, book]);
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Container>
      <PageHeader>Create Book</PageHeader>
      <BookForm addBook={addBook} />
      <PageHeader>Books</PageHeader>
      { books.map(book => <BookItem  key={book.id} book={book} />) }
    </Container>
  );
};

export default Books;