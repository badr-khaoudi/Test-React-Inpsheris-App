import styled from 'styled-components';

export const AnchorLinks = styled.div`
  ${({ theme }) => `
    position: fixed;
    right: 0;
    top: 0;
    transform: translate(-30px, 50%);
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    a {
      padding: 5px 15px;
      color: #fff;
      background-color: ${theme.palette.secondary.main};
      &:not(:last-child) {
        border-bottom: thin solid white;
      }
      &:only-child {
        border-radius: 5px;
      }
      &:first-child:not(:only-of-type) {
        border-radius: 5px 5px 0 0;
      }
      &:last-child:not(:only-of-type) {
        border-radius: 0 0 5px 5px;
      }
      &.active {
        background-color: ${theme.palette.grey[400]};
      }
    }
  `}
`;
