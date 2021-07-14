import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import { PaperStyles } from 'utils/helpers/Paper';

const LinkChip = props => <Chip component={Link} clickable {...props} />;

const FeedCard = styled(Paper)`
  ${PaperStyles};
  // &:not(:last-of-type) {
  //   margin-bottom: 24px;
  // }
  position: ${props => (props.$hasBlock ? 'relative' : 'unset')};
  bottom: ${props => (props.$hasBlock ? '14px' : 'unset')};
  z-index: ${props => (props.$hasBlock ? 2 : 'unset')};
`;

const HashtagLink = styled(LinkChip)`
  background: rgba(166, 172, 190, 0.13);
  border-radius: 3px;
  color: #9199b1;
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;

const CommunityLogo = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 5px;
`;

const FeedAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    height: 48px;
    width: 48px;
  }
`;

const ActionButton = styled(ButtonBase)`
  flex: 0 0 auto;
  color: rgba(0, 0, 0, 0.54);
  padding: 6px;
  overflow: visible;
  font-size: 1.5rem;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
`;

export { FeedCard, HashtagLink, CommunityLogo, FeedAvatar, ActionButton };
