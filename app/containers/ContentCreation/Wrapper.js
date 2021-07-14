import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

const BlockTypes = styled(Paper)`
  background-color: #eceeef;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const BlockItem = styled.div`
  width: 100%;
  position: relative;
  &:before {
    padding-top: 100%;
    content: '';
    display: block;
  }
`;

const BlockButton = styled(ButtonBase)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
`;

const ItemImage = styled.div`
  width: 100%;
  position: relative;
  background-image: ${props => (props.url ? `url(${props.url})` : 'none')};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &:before {
    padding-top: calc(562.5 / 900 * 100%);
    content: '';
    display: block;
  }
`;

const ZenImage = styled.div`
  width: 100%;
  position: relative;
  background-image: ${props => (props.url ? `url(${props.url})` : 'none')};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &:before {
    padding-top: calc(600 / 1600 * 100%);
    content: '';
    display: block;
  }
`;

export { BlockTypes, BlockItem, BlockButton, ItemImage, ZenImage };
