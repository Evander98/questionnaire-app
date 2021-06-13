import styled from 'styled-components'

export const RegisterContainer = styled.div`
  height: 100vh;
  background: #D2D2D2;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const RegisterBox = styled.div`
  width: 20vw;
  height: 55vh;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 35px;
`

export const RegisterTitle = styled.h1`
  font-size: 1.7em;
  font-weight: 700;
`

export const TextInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 2px solid #EBEBEB;
  font-size: 1.1em;
`

export const RegisterButton = styled.button`
  width: 100%;
  height: 5vh;
  border: 1px transparent;
  background-color: #00B88D;
  color: #FFFFFF;
  font-size: 1.1em;
  border-radius: 5px;

  &:active{
    background-color: #3ab396;
  }
`