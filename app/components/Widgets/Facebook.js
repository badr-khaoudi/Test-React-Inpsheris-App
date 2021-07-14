/**
 *
 * Facebook
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

// &width=340&height=500

function Facebook({ facebookData }) {
  return (
    <iframe
      title="Facebook"
      src={`https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/${
        facebookData.pageUrl
      }&tabs=timeline&small_header=${
        facebookData.smallHeader
      }&adapt_container_width=true&hide_cover=${
        facebookData.hideCover
      }&show_facepile=${facebookData.showFacepile}&appId`}
      style={{ border: 'none', overflow: 'hidden' }}
      width="100%"
      height="233"
      scrolling="no"
      frameBorder="0"
      allowFullScreen={false}
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    />
  );
}

Facebook.propTypes = {
  facebookData: PropTypes.object,
};

export default memo(Facebook);
