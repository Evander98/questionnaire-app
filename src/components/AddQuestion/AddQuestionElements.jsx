import styled from 'styled-components'

export const AddQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 10vw 0 10vw;
`

export const AddQuestionTitle = styled.h3`
  text-align: center;
`

export const QuestionBox = styled.div`
  background: #E9E8E8;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0 10px 0;
`

export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputText = styled.input`
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

export const ButtonIcon = styled.button`
  background-color: #FFFFFF;
  border: none;
  padding: 5px;
  width: 35px;
  height: 35px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`

export const ItemWrapper = styled.div``

export const QuestionText = styled.p`
  margin: 15px 0 5px 0;
`

export const DeleteItemWrapper = styled(InputWrapper)`
  margin-top: 5px;
  border-bottom: 1px solid #C4C4C4;
  align-items: center;
  padding: 5px;
`

export const SaveButton = styled.button`
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