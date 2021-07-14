import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { PaperStyles } from 'utils/helpers/Paper';
import { Thumbnail } from 'components/FeedBlocksP2V8/Wrapper';

const WidgetItemCard = styled(Paper)`
  ${PaperStyles};
  position: relative;
  padding-right: 56px;
  .widget-icon {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;

const Overlay = styled.div`
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(20, 60, 125, 0.5);
  opacity: 0;
  transition: opacity 300ms;
  ${Thumbnail}:hover & {
    opacity: 1;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { WidgetItemCard, Overlay };
