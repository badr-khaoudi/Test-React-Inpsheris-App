import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const ColorPaper = styled(Paper)`
  background: ${props => props.background};
  color: ${props => props.title};
  flex: 1;
  min-height: 40px;
  cursor: pointer;
  padding: 10px;
`;

const Carousel = styled.div`
  width: 100%;
  position: relative;
  background-color: #fff;
  background-image: ${props => (props.url ? `url(${props.url})` : 'none')};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &:before {
    padding-top: calc(315 / 1500 * 100%);
    content: '';
    display: block;
  }
`;

export { ColorPaper, Carousel };
