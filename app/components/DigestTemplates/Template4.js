/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/**
 *
 * Template4
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectCustomTemplateList } from 'containers/AuthBase/selectors';
import {
  makeSelectCarouselList,
  makeSelectPinnedContent,
} from 'containers/Digest/selectors';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import {
  carouselList,
  pinnedContent as pinnedContentAction,
} from 'containers/Digest/actions';
import { createMarkup } from 'utils/helpers/createMarkup';
import useFeedModalPath from 'utils/helpers/useFeedModalPath';
import logo from 'images/logo.png';
import articles from 'images/digest/articles-50x50.png';
import docs from 'images/digest/docs-50x50.png';
import events from 'images/digest/events-50x50.png';
import grandarticles from 'images/digest/grandarticles-50x50.png';
import images from 'images/digest/images-50x50.png';
import links from 'images/digest/links-50x50.png';
import qps from 'images/digest/qps-50x50.png';
import videos from 'images/digest/videos-50x50.png';
import './Template4.scss';

const contentImage = type => {
  if (type === 'imageGallery') {
    return images;
  }
  if (type === 'document') {
    return docs;
  }
  if (type === 'event') {
    return events;
  }
  if (type === 'quickpost') {
    return qps;
  }
  if (type === 'video') {
    return videos;
  }
  if (type === 'quickSharingOfTheLink') {
    return links;
  }
  if (type === 'article') {
    return articles;
  }
  if (type === 'grandArticle') {
    return grandarticles;
  }
  return qps;
};

const Content = ({ contentUid }) => {
  const content = useSelector(makeSelectFeed(contentUid));
  const heading = _.find(content.blocks, { type: 'heading' });
  const contentPath = useFeedModalPath(
    content.community,
    content.communityTab,
    content.uid,
    'readmore',
    'digest',
  );

  return (
    <div
      className="column"
      style={{
        textAlign: 'left',
        color: '#4d4d4d',
        fontSize: 14,
        lineHeight: '21px',
        fontFamily:
          'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
        float: 'left',
        maxWidth: 320,
        minWidth: 300,
        width: 320,
      }}
    >
      <div
        className="column"
        style={{
          textAlign: 'left',
          color: '#4d4d4d',
          fontSize: 14,
          lineHeight: '21px',
          fontFamily:
            'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
          float: 'left',
          maxWidth: 320,
          minWidth: 300,
          width: 320,
        }}
      >
        <div
          style={{
            marginLeft: 20,
            MarginRight: 20,
            marginTop: 24,
            height: 132,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontStyle: 'normal',
              fontWeight: 'normal',
              lineHeight: '19px',
              marginBottom: 20,
            }}
            align="center"
          >
            <img
              src={
                content.type === 'article' &&
                !_.isEmpty(heading) &&
                heading.imageGridviewSmallThumb
                  ? heading.imageGridviewSmallThumb
                  : contentImage(content.type)
              }
              style={{
                border: 0,
                display: 'block',
                height: 'auto',
                width: 112,
                maxWidth: '100%',
                maxHeight: 112,
              }}
              alt=""
              width="112"
            />
          </div>
        </div>

        <div style={{ marginLeft: 20, marginRight: 20 }}>
          <div>
            <h3
              className="size-16"
              style={{
                marginTop: 0,
                marginBottom: 12,
                fontStyle: 'normal',
                fontWeight: 'normal',
                color: '#1c692d',
                fontSize: 16,
                lineHeight: '24px',
                fontFamily:
                  'droid sans,apple sd gothic neo,segoe ui,dejavu sans,trebuchet ms,sans-serif',
              }}
              lang="x-size-16"
            >
              <span className="font-droid-sans">
                <strong>{content.title}</strong>
              </span>
            </h3>
          </div>
        </div>

        {(content.type === 'article' || content.type === 'grandArticle') &&
          content.richText && (
            <div style={{ marginLeft: 20, marginRight: 20 }}>
              <div>
                <p
                  className="size-12"
                  style={{
                    marginTop: 0,
                    marginBottom: 20,
                    fontFamily: 'open sans,sans-serif',
                    fontSize: 12,
                    lineHeight: '19px',
                  }}
                  lang="x-size-12"
                >
                  <span
                    className="font-open-sans"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={createMarkup(content.richText)}
                  />
                </p>
              </div>
            </div>
          )}

        {content.type === 'quickSharingOfTheLink' && (
          <div
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
            }}
          >
            <div>
              <a
                style={{
                  textDecoration: 'none',
                  fontFamily: 'open sans,sans-serif',
                  lineHeight: '14px',
                  fontSize: 12,
                  color: '#666666',
                }}
                href={content.url}
                target="_blank"
              >
                <span className="font-open-sans">{content.url}</span>
              </a>
            </div>
          </div>
        )}

        <div
          style={{
            marginLeft: 20,
            MarginRight: 20,
            marginBottom: 24,
            lineHeight: 1,
          }}
        >
          <div
            className="btn btn--flat btn--small"
            style={{
              textAlign: 'left',
              padding: 0,
              display: 'block',
            }}
          >
            <a
              style={{
                borderRadius: 10,
                display: 'inline-block',
                fontSize: 11,
                lineHeight: '19px',
                fontWeight: 'bold',
                padding: '4px 10px',
                textAlign: 'center',
                textDecoration: 'none !important',
                transition: 'opacity 0.1s ease-in',
                color: '#ffffff',
                backgroundColor: '#1c692d',
                fontFamily:
                  'Droid Sans, Apple SD Gothic Neo, Segoe UI, DejaVu Sans, Trebuchet MS, sans-serif',
              }}
              href={`#!${contentPath}`}
              target="_blank"
            >
              Lire la suite &gt;&gt;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Content.propTypes = {
  contentUid: PropTypes.string,
};

function Template4(props) {
  const { digest, contentUids } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(carouselList());
    dispatch(pinnedContentAction());
  }, []);

  const digestLogo = useSelector(makeSelectCustomTemplateList('Digest Logo'));
  const { sliderLevel1, sliderLevel2 } = useSelector(makeSelectCarouselList());
  const pinnedContent = _.head(useSelector(makeSelectPinnedContent())) || {};

  const pinnedContentHeading = _.find(pinnedContent.blocks, {
    type: 'heading',
  });

  const pinnedContentRichText = _.find(pinnedContent.blocks, {
    type: 'richText',
  });

  const pinnedContentPath = useFeedModalPath(
    pinnedContent.community,
    pinnedContent.communityTab,
    pinnedContent.uid,
    'readmore',
    'digest',
  );

  const twoCarousel = _.nth(sliderLevel2, 1);

  return (
    <div className="template4">
      <table
        className="wrapper"
        style={{
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
          minWidth: 320,
          width: '100%',
          backgroundColor: '#ccdee8',
        }}
        cellPadding="0"
        cellSpacing="0"
        role="presentation"
      >
        <tbody>
          <tr>
            <td>
              <div role="banner">
                <div
                  className="preheader"
                  style={{
                    margin: '0 auto',
                    maxWidth: 560,
                    minWidth: 280,
                    width: 280,
                  }}
                >
                  <div
                    style={{
                      borderCollapse: 'collapse',
                      display: 'table',
                      width: '100%',
                    }}
                  >
                    <div
                      className="snippet"
                      style={{
                        display: 'table-cell',
                        float: 'left',
                        fontSize: 12,
                        lineHeight: '19px',
                        maxWidth: 280,
                        minWidth: 140,
                        width: 140,
                        padding: '10px 0 5px 0',
                        color: '#4d4d4d',
                        fontFamily:
                          'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                      }}
                    />
                    <div
                      className="webversion"
                      style={{
                        display: 'table-cell',
                        float: 'left',
                        fontSize: 12,
                        lineHeight: '19px',
                        maxWidth: 280,
                        minWidth: 139,
                        width: 139,
                        padding: '10px 0 5px 0',
                        textAlign: 'right',
                        color: '#4d4d4d',
                        fontFamily:
                          'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="layout fixed-width"
                  style={{
                    margin: '0 auto',
                    maxWidth: 600,
                    minWidth: 320,
                    width: 320,
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                    borderBottom: '10px solid #1c692d',
                  }}
                >
                  <div
                    className="layout__inner"
                    style={{
                      borderCollapse: 'collapse',
                      display: 'table',
                      width: '100%',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <div
                      className="column narrow"
                      style={{
                        textAlign: 'left',
                        color: '#4d4d4d',
                        fontSize: 14,
                        lineHeight: '21px',
                        fontFamily:
                          'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                        float: 'left',
                        maxWidth: 320,
                        minWidth: 200,
                        width: 320,
                      }}
                    >
                      <div
                        style={{
                          marginLeft: 20,
                          marginRight: 20,
                          marginTop: 24,
                          marginBottom: 24,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            lineHeight: '19px',
                          }}
                          align="center"
                        >
                          {digest.logo ? (
                            <img
                              src={digest.logo}
                              style={{
                                border: 0,
                                display: 'block',
                                height: 'auto',
                                width: '100%',
                                maxWidth: 127,
                              }}
                              alt=""
                              width="127"
                            />
                          ) : digestLogo && digestLogo.image ? (
                            <img
                              src={digestLogo.image}
                              style={{
                                border: 0,
                                display: 'block',
                                height: 'auto',
                                width: '100%',
                                maxWidth: 127,
                              }}
                              alt=""
                              width="127"
                            />
                          ) : (
                            <img
                              src={logo}
                              style={{
                                border: 0,
                                display: 'block',
                                height: 'auto',
                                width: '100%',
                                maxWidth: 127,
                              }}
                              alt=""
                              width="127"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="column wide"
                      style={{
                        textAlign: 'left',
                        color: '#4d4d4d',
                        fontSize: 14,
                        lineHeight: '21px',
                        fontFamily:
                          'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                        float: 'left',
                        maxWidth: 400,
                        minWidth: 320,
                        width: 320,
                      }}
                    >
                      <div
                        style={{
                          marginLeft: 20,
                          marginRight: 20,
                          marginTop: 24,
                          marginBottom: 24,
                        }}
                      >
                        <div>
                          <h1
                            className="size-26"
                            style={{
                              marginTop: 0,
                              marginBottom: 0,
                              fontStyle: 'normal',
                              fontWeight: 'normal',
                              color: '#1c692d',
                              fontSize: 22,
                              lineHeight: '31px',
                              fontFamily: 'pt sans,trebuchet ms,sans-serif',
                              textAlign: 'center',
                              overflowWrap: 'break-word',
                              wordWrap: 'break-word',
                              wordBreak: 'break-word',
                            }}
                            lang="x-size-26"
                          >
                            <span className="font-pt-sans">
                              <a
                                style={{
                                  textDecoration: 'none',
                                  transition: 'opacity 0.1s ease-in',
                                  color: '#1c692d',
                                }}
                                href={`/#!/digest/${digest.id}`}
                                target="_blank"
                              >
                                <strong>
                                  {digest.emailSubject || digest.title}
                                </strong>
                              </a>
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Banner container --> */}
                {!_.isEmpty(sliderLevel1) && (
                  <div
                    className="layout one-col fixed-width"
                    style={{
                      margin: '0 auto',
                      maxWidth: 600,
                      minWidth: 320,
                      width: 320,
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      wordBreak: 'break-word',
                    }}
                  >
                    <div
                      className="layout__inner"
                      style={{
                        borderCollapse: 'collapse',
                        display: 'table',
                        width: '100%',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <div
                        className="column"
                        style={{
                          textAlign: 'left',
                          color: '#4d4d4d',
                          fontSize: 14,
                          lineHeight: '21px',
                          fontFamily:
                            'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                          maxWidth: 600,
                          minWidth: 320,
                          width: 320,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            lineHeight: '19px',
                          }}
                          align="center"
                        >
                          <img
                            className="gnd-corner-image gnd-corner-image-center gnd-corner-image-top"
                            style={{
                              border: 0,
                              display: 'block',
                              height: 'auto',
                              width: '100%',
                              maxWidth: 900,
                            }}
                            alt=""
                            width="600"
                            src={_.head(sliderLevel1).imageLevel1.sliderUrl}
                          />
                        </div>

                        <div
                          style={{
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 20,
                          }}
                        >
                          <div>
                            <h2
                              className="size-20"
                              style={{
                                marginTop: 0,
                                marginBottom: 16,
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                color: '#1c692d',
                                fontSize: 17,
                                lineHeight: '26px',
                                fontFamily:
                                  'droid sans,apple sd gothic neo,segoe ui,dejavu sans,trebuchet ms,sans-serif',
                                textAlign: 'center',
                              }}
                              lang="x-size-20"
                            >
                              <span className="font-droid-sans">
                                <strong>{_.head(sliderLevel1).title}</strong>
                              </span>
                            </h2>
                          </div>
                        </div>

                        <div
                          style={{
                            marginLeft: 20,
                            MarginRight: 20,
                            marginBottom: 24,
                            lineHeight: 1,
                          }}
                        >
                          <div
                            className="btn btn--flat btn--small"
                            style={{
                              textAlign: 'center',
                              padding: 0,
                              display: 'block',
                            }}
                          >
                            <a
                              style={{
                                borderRadius: 10,
                                display: 'inline-block',
                                fontSize: 11,
                                fontWeight: 'bold',
                                lineHeight: '19px',
                                padding: '4px 10px',
                                textAlign: 'center',
                                textDecoration: 'none !important',
                                transition: 'opacity 0.1s ease-in',
                                color: '#ffffff',
                                backgroundColor: '#1c692d',
                                fontFamily:
                                  'Droid Sans, Apple SD Gothic Neo, Segoe UI, DejaVu Sans, Trebuchet MS, sans-serif',
                              }}
                              href={_.head(sliderLevel1).url}
                              target="_blank"
                            >
                              Lire la suite &gt;&gt;
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!_.isEmpty(pinnedContent) && (
                  <div
                    className={`layout fixed-width ${
                      pinnedContentHeading && pinnedContentHeading.imageHeader
                        ? 'two-col'
                        : 'one-col'
                    }`}
                    style={{
                      margin: '0 auto',
                      maxWidth: 600,
                      minWidth: 320,
                      width: 320,
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      wordBreak: 'break-word',
                    }}
                  >
                    <div
                      className="layout__inner"
                      style={{
                        borderCollapse: 'collapse',
                        display: 'table',
                        width: '100%',
                        backgroundColor: '#1c692d',
                      }}
                    >
                      {pinnedContentHeading &&
                        pinnedContentHeading.imageHeader && (
                          <div
                            className="column"
                            style={{
                              textAlign: 'left',
                              color: '#4d4d4d',
                              fontSize: 14,
                              lineHeight: '21px',
                              fontFamily:
                                'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                              float: 'left',
                              maxWidth: 320,
                              minWidth: 300,
                              width: 320,
                              verticalAlign: 'middle',
                              display: 'table-cell',
                            }}
                          >
                            <div
                              style={{
                                marginLeft: 20,
                                MarginRight: 20,
                                marginTop: 24,
                                marginBottom: 24,
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 12,
                                  fontStyle: 'normal',
                                  fontWeight: 'normal',
                                  lineHeight: '19px',
                                }}
                                align="center"
                              >
                                <img
                                  style={{
                                    border: 0,
                                    display: 'block',
                                    height: 'auto',
                                    width: '100%',
                                    maxWidth: 226,
                                  }}
                                  alt=""
                                  width="226"
                                  src={pinnedContentHeading.imageHeader}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                      <div
                        className="column"
                        style={{
                          textAlign: 'left',
                          color: '#4d4d4d',
                          fontSize: 14,
                          lineHeight: '21px',
                          fontFamily:
                            'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                          float: 'left',
                          maxWidth: 320,
                          minWidth: 300,
                          width: 320,
                          display: 'table-cell',
                          verticalAlign: 'middle',
                        }}
                      >
                        <div
                          style={{
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 24,
                          }}
                        >
                          <div>
                            <h3
                              className="size-20"
                              style={{
                                marginTop: 0,
                                marginBottom: 12,
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                color: '#1c692d',
                                fontSize: 17,
                                lineHeight: '26px',
                                fontFamily:
                                  'droid sans,apple sd gothic neo,segoe ui,dejavu sans,trebuchet ms,sans-serif',
                              }}
                              lang="x-size-20"
                            >
                              <span className="font-droid-sans">
                                <a
                                  style={{
                                    textDecoration: 'none',
                                    transition: 'opacity 0.1s ease-in',
                                    color: '#1c692d',
                                  }}
                                  href={
                                    pinnedContentPath
                                      ? `#!${pinnedContentPath}`
                                      : '#!/#'
                                  }
                                  target="_blank"
                                >
                                  <strong>
                                    <span style={{ color: '#ffffff' }}>
                                      {pinnedContentHeading &&
                                        pinnedContentHeading.title}
                                    </span>
                                  </strong>
                                </a>
                              </span>
                            </h3>
                          </div>
                        </div>

                        {pinnedContentRichText &&
                          pinnedContentRichText.content && (
                            <div style={{ marginLeft: 20, MarginRight: 20 }}>
                              <div>
                                <p
                                  className="size-12"
                                  style={{
                                    marginTop: 0,
                                    marginBottom: 20,
                                    fontFamily:
                                      'droid sans,apple sd gothic neo,segoe ui,dejavu sans,trebuchet ms,sans-serif',
                                    fontSize: 12,
                                    lineHeight: '19px',
                                  }}
                                  lang="x-size-12"
                                >
                                  <span className="font-droid-sans">
                                    <span
                                      style={{ color: '#ffffff' }}
                                      // eslint-disable-next-line react/no-danger
                                      dangerouslySetInnerHTML={createMarkup(
                                        pinnedContentRichText.content,
                                      )}
                                    />
                                  </span>
                                </p>
                              </div>
                            </div>
                          )}

                        {pinnedContentPath && (
                          <div
                            style={{
                              marginLeft: 20,
                              MarginRight: 20,
                              marginBottom: 24,
                              lineHeight: 1,
                            }}
                          >
                            <div
                              className="btn btn--flat btn--small"
                              style={{
                                textAlign: 'left',
                                padding: 0,
                                display: 'block',
                              }}
                            >
                              <a
                                style={{
                                  borderRadius: 10,
                                  display: 'inline-block',
                                  fontSize: 11,
                                  fontWeight: 'bold',
                                  lineHeight: '19px',
                                  padding: '4px 10px',
                                  textAlign: 'center',
                                  textDecoration: 'none !important',
                                  transition: 'opacity 0.1s ease-in',
                                  color: '#1c692d',
                                  backgroundColor: '#ffffff',
                                  fontFamily:
                                    'Droid Sans, Apple SD Gothic Neo, Segoe UI, DejaVu Sans, Trebuchet MS, sans-serif',
                                }}
                                href={`#!${pinnedContentPath}`}
                                target="_blank"
                              >
                                Lire la suite &gt;&gt;
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {_.isEmpty(pinnedContent) && twoCarousel && (
                  <div
                    className="layout fixed-width two-col"
                    style={{
                      margin: '0 auto',
                      maxWidth: 600,
                      minWidth: 320,
                      width: 320,
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      wordBreak: 'break-word',
                    }}
                  >
                    <div
                      className="layout__inner"
                      style={{
                        borderCollapse: 'collapse',
                        display: 'table',
                        width: '100%',
                        backgroundColor: '#1c692d',
                      }}
                    >
                      <div
                        className="column"
                        style={{
                          textAlign: 'left',
                          color: '#4d4d4d',
                          fontSize: 14,
                          lineHeight: '21px',
                          fontFamily:
                            'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                          float: 'left',
                          maxWidth: 320,
                          minWidth: 300,
                          width: 320,
                          verticalAlign: 'middle',
                          display: 'table-cell',
                        }}
                      >
                        <div
                          style={{
                            marginLeft: 20,
                            MarginRight: 20,
                            marginTop: 24,
                            marginBottom: 24,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 12,
                              fontStyle: 'normal',
                              fontWeight: 'normal',
                              lineHeight: '19px',
                            }}
                            align="center"
                          >
                            <img
                              style={{
                                border: 0,
                                display: 'block',
                                height: 'auto',
                                width: '100%',
                                maxWidth: 226,
                              }}
                              alt=""
                              width="226"
                              src={twoCarousel.imageLevel2.thumbGalleryUrl}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="column"
                        style={{
                          textAlign: 'left',
                          color: '#4d4d4d',
                          fontSize: 14,
                          lineHeight: '21px',
                          fontFamily:
                            'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                          float: 'left',
                          maxWidth: 320,
                          minWidth: 300,
                          width: 320,
                          display: 'table-cell',
                          verticalAlign: 'middle',
                        }}
                      >
                        <div
                          style={{
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 24,
                          }}
                        >
                          <div>
                            <h3
                              className="size-20"
                              style={{
                                marginTop: 0,
                                marginBottom: 12,
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                color: '#1c692d',
                                fontSize: 17,
                                lineHeight: '26px',
                                fontFamily:
                                  'droid sans,apple sd gothic neo,segoe ui,dejavu sans,trebuchet ms,sans-serif',
                              }}
                              lang="x-size-20"
                            >
                              <span className="font-droid-sans">
                                <a
                                  style={{
                                    textDecoration: 'none',
                                    transition: 'opacity 0.1s ease-in',
                                    color: '#1c692d',
                                  }}
                                  href={
                                    twoCarousel.url ? twoCarousel.url : '#!/#'
                                  }
                                  target="_blank"
                                >
                                  <strong>
                                    <span style={{ color: '#ffffff' }}>
                                      {twoCarousel.title}
                                    </span>
                                  </strong>
                                </a>
                              </span>
                            </h3>
                          </div>
                        </div>

                        {twoCarousel.subTitle && (
                          <div style={{ marginLeft: 20, MarginRight: 20 }}>
                            <div>
                              <p
                                className="size-12"
                                style={{
                                  marginTop: 0,
                                  marginBottom: 20,
                                  fontFamily:
                                    'droid sans,apple sd gothic neo,segoe ui,dejavu sans,trebuchet ms,sans-serif',
                                  fontSize: 12,
                                  lineHeight: '19px',
                                }}
                                lang="x-size-12"
                              >
                                <span className="font-droid-sans">
                                  <span style={{ color: '#ffffff' }}>
                                    {twoCarousel.subTitle}
                                  </span>
                                </span>
                              </p>
                            </div>
                          </div>
                        )}

                        {twoCarousel.url && (
                          <div
                            style={{
                              marginLeft: 20,
                              MarginRight: 20,
                              marginBottom: 24,
                              lineHeight: 1,
                            }}
                          >
                            <div
                              className="btn btn--flat btn--small"
                              style={{
                                textAlign: 'left',
                                padding: 0,
                                display: 'block',
                              }}
                            >
                              <a
                                style={{
                                  borderRadius: 10,
                                  display: 'inline-block',
                                  fontSize: 11,
                                  fontWeight: 'bold',
                                  lineHeight: '19px',
                                  padding: '4px 10px',
                                  textAlign: 'center',
                                  textDecoration: 'none !important',
                                  transition: 'opacity 0.1s ease-in',
                                  color: '#1c692d',
                                  backgroundColor: '#ffffff',
                                  fontFamily:
                                    'Droid Sans, Apple SD Gothic Neo, Segoe UI, DejaVu Sans, Trebuchet MS, sans-serif',
                                }}
                                href={twoCarousel.url}
                                target="_blank"
                              >
                                Lire la suite &gt;&gt;
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* <!-- Static contents --> */}
                <div
                  className="layout one-col fixed-width"
                  style={{
                    margin: '0 auto',
                    maxWidth: 600,
                    minWidth: 320,
                    width: 320,
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                  }}
                >
                  <div
                    className="layout__inner"
                    style={{
                      borderCollapse: 'collapse',
                      display: 'table',
                      width: '100%',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <div
                      className="column"
                      style={{
                        textAlign: 'left',
                        color: '#4d4d4d',
                        fontSize: 14,
                        lineHeight: '21px',
                        fontFamily:
                          'Droid Sans,Apple SD Gothic Neo,Segoe UI,DejaVu Sans,Trebuchet MS,sans-serif',
                        maxWidth: 600,
                        minWidth: 320,
                        width: 320,
                      }}
                    >
                      <div
                        style={{
                          marginLeft: 20,
                          marginRight: 20,
                          marginTop: 24,
                        }}
                      >
                        <div>
                          <h2
                            style={{
                              marginTop: 0,
                              marginBottom: 0,
                              fontStyle: 'normal',
                              fontWeight: 'normal',
                              color: '#1c692d',
                              fontSize: 17,
                              lineHeight: '26px',
                              fontFamily:
                                'droid sans,apple sd gothic neo,segoe ui,dejavu sans,trebuchet ms,sans-serif',
                              textAlign: 'center',
                            }}
                          >
                            <span className="font-droid-sans">
                              <strong>Découvrez d’autres articles</strong>
                            </span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {_.map(_.chunk(contentUids, 2), (contentChunk, index) => (
                  <div
                    key={index}
                    className="layout two-col fixed-width"
                    style={{
                      margin: '0 auto',
                      maxWidth: 600,
                      minWidth: 320,
                      width: 320,
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      wordbreak: 'break-word',
                    }}
                  >
                    <div
                      className="layout__inner"
                      style={{
                        borderCollapse: 'collapse',
                        display: 'table',
                        width: '100%',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {_.map(contentChunk, content => (
                        <Content key={content} contentUid={content} />
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ lineHeight: 1, fontSize: 40 }}>&nbsp;</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

Template4.propTypes = {
  digest: PropTypes.object,
  contentUids: PropTypes.array,
};

export default memo(Template4);
