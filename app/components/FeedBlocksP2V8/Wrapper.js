/* eslint-disable indent */
import styled, { css } from 'styled-components';
import Chip from '@material-ui/core/Chip';
import { PlayCircleOutline } from '@material-ui/icons';
import placeholder from 'images/icons/IMAGE_icon.svg';

const roundedBox = css`
  border-radius: 10px;
  background-color: rgba(20, 60, 125, 0.04);
`;

const RoundedBox = styled.div`
  ${roundedBox}
  cursor: pointer;
  padding: 16px;
`;

const Thumb = styled.div`
  position: relative;
  background-image: ${props =>
    props.$background_image
      ? `url(${props.$background_image})${
          props.$placeholder ? `, url(${placeholder})` : ''
        }`
      : `none${props.$placeholder ? `, url(${placeholder})` : ''}`};
  background-repeat: ${props =>
    props.$placeholder ? 'no-repeat, no-repeat' : 'no-repeat'};
  background-size: ${props =>
    props.$background_size
      ? `${props.$background_size}${props.$placeholder ? ', auto 50%' : ''}`
      : `cover${props.$placeholder ? ', auto 50%' : ''}`};
  background-position: ${props =>
    props.$background_position
      ? `${props.$background_position}${props.$placeholder ? ',center' : ''}`
      : `center${props.$placeholder ? ', center' : ''}`};
  &:before {
    padding-top: ${props =>
      props.$count ? `${(100 / 3) * props.$count}%` : '100%'};
    content: '';
    display: block;
  }
`;

const Thumbnail = styled(Thumb)`
  ${roundedBox}
  cursor: pointer;
  width: 100%;
  overflow: hidden;
`;

const LinkBox = styled.div`
  ${roundedBox}
  cursor: pointer;
  padding: 32px;
  padding-bottom: 46px;
`;

const LinkThumbnail = styled(Thumb)`
  width: 100%;
`;

const DocumentThumbnail = styled(Thumb)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
`;

const PlayCircle = styled(PlayCircleOutline)`
  color: #fff;
  font-size: 3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const EventBox = styled.div`
  ${roundedBox}
  padding: 32px 48px;
  padding-bottom: 46px;
  margin: 0 15px;
`;

const TimeChip = styled(Chip)`
  border-radius: 5px;
  color: #fff;
  background: #f0bc52;
`;

const Map = styled.div`
  ${roundedBox}
  width: 100%;
  height: calc(100% - 24px);
  border: 3px solid #ffffff;
`;

export {
  Thumbnail,
  PlayCircle,
  RoundedBox,
  DocumentThumbnail,
  LinkBox,
  LinkThumbnail,
  EventBox,
  TimeChip,
  Map,
};
