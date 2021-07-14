/**
 *
 * DigestPreview
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import digestReducer from 'containers/Digest/reducer';
import digestSaga from 'containers/Digest/saga';
import { Template4 } from 'components/DigestTemplates';
import { makeSelectDigestById } from 'containers/Digest/selectors';
// import makeSelectDigestPreview from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  digestContent as digestContentAction,
  cleanDigestContent,
} from './actions';

export function DigestPreview(props) {
  useInjectReducer({ key: 'digest', reducer: digestReducer });
  useInjectSaga({ key: 'digest', saga: digestSaga });
  useInjectReducer({ key: 'digestPreview', reducer });
  useInjectSaga({ key: 'digestPreview', saga });

  const { match, dispatchDigestContent, dispatchCleanDigestContent } = props;

  useEffect(() => () => dispatchCleanDigestContent(), []);

  useEffect(() => {
    dispatchDigestContent({ id: match.params.id });
  }, [match.params.id]);

  const digestContent = useSelector(makeSelectDigestById(match.params.id));

  return (
    <div>
      <Helmet>
        <title>DigestPreview</title>
        <meta name="description" content="Description of DigestPreview" />
      </Helmet>
      <Container maxWidth="lg">
        {!_.isEmpty(digestContent) && (
          <Template4
            digest={digestContent}
            contentUids={digestContent.contents}
          />
        )}
      </Container>
    </div>
  );
}

DigestPreview.propTypes = {
  match: PropTypes.object,
  dispatchDigestContent: PropTypes.func,
  dispatchCleanDigestContent: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatchDigestContent: options => dispatch(digestContentAction(options)),
    dispatchCleanDigestContent: () => dispatch(cleanDigestContent()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DigestPreview);
