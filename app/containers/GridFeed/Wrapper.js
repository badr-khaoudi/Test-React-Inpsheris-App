import styled from 'styled-components';

const ThumbnailText = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  width: calc(100% - 30px);
  padding: 16px;
  left: 0;
  bottom: 0;
`;

const SmallImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.backgroundColor};
`;

export { ThumbnailText, SmallImage };
