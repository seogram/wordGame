import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  margin: 2rem;
`;
export const Header = styled.div`
  margin: 1rem;
  font-size: 2.5rem;
  text-align: center;
`;

export const Label = styled.div`
  color: ${props => (props.state === 'success' ? '#006400' : 'red')};
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
  color: ${props => (props.timing ? 'green' : 'red')};
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem;
`;

export const DefaultLabel = styled.div`
  color: ${props => (props.expired ? 'red' : 'green')};
  font-size: 25px;
  padding: 1rem;
`;

export const Button = styled.button`
  background: green;
  opacity: ${props => (!props.timeExpired ? 0 : 1)};
  color: #ffffff;
  cursor: pointer;
  font-size: 2rem;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 4px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  &:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;
