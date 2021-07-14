/**
 *
 * Footer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { ClientData } from 'Theme';
import { getFooterLinks } from './actions';
import reducer from './reducer';
import { makeSelectFooterLinks } from './selectors';
import logo from '../../images/logo.png';

// Import all the icons needed
import { ReactComponent as FacebookIcon } from '../../images/svg/facebook.svg';
import { ReactComponent as LinkedInIcon } from '../../images/svg/linked-in.svg';
import { ReactComponent as TwitterIcon } from '../../images/svg/twitter.svg';
import { ReactComponent as InstagramIcon } from '../../images/svg/instagram.svg';
import { ReactComponent as YoutubeIcon } from '../../images/svg/youtube.svg';
import { ReactComponent as LinkIcon } from '../../images/svg/link.svg';
import { ReactComponent as CellPhoneIcon } from '../../images/svg/cell-phone.svg';
import { ReactComponent as MapMarkerIcon } from '../../images/svg/map-marker.svg';

import {
  LivelyFooterContainer,
  LivelyFooterLink,
  LivelySocialIcon,
  LivelyUppercaseTypography,
  LivelyGrid,
} from './wrapper';

import saga from './saga';

const linkTypes = {
  link: <LinkIcon />,
  address: <MapMarkerIcon />,
  phone: <CellPhoneIcon />,
  copyright: '© ',
};
const socialIcons = {
  linked_in: <LinkedInIcon />,
  youtube: <YoutubeIcon />,
  twitter: <TwitterIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
};

export function Footer({ footerLinks, dispatchGetFooterLinks }) {
  useInjectReducer({ key: 'footer', reducer });
  useInjectSaga({ key: 'footer', saga });

  useEffect(() => {
    dispatchGetFooterLinks();
  }, []);

  return (
    <LivelyFooterContainer>
      <Container>
        <LivelyGrid item sm={12}>
          <Grid container justify={footerLinks[0] ? 'flex-start' : 'center'}>
            <Grid item align="center">
              <img src={logo} alt="lively software" />

              <Grid container justify="space-around">
                {ClientData.social.map(item => (
                  <LivelySocialIcon
                    key={item.id}
                    target="_blank"
                    href={item.url}
                  >
                    {socialIcons[item.type]}
                  </LivelySocialIcon>
                ))}
              </Grid>
            </Grid>
            {footerLinks.map(item => (
              <Box pl={2} pr={2} key={item.id}>
                <LivelyUppercaseTypography>
                  {item.heading}
                </LivelyUppercaseTypography>
                {item.links.map(i => (
                  <LivelyFooterLink href={i.link} key={i.id} target="_blank">
                    {i.title}
                  </LivelyFooterLink>
                ))}
              </Box>
            ))}
          </Grid>
          <Grid
            style={{ marginTop: 50 }}
            container
            align="bottom"
            justify="center"
            spacing={2}
          >
            {ClientData.links.map(link => (
              <Grid item key={link.id} xs={12} md={6} lg={3}>
                <LivelyFooterLink href={link.url} target="_blank">
                  {linkTypes[link.type]}
                  {link.name}
                </LivelyFooterLink>
              </Grid>
            ))}
          </Grid>
        </LivelyGrid>
      </Container>
    </LivelyFooterContainer>
  );
}

Footer.propTypes = {
  dispatchGetFooterLinks: PropTypes.func,
  footerLinks: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  footerLinks: makeSelectFooterLinks(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchGetFooterLinks: () => dispatch(getFooterLinks()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Footer);
