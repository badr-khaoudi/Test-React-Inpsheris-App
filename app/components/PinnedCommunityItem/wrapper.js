import styled from 'styled-components';
import { ListItem, Grid } from '@material-ui/core';

export const PinnedCommunityItemContainer = styled.div`
  margin: 23px 22px;
  overflow: hidden;
`;

export const CustomListItemContainer = styled(ListItem)`
  min-height: 70px;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  padding: 10px 0;
  cursor: pointer;
`;

export const ImageGrid = styled(Grid)`
  position: relative;
  &::before {
    content: '';
    padding-bottom: 100%;
    display: block;
  }
  img {
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;
