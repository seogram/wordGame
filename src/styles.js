import styled from 'styled-components';

export const Header = styled.div`
  margin: 1rem;
  font-size: 2.5rem;
  text-align: center;
`;

export const SubHeader = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;
export const Content = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  background-color: transparent;
`;

export const Second = styled.div`
  color: ${props => (props.timing ? '#32cdcd' : 'red')};
  text-align: center;
  font-size: 2rem;
  padding: 1rem;
`;

export const DefaultLabel = styled.div`
  color: ${props => (props.expired ? 'red' : '#32cdcd')};
  font-size: 25px;
  padding: 1rem;
`;
