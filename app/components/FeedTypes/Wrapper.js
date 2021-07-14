import styled from 'styled-components';
import { PlayCircleFilled } from '@material-ui/icons';

const LinkImage = styled.div`
  width: 100%;
  background-image: ${props =>
    props.thumbnail_url ? `url(${props.thumbnail_url})` : 'none'};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  &:before {
    padding-top: 100%;
    content: '';
    display: block;
  }
`;

const ArticleThumb = styled.div`
  width: 100%;
  height: ${props => (props.heading.smallImage ? '200px' : null)};
  background-color: ${props => props.heading.imageGridviewThumbBackgroundColor};
  img {
    width: ${props => (props.heading.smallImage ? 'auto' : '100%')};
    height: ${props => (props.heading.smallImage ? '100%' : 'auto')};
  }
`;

const Document = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  position: relative;
  background-image: ${props =>
    props.thumbnail_url ? `url(${props.thumbnail_url})` : 'none'};
  background-repeat: no-repeat;
  background-size: ${props =>
    props.background_size ? props.background_size : 'cover'};
  background-position: ${props =>
    props.background_position ? props.background_position : 'center'};
  color: #fff;
  &:before {
    padding-top: 100%;
    content: '';
    display: block;
  }
`;

const Play = styled(PlayCircleFilled)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const YammerDescription = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 40%;
  max-height: 40%;
  padding: 5px 10px;
`;

const More = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(112, 112, 112, 0.8);
  color: #fff;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Calender = styled.div`
  background-color: #f0f4f5;
  padding: 5px 25px;
  text-align: center;
  border-radius: 5px;
  .day {
    font-weight: 700;
    color: #d44930;
    font-size: 24px;
    display: block;
  }
  .month {
    color: #9fb2b8;
    font-size: 18px;
    text-transform: uppercase;
    display: block;
  }
  .time {
    color: #9fb2b8;
    font-size: 18px;
  }
`;

const DocumentThumb = styled.div`
  height: 70px;
  width: 70px;
  position: relative;
  background-color: #f0f4f5;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${props =>
    props.thumbnail_url ? `url(${props.thumbnail_url})` : 'none'};
  background-repeat: no-repeat;
  background-size: ${props =>
    props.background_size ? props.background_size : 'cover'};
  background-position: center;
`;

const SingleImage = styled.div`
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  &:hover {
    img {
      opacity: 0.8;
    }
  }
`;

const Save = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #1a1a1a;
  display: none;
  color: #fff;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  a {
    color: inherit;
  }
  ${SingleImage}:hover & {
    display: flex;
  }
`;

export {
  LinkImage,
  Thumbnail,
  More,
  Calender,
  Document,
  Play,
  YammerDescription,
  DocumentThumb,
  SingleImage,
  Save,
  ArticleThumb,
};
