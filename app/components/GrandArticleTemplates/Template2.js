/**
 *
 * Template2
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
import * as Vibrant from 'node-vibrant';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import FeedBlocksP2V8 from 'components/FeedBlocksP2V8';
import { createMarkup } from 'utils/helpers/createMarkup';
import {
  Parallax,
  FullPageHeading,
  PageTitle,
  PageSubTitle,
  FullMenu,
  MenuList,
  MenuItem,
} from './Wrapper';
// import messages from './messages';

const Page = memo(({ page, uid }) => {
  const heading = _.find(page.blocks, { type: 'heading' });
  return (
    <Parallax
      $background_image={heading.imageHeader}
      style={{
        minHeight: '100vh',
      }}
      className="boxShadow"
      id={page.id}
    >
      <div style={{ margin: '20vh 0' }}>
        <div style={{ position: 'relative', height: 145 }}>
          <PageTitle>
            <Typography variant="h3" display="inline" noWrap>
              {page.title}
            </Typography>
          </PageTitle>
          <PageSubTitle>
            <Typography variant="h4" display="inline" noWrap>
              {page.subTitle}
            </Typography>
          </PageSubTitle>
        </div>
        <Container
          fixed
          disableGutters
          style={{
            paddingTop: 40,
            paddingBottom: 40,
            marginLeft: 300,
            maxWidth: 'calc(100% - 500px)',
          }}
        >
          <Grid container spacing={3}>
            {_.map(page.blocks, (block, index) =>
              block.type !== 'heading' ? (
                <Grid item xs={12} key={`${block.type}${index}`}>
                  <Paper elevation={0} style={{ padding: 24 }}>
                    <FeedBlocksP2V8 block={block} contentUid={uid} />
                  </Paper>
                </Grid>
              ) : null,
            )}
          </Grid>
        </Container>
      </div>
    </Parallax>
  );
});

Page.propTypes = { page: PropTypes.object, uid: PropTypes.string };

function Template2({ uid }) {
  const grandArticleContent = useSelector(makeSelectFeed(uid));
  const heading = _.find(grandArticleContent.blocks, { type: 'heading' });
  const richText = _.find(grandArticleContent.blocks, { type: 'richText' });

  const headingRef = useRef(null);

  const [scrollY, setScrollY] = useState();

  const handleScroll = useCallback(
    _.throttle(() => {
      if (!headingRef.current) {
        return;
      }
      const { top } = headingRef.current.getBoundingClientRect();
      if (Math.abs(top) < window.innerHeight) {
        setScrollY(window.scrollY);
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

  const [bodyTextColor, setBodyTextColor] = useState('unset');

  useEffect(() => {
    let imageHeader = false;
    if (heading.imageHeader) {
      (async () => {
        const palettes = await Vibrant.from(
          heading.imageGridviewLargeThumb,
        ).getPalette();
        if (!imageHeader) {
          setBodyTextColor(palettes.Vibrant.getBodyTextColor());
        }
      })();
    }
    return () => {
      imageHeader = true;
    };
  }, [heading.imageHeader]);

  return (
    <>
      <FullPageHeading ref={headingRef}>
        <Parallax
          $background_image={heading.imageHeader}
          style={{
            height: '100%',
            transform: `scale(${1 + scrollY * 0.00015})`,
          }}
        />
        <Typography
          variant="h3"
          align="center"
          style={{
            position: 'absolute',
            top: '25%',
            transform: `translateY(${scrollY * 0.6}px)`,
            color: bodyTextColor,
          }}
        >
          {heading.title}
        </Typography>
      </FullPageHeading>
      <Paper square elevation={0}>
        <Container
          maxWidth="md"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h6"
            dangerouslySetInnerHTML={createMarkup(richText.content)}
            style={{ wordBreak: 'break-word' }}
          />
        </Container>
      </Paper>
      <Sticky top={75} innerZ={1099}>
        <FullMenu>
          <MenuList>
            {_.map(grandArticleContent.grandArticlePages, grandArticlePage => (
              <MenuItem
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
              </MenuItem>
            ))}
          </MenuList>
        </FullMenu>
      </Sticky>
      {_.map(grandArticleContent.grandArticlePages, grandArticlePage => (
        <Page key={grandArticlePage.id} page={grandArticlePage} uid={uid} />
      ))}
    </>
  );
}

Template2.propTypes = { uid: PropTypes.string };

export default memo(Template2);
