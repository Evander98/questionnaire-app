import styled, { css } from 'styled-components'

export const NavbarContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 50px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: space-between;
  padding: 0 60px 0 60px;
`

export const NavbarItemWrapper = styled.div`
  /* background-color: red; */
  min-width: 20vw;
  display: flex;
  justify-content: space-between;
`

export const NavButton = styled.button`
  min-width: 100px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  color: #000000;
  background: transparent;

  &:active{
    color: #008667;
  }

  ${({active}) => {
    if(active){
      return css`
        border-bottom: 2px solid #00B88D;
        color: #00B88D;

        &:active{
          color: #008667;
          border-bottom-color: #008667
        }
      `
    }
  }}
`

export const LoginLogout = styled.button`
  width: 100px;
  padding: 3px;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #00B88D;
  border-radius: 7px;
  color: #00B88D;
  background: transparent;

  &:active{
    color: #008667;
    border-color: #008667;
  }
`