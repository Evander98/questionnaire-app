import styled from 'styled-components'

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 10vw 0 10vw;
`

export const CategoryTitle = styled.h3`
  text-align: center;
`

export const CategoryBox = styled.div`
  background: #E9E8E8;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0 10px 0;
`

export const CategoryInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const CategoryInputText = styled.input`
  border: none;
  outline: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 96.5%;
  height: 35px;
  padding: 5px;
  
  &:focus{
    border: 1px solid #00B88D;
  }
`

export const CategoryButtonIcon = styled.button`
  background-color: #FFFFFF;
  border: none;
  padding: 5px;
  width: 35px;
  height: 35px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`

export const CategoryText = styled.p`
  margin: 15px 0 5px 0;
`

export const CategoryDeleteItemWrapper = styled(CategoryInputWrapper)`
  margin-top: 5px;
  border-bottom: 1px solid #C4C4C4;
  align-items: center;
  padding: 5px;
`
