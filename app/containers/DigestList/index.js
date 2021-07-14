/**
 *
 * DigestList
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Container, ListItemText, List, Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import digestReducer from 'containers/Digest/reducer';
import { makeSelectDigestList } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { digestList as digestListAction } from './actions';

export function DigestList(props) {
  useInjectReducer({ key: 'digest', reducer: digestReducer });
  useInjectReducer({ key: 'digestList', reducer });
  useInjectSaga({ key: 'digestList', saga });

  const { dispatchDigestList, currentUser, digestList } = props;

  useEffect(() => {
    dispatchDigestList({ userUid: currentUser.uid });
  }, []);

  return (
    <>
      <Helmet>
        <title>DigestList</title>
        <meta name="description" content="Description of DigestList" />
      </Helmet>
      <Container maxWidth="lg">
        <List>
          {_.map(digestList, digest => (
            <React.Fragment key={digest.id}>
              <Link to={`/digest/${digest.id}`}>
                <ListItem button>
                  <ListItemText
                    primary={digest.title}
                    secondary={digest.created}
                  />
                </ListItem>
              </Link>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Container>
    </>
  );
}

DigestList.propTypes = {
  dispatchDigestList: PropTypes.func,
  currentUser: PropTypes.object,
  digestList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  digestList: makeSelectDigestList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchDigestList: options => dispatch(digestListAction(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DigestList);
