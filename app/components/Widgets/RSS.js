/**
 *
 * RSS
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  List,
  ListItemText,
  Link,
  Divider,
  Typography,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { rss, rssMore } from 'containers/GlobalEntities/actions';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import { Skeleton } from '@material-ui/lab';

function RSS({ widget }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(5);
  useEffect(() => {
    dispatch(
      rss(widget.uid, {
        rss_url: _.first(_.split(widget.content, '---')),
        count: 5,
      }),
    );
  }, []);
  useEffectAfterMount(() => {
    dispatch(
      rssMore(widget.uid, {
        rss_url: _.first(_.split(widget.content, '---')),
        count,
      }),
    );
  }, [count]);
  return (
    <>
      {(widget.rssLoading === undefined || widget.rssLoading) &&
        _.map(_.range(5), i => (
          <React.Fragment key={i}>
            <Skeleton width="100%">
              <Typography variant="h4" gutterBottom>
                .
              </Typography>
            </Skeleton>
            <Skeleton width="100%">
              <Typography variant="caption" gutterBottom>
                .
              </Typography>
            </Skeleton>
            {i + 1 !== 5 && <Divider />}
          </React.Fragment>
        ))}
      {!_.isEmpty(widget.rss) && (
        <>
          <List>
            {_.map(widget.rss.items, (item, index) => (
              <React.Fragment key={index}>
                <ListItem button>
                  <ListItemText
                    primary={
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        color="inherit"
                        variant="h6"
                      >
                        {item.title}
                      </Link>
                    }
                    secondary={
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        color="inherit"
                        variant="caption"
                      >
                        Consulter l&apos;article
                      </Link>
                    }
                  />
                </ListItem>
                {index + 1 !== _.size(widget.rss.items) && (
                  <Divider component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
          {count === _.size(widget.rss.items) && (
            <Button
              onClick={() => setCount(count + 5)}
              variant="outlined"
              color="primary"
            >
              View More
            </Button>
          )}
        </>
      )}
    </>
  );
}

RSS.propTypes = {
  widget: PropTypes.object,
};

export default memo(RSS);
