import styled, { css } from 'styled-components'

export const ResultContainer = styled.div`
  height: 100%;
  padding: 80px 20vw 50px 20vw;
`

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`

export const Category = styled.div`
  min-width: 10%;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  text-align: center;
  cursor: default;

  ${({page}) => {
    return css`
      &:nth-child(${page}){
        background-color: #E9E8E8;
      }
    `
  }}
`

export const Text = styled.p``

export const Table = styled.table`
  margin-bottom: 100px;
`

export const TableRow = styled.tr`
  &:not(:first-child){
    &:hover{
      background-color: #dddddd;
    }
  }
`

export const TableHead = styled.th`
  background-color: rgba(0, 184, 141, 0.5);
  text-align: center;
  padding: 5px;
`

export const TableData = styled.td`
  text-align: center;
  padding: 5px;
`

