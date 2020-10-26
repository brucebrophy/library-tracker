import styled from 'styled-components';

export const DefaultButton = styled.button`
  padding: 1.3rem 4.5rem;
  border: 0;
  border-radius: 5rem;
  background-color: ${props => props.color || '#1da1f2'};
  font-size: 1.6rem;
  color: white;
  cursor: pointer;
`;

