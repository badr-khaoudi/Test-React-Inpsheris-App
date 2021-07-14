import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Thumbnail } from 'components/FeedTypes/Wrapper';

const VideoGridItem = styled(Paper)`
  display: flex;
  flex-direction: column;
  .MuiFormControlLabel-root {
    margin-left: 0;
  }
  .MuiFormControlLabel-label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const VideoListItem = styled(Paper)`
  display: flex;
  flex-direction: column;
  .MuiFormControlLabel-root {
    margin-left: 0;
  }
  .MuiFormControlLabel-label {
    width: 100%;
  }
  .MuiFormLabel-root {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const UploadGrid = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 2px dotted rgb(118, 132, 147);
  &:before {
    padding-top: 100%;
    content: '';
    float: left;
  }
`;

const FileName = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  color: #fff;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  ${Thumbnail}:hover & {
    display: flex;
  }
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ActionButton = styled(ButtonBase)`
  padding: 5px;
`;

const EditButton = styled(ActionButton)`
  display: none;
  ${Thumbnail}:hover & {
    display: inline-flex;
  }
`;

const CommunitySelect = styled.div`
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  padding: 10.5px 14px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.23);
  p {
    line-height: 1;
  }
  overflow: hidden;
  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
    cursor: pointer;
  }
`;

export {
  VideoGridItem,
  VideoListItem,
  UploadGrid,
  FileName,
  Actions,
  ActionButton,
  EditButton,
  CommunitySelect,
};
