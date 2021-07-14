import styled from 'styled-components';
import { Grid, Typography, Avatar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

export const Community = styled(Grid)`
  .lazyload-wrapper {
    width: 100%;
    height: 100%;
    &:before {
      padding-top: calc(170 / 300 * 100%);
      content: '';
      float: left;
      width: 1px;
      height: 0;
    }
  }
`;

export const CommunityThumb = styled(Paper)`
  padding: 5px;
  background-image: ${props => (props.image ? `url(${props.image})` : 'none')};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

export const CommunityTag = styled.span`
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.3);
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 0.35em;
`;

export const CommunityFeed = styled(Typography)`
  color: ${props => (props.image ? '#fff' : 'rgba(0, 0, 0, 0.85)')};
  text-shadow: ${props =>
    props.image ? '1px 1px 5px rgba(0, 0, 0, 0.4)' : 'none'};
`;

export const CommunityItem = styled.div`
  width: 150px;
  text-align: center;
  position: relative;
`;

export const CommunityImage = styled.img`
  height: 150px;
  width: 150px;
  margin-bottom: 5px;
`;

export const CommunityAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    height: 150px;
    width: 150px;
  }
  margin-bottom: 5px;
`;

export const CommunityTitle = styled(Typography)`
  color: #fff;
  &.active {
    color: #3f51b5;
  }
`;

export const Logo = styled.div`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: -15px;
  right: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
