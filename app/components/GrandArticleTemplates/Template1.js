/**
 *
 * Template1
 *
 */

import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import { Typography, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { ArrowDownward } from '@material-ui/icons';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import FeedBlocksP2V8 from 'components/FeedBlocksP2V8';
import { createMarkup } from 'utils/helpers/createMarkup';
import { Parallax, DarkMenu, DarkMenuItem, MenuHeading } from './Wrapper';
// import messages from './messages';

const Page = memo(({ page, uid }) => {
  const heading = _.find(page.blocks, { type: 'heading' });

  const pageRef = useRef(null);

  const [scrollY, setScrollY] = useState(25);

  const handleScroll = useCallback(
    _.throttle(() => {
      if (!pageRef.current) {
        return;
      }
      const { top } = pageRef.current.getBoundingClientRect();
      if (Math.abs(top * 2) < window.innerHeight) {
        if (top < 0) {
          setScrollY(_.clamp(Math.trunc(Math.abs(top) * 0.25), 25, 100));
        }
      }
    }),
    [],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, []);

  return (
    <div id={page.id} style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          background: '#000000',
          height: '100%',
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            filter: `opacity(${scrollY}%) blur(${
              85 - scrollY > 0 ? Math.trunc((85 - scrollY) / 5) : 0
            }px)`,
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Parallax
            $background_image={heading.imageHeader}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </div>
      </div>
      <Container
        maxWidth="md"
        style={{
          minHeight: 'calc(100vh - 75px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
        }}
        ref={pageRef}
      >
        <Typography variant="h3">{heading.title}</Typography>
      </Container>
      <Container
        maxWidth="md"
        style={{
          marginTop: '20vh',
          marginBottom: '20vh',
          marginRight: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Paper elevation={0} style={{ padding: 24 }}>
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
      </Container>
    </div>
  );
});

Page.propTypes = { page: PropTypes.object, uid: PropTypes.string };

function Template1({ uid }) {
  const grandArticleContent = useSelector(makeSelectFeed(uid));
  const heading = _.find(grandArticleContent.blocks, { type: 'heading' });
  const richText = _.find(grandArticleContent.blocks, { type: 'richText' });

  return (
    <>
      <Paper square elevation={0}>
        <Container
          maxWidth="xs"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" color="textSecondary">
            {heading.title}
          </Typography>
          <Typography
            dangerouslySetInnerHTML={createMarkup(richText.content)}
            style={{ wordBreak: 'break-word' }}
          />
          <ArrowDownward
            fontSize="large"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 20,
              transform: 'translateX(-50%)',
            }}
          />
        </Container>
      </Paper>
      <Grid container>
        <Grid item style={{ width: 200 }}>
          <Sticky top={75} innerZ={1099} bottomBoundary="#pages">
            <DarkMenu>
              <MenuHeading>
                <Typography variant="h6">{heading.title}</Typography>
              </MenuHeading>
              {_.map(
                grandArticleContent.grandArticlePages,
                grandArticlePage => (
                  <DarkMenuItem
                    key={grandArticlePage.id}
                    to={`${grandArticlePage.id}`}
                    activeClass="active"
                    spy
                    smooth
                    duration={500}
                    offset={-75}
                  >
                    <Typography variant="h6" display="inline">
                      {grandArticlePage.title}
                    </Typography>
                  </DarkMenuItem>
                ),
              )}
            </DarkMenu>
          </Sticky>
        </Grid>
        <Grid item style={{ width: 'calc(100% - 200px)' }} id="pages">
          {_.map(grandArticleContent.grandArticlePages, grandArticlePage => (
            <Page key={grandArticlePage.id} page={grandArticlePage} uid={uid} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}

Template1.propTypes = { uid: PropTypes.string };

export default memo(Template1);
