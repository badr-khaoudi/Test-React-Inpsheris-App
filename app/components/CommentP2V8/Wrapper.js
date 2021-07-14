/* eslint-disable indent */
import styled from 'styled-components';
import { OutlinedIconButton } from 'utils/helpers/iconButton';
import { CheckCircleOutline } from '@material-ui/icons';

const CommentBox = styled.div`
  padding: 16px;
  border-radius: 0 10px 10px;
  background-color: #f9f9f9;
  border: 1px solid #d1deeb;
  margin-left: 24px;
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 0px;
    height: 0px;
    top: -1px;
    left: -24px;
    border-top: 16px solid #d1deeb;
    border-left: 24px solid transparent;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 0px;
    height: 0px;
    top: 0px;
    left: -21px;
    border-top: 14px solid #f9f9f9;
    border-left: 21px solid transparent;
  }
`;

const RoundButton = styled(OutlinedIconButton)`
  padding: 6px;
  font-size: 1.5rem;
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;

const CheckCircle = styled(CheckCircleOutline)`
  ${({ theme, $isSatisfiedComment }) => `
    color: ${
      $isSatisfiedComment
        ? theme.palette.success.main
        : theme.palette.text.secondary
    };
  `}
`;

export { CommentBox, RoundButton, CheckCircle };
