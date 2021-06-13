import styled, { css } from "styled-components";

export const SurveyContainer = styled.div`
  height: 100%;
  padding: 80px 20vw 50px 20vw;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const BarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const Bar = styled.div`
  background-color: #C4C4C4;
  height: 10px;
  width: calc(calc(100vw - 45vw) / 3);

  ${({active}) => {
    return css`
      &:nth-child(${active}){
        background-color: #00B88D;
      }
    `
  }}
`

export const Title = styled.h3`
  text-align: center;
`;

export const QuestionWrapper = styled.div`
  margin-top: 50px;
`;
export const Text = styled.label``;

export const AnswerWrapper = styled.div``;

export const Radio = styled.input`
  margin: 10px;
  &:checked:after {
    width: 11px;
    height: 11px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #00b88d;
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }
`;

export const TextInput = styled(Radio)`
  border: 1px solid #e23b51;
  outline: none;
  border-radius: 5px;
  width: 96.5%;
  height: 35px;
  padding: 5px;
  transition: border 0.5s ease;

  ${({ validation }) => {
    if (validation) {
      return css`
        border: 1px solid #00b88d;
      `;
    }
  }}
`;

export const Button = styled.button`
  align-self: center;
  width: 50%;
  height: 5vh;
  margin-top: 50px;
  border: 1px transparent;
  background-color: #00b88d;
  color: #ffffff;
  font-size: 1.1em;
  border-radius: 5px;

  &:active {
    background-color: #3ab396;
  }

  &:disabled{
    background-color: #C4C4C4;
  }
`;
