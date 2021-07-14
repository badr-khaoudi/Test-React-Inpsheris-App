/**
 *
 * Template3
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import { Typography, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import FeedBlocksP2V8 from 'components/FeedBlocksP2V8';
import { createMarkup } from 'utils/helpers/createMarkup';
import {
  Parallax,
  Heading,
  Menu,
  MenuHeading,
  MenuList,
  MenuItem,
} from './Wrapper';
// import messages from './messages';

const Page = memo(({ page, uid }) => (
  <Paper elevation={0} id={page.id} style={{ padding: 24 }}>
    <Typography variant="h4" gutterBottom>
      {page.title}
    </Typography>
    <Typography gutterBottom>{page.subTitle}</Typography>
    <Grid container spacing={3}>
      {_.map(page.blocks, (block, index) =>
        block.type !== 'heading' ? (
          <Grid item xs={12} key={`${block.type}${index}`}>
            <FeedBlocksP2V8 block={block} contentUid={uid} />
          </Grid>
        ) : null,
      )}
    </Grid>
  </Paper>
));

Page.propTypes = { page: PropTypes.object, uid: PropTypes.string };

function Template3({ uid }) {
  const grandArticleContent = useSelector(makeSelectFeed(uid));
  const heading = _.find(grandArticleContent.blocks, { type: 'heading' });
  const richText = _.find(grandArticleContent.blocks, { type: 'richText' });

  return (
    <>
      <Parallax
        $background_image={heading.imageHeader}
        style={{
          padding: '80px 0',
        }}
      >
        <Heading>
          <Typography variant="h4" align="center">
            {heading.title}
          </Typography>
        </Heading>
      </Parallax>
      <Paper square elevation={0}>
        <Container fixed style={{ paddingTop: 24, paddingBottom: 24 }}>
          <Typography
            dangerouslySetInnerHTML={createMarkup(richText.content)}
            style={{ wordBreak: 'break-word' }}
            align="center"
          />
        </Container>
      </Paper>
      <Container fixed style={{ padding: '24px 0px' }}>
        <Grid container wrap="nowrap" spacing={4}>
          <Grid item style={{ width: 300 }}>
            <Sticky top={75} bottomBoundary="#pages">
              <Menu>
                <MenuHeading>
                  <Typography variant="h6">{heading.title}</Typography>
                </MenuHeading>
                <MenuList>
                  {_.map(
                    grandArticleContent.grandArticlePages,
                    grandArticlePage => (
                      <MenuItem
                        key={grandArticlePage.id}
                        to={`${grandArticlePage.id}`}
                        activeClass="active"
                        spy
                        smooth
                        duration={500}
                        offset={-100}
                      >
                        <Typography variant="h6" display="inline">
                          {grandArticlePage.title}
                        </Typography>
                      </MenuItem>
                    ),
                  )}
                </MenuList>
              </Menu>
            </Sticky>
          </Grid>
          <Grid item xs style={{ maxWidth: 'calc(100% - 300px)' }} id="pages">
            <Grid container spacing={3}>
              {_.map(
                grandArticleContent.grandArticlePages,
                grandArticlePage => (
                  <Grid item xs={12} key={grandArticlePage.id}>
                    <Page page={grandArticlePage} uid={uid} />
                  </Grid>
                ),
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Template3.propTypes = { uid: PropTypes.string };

export default memo(Template3);
