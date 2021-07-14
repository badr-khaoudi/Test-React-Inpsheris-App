import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { CustomToolbar, SwiperFractionedPagination } from './wrapper';

import { ReactComponent as CloseIcon } from '../../images/svg/x.svg';
export default function CarouselHeader({
  title,
  handleClose,
  searchQuery,
  onSearchQueryChange,
  children,
}) {
  return (
    <AppBar position="static">
      <CustomToolbar>
        <IconButton
          edge="start"
          // color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography color="textPrimary" variant="h6" noWrap>
          {title}
        </Typography>
        <TextField
          label="Search.."
          type="search"
          size="small"
          value={searchQuery}
          onChange={onSearchQueryChange}
          variant="outlined"
        />
        {children}
        <SwiperFractionedPagination className="swiper-fractioned-pagination" />
      </CustomToolbar>
    </AppBar>
  );
}

CarouselHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
