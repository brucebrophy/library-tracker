import styled from 'styled-components';

const StyledPagination = styled.div`
  margin: 4rem 0 4rem;
  display: flex;
  justify-content: space-between;
  button {
    padding: 1rem 2.5rem;
    width: 12rem;
    border: 0;
    border-radius: 5rem;
    background: none;
    border: 1px solid ${props => props.color || '#1da1f2'};
    font-size: 1.6rem;
    color: white;
    cursor: pointer;
    
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const Pagination = ({ currentPage, totalPages, getBooks }) => {
  return (
    <StyledPagination>
      <button 
        type="button" 
        disabled={currentPage <= 1}
        onClick={() => getBooks(currentPage - 1)}>Previous
      </button>
      
      <button 
        type="button" 
        disabled={totalPages <= currentPage}
        onClick={() => getBooks(currentPage + 1)}>Next
      </button>
    </StyledPagination>
  );
};

export default Pagination;