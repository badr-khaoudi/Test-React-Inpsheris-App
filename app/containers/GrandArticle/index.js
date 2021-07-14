/**
 *
 * GrandArticle
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import Fab from '@material-ui/core/Fab';
import { Close } from '@material-ui/icons';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'containers/HomeFeed/navigation.scss';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Template1,
  Template2,
  Template3,
} from 'components/GrandArticleTemplates';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { content } from './actions';
import { makeSelectContentSuccess } from './selectors';

export function GrandArticle(props) {
  useInjectReducer({ key: 'grandArticle', reducer });
  useInjectSaga({ key: 'grandArticle', saga });

  const { history, match } = props;
  const dispatch = useDispatch();
  const contentSuccess = useSelector(makeSelectContentSuccess());

  const handleClose = () => {
    if (history.action === 'POP') {
      history.push({ pathname: '/' });
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    dispatch(
      content({
        uid: match.params.content,
        referer: match.params.referer,
        track: match.params.track,
      }),
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>GrandArticle</title>
        <meta name="description" content="Description of GrandArticle" />
      </Helmet>
      <Fab
        size="small"
        color="primary"
        style={{ position: 'fixed', top: 80, right: 5, zIndex: 10 }}
        onClick={handleClose}
      >
        <Close />
      </Fab>
      {contentSuccess && (
        <>
          {match.params.template === '1' && (
            <Template1 uid={match.params.content} />
          )}
          {match.params.template === '2' && (
            <Template2 uid={match.params.content} />
          )}
          {match.params.template === '3' && (
            <Template3 uid={match.params.content} />
          )}
        </>
      )}
    </>
  );
}

GrandArticle.propTypes = { match: PropTypes.object, history: PropTypes.object };

export default memo(GrandArticle);
