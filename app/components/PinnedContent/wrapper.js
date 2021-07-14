import styled from 'styled-components';

import { Grid, Typography } from '@material-ui/core';
export const PinnedContentImageHeader = styled.div`
  height: 150px;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const AvatarGrid = styled(Grid)`
  margin-bottom: 10px;
`;

export const BodyTypography = styled(Typography)`
  margin: 15px 0;
`;
