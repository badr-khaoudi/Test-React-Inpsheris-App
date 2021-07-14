import styled from 'styled-components';

const LivelyContainer = styled.div`
  ${({ theme }) => `
    margin-top: ${theme.uiConfig.header.height}px;
    min-height: calc(100vh - ${theme.uiConfig.header.height}px);
  `}
`;

export { LivelyContainer };
