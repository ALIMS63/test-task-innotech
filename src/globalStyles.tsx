import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
html{
  min-height: 100vh;
}
body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 1.25;
    color: #0E0D3D;
    position: relative;
    font-weight: 400;
    background: #F7F8FA;
    background-repeat: no-repeat;
    height: 100%;
    scrollbar-width: none;
    &::-webkit-scrollbar {
  display: none;
}
}
img{
    max-width: 100%;
}
a{
  text-decoration: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}

button {
  outline: none;
  border: 0;
}
`;

export const Container = styled.div<{
  pNone?: boolean;
  bigMargin?: boolean;
  ppNone?: boolean;
  dpNone?: boolean;
}>`
  -webkit-background-clip: content-box;
  background-clip: content-box;
  z-index: 1;
  width: 100%;
  max-width: 1080px;
  margin-right: auto;
  margin-left: auto;
  padding-right: ${(props) => (props.dpNone ? '0' : '10px')};
  padding-left: ${(props) => (props.dpNone ? '0' : '10px')};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width: 992px) {
    padding-right: ${(props) => (props.pNone ? '0' : '20px')};
    padding-left: ${(props) => (props.pNone ? '0' : '20px')};
  }

  @media only screen and (max-device-width: 480px) {
    ${({ ppNone }) => {
      if (ppNone) {
        return `
          padding-left: 0;
          padding-right: 0;
        `;
      }
    }}
  }
`;

export default GlobalStyle;
