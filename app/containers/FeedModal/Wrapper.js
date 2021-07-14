import styled from 'styled-components';

const HeaderImage = styled.div`
  width: 100%;
  height: ${props => (props.heading.smallImage ? '350px' : null)};
  background-color: ${props => props.heading.imageHeaderBackgroundColor};
  display: flex;
  justify-content: center;
  img {
    width: ${props => (props.heading.smallImage ? 'auto' : '100%')};
    height: ${props => (props.heading.smallImage ? '100%' : 'auto')};
  }
`;

export { HeaderImage };
