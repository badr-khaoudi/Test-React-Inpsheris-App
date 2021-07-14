/**
 *
 * Anchors
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-scroll';
import { AnchorLinks } from './Wrapper';

const Anchors = ({ communityList, activeAnchor, setActiveAnchor }) => {
  const uniqueAnchors = _.orderBy(
    _.uniqBy(
      _.map(communityList, community => ({
        anchor: _.deburr(_.toUpper(_.head(community.label))),
        id: `${community.uid}anchor`,
      })),
      'anchor',
    ),
    'anchor',
  );
  return (
    <AnchorLinks>
      {_.map(uniqueAnchors, anchor => (
        <Link
          key={anchor.id}
          to={`${anchor.id}`}
          smooth
          duration={500}
          offset={-50}
          containerId="container-div"
          onClick={() => setActiveAnchor(anchor.id)}
          className={anchor.id === activeAnchor ? 'active' : null}
        >
          {anchor.anchor}
        </Link>
      ))}
    </AnchorLinks>
  );
};

Anchors.propTypes = {
  communityList: PropTypes.array,
  activeAnchor: PropTypes.string,
  setActiveAnchor: PropTypes.func,
};

export default Anchors;
