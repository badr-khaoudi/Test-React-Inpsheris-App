import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
  List,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { Link as LinkIcon, Settings } from '@material-ui/icons';
import { makeSelectSearch } from './selectors';

const Links = ({ page, setPage }) => {
  const search = useSelector(makeSelectSearch());
  return (
    <>
      <List>
        {_.map(search.usefulLinks, (link, index) => (
          <a
            key={index}
            href={link.link}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <LinkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={link.title}
                secondary={
                  <>
                    <Typography component="span" display="block">
                      {link.heading.heading}
                    </Typography>
                    <Typography component="span">In useful links</Typography>
                  </>
                }
              />
            </ListItem>
          </a>
        ))}
        {_.map(search.digitalWorkplaceApplications, (link, index) => (
          <a
            key={index}
            href={link.link}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Settings />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={link.name}
                secondary={
                  <>
                    <Typography component="span" display="block">
                      {link.description}
                    </Typography>
                    <Typography component="span">
                      In digital workplace applications
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </a>
        ))}
      </List>
      {page * 18 <=
        search.totalUsefulLinks + search.totalDigitalWorkplaceApplications && (
        <Grid container spacing={2}>
          <Grid item>
            <Button
              onClick={() => setPage(page + 1)}
              variant="outlined"
              color="primary"
            >
              View More
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

Links.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default memo(Links);
