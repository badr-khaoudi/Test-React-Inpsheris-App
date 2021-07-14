import styled from 'styled-components';

const Header = styled.div`
  width: 100%;
  position: relative;
  background-color: #fff;
  background-image: ${props => (props.url ? `url(${props.url})` : 'none')};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &:before {
    padding-top: calc(260 / 1200 * 100%);
    content: '';
    display: block;
  }
`;

const CoverBottom = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  bottom: 0;
  color: #fff;
  height: 71px;
`;

export { Header, CoverBottom };
