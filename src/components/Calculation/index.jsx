import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { urlAPI } from '../../assets/URLs'
import { CalculationContainer, CategoriesWrapper, Category, Text, Table, TableData, TableHead, TableRow } from './CalculationElements'


const Calculation = () => {
  const [categories, setCategories] = useState([])
  const [allData, setAllData] = useState({})
  const [data, setData] = useState({})
  const [page, setPage] = useState(() => ({page: 1, id: 0}))

  useEffect(() => {
    axios.get(urlAPI + '/category/getCategory')
    .then(res => {
      setCategories(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    if(page.id!==0){
      axios.get(urlAPI + `/survey/countCategory?id=${page.id}`)
      .then(res => {
        if(Object.keys(res.data).length > 0){
          setData(res.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }else{
      axios.get(urlAPI + '/survey/countAll')
      .then(res => {
        setAllData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [page])

  const renderAllCalculation = () => {
    if(Object.keys(allData).length > 0){
      return allData.minimumClusterArrays.map((key, index) => (
        <Table>
          <TableData>{index+1}{index+1 == 1 ? 'st' : index+1 == 2 ? 'nd' : index+1 == 3 ? 'rd' : 'th'} Iteration</TableData>
          <TableRow>
            <TableHead>No.</TableHead>
            {
              categories.map(category => (
                <TableHead>{category.category_name.toUpperCase()}</TableHead>
              ))
            }
            <TableHead>RESULT CLUSTER 1</TableHead>
            <TableHead>RESULT CLUSTER 2</TableHead>
            <TableHead>RESULT CLUSTER 3</TableHead>
            <TableHead>RESULT CLUSTER 4</TableHead>
            <TableHead>CLOSEST DISTANCE</TableHead>
            <TableHead>CLUSTER</TableHead>
          </TableRow>
          {
            allData.data.map((newData, newDataIndex) => (
              <TableRow>
                <TableData>{newDataIndex+1}.</TableData>
                {
                  allData.data[newDataIndex].map(newData2 => (
                    <TableData>{newData2}</TableData>
                  ))
                }
                {
                  allData.resultArrays[index][newDataIndex].map(result => (
                    <TableData>{result.toFixed(4)}</TableData>
                  ))
                }
                <TableData>{allData.minimumClusterArrays[index][newDataIndex]+1}</TableData>
                <TableData>{allData.minimumClusterArrays[index][newDataIndex] == 0 ? 'Facebook' : allData.minimumClusterArrays[index][newDataIndex] == 1 ? 'Instagram' : allData.minimumClusterArrays[index][newDataIndex] == 2 ? 'Twitter' : allData.minimumClusterArrays[index][newDataIndex] == 3 ? 'Tiktok' : 'Not Clustered'}</TableData>
              </TableRow>
            ))
          }
        </Table>
      ))
    }
  }

  const renderCategories = () => {
    return categories.map((key, index) => (
      <Category key={key.id} page={page.page} onClick={() => setPage({page: index+2, id: key.id})}>
        <Text>{key.category_name.toUpperCase()}</Text>
      </Category>
    ))
  }

  const renderCalculation = () => {
    if(Object.keys(data).length > 0){
      return data.record.map((key, index) => (
        <TableRow>
          <TableData>{index+1}.</TableData>
          <TableData>{key}</TableData>
          {
            data.clusterResult[index].map(val => (
              <TableData>{val}</TableData>
            ))
          }
          <TableData>{data.minimumCluster[index]}</TableData>
          <TableData>{data.minimumCluster[index] == 1 ? 'Facebook' : data.minimumCluster[index] == 2 ? 'Instagram' : data.minimumCluster[index] == 3 ? 'Twitter' : data.minimumCluster[index] == 4 ? 'Tiktok' : 'Not Clustered'}</TableData>
        </TableRow>
      ))
    }
  }

  return (
    <CalculationContainer>
      <CategoriesWrapper>
        <Category page={page.page} onClick={() => setPage({page: 1, id: 0})}>
          <Text>All</Text>
        </Category>
        {renderCategories()}
      </CategoriesWrapper>
      {
        page.id !== 0 ?
        <Table>
          <TableRow>
            <TableHead>NO.</TableHead>
            <TableHead>{categories[page.page-2].category_name.toUpperCase()}</TableHead>
            <TableHead>RESULT CLUSTER 1</TableHead>
            <TableHead>RESULT CLUSTER 2</TableHead>
            <TableHead>RESULT CLUSTER 3</TableHead>
            <TableHead>RESULT CLUSTER 4</TableHead>
            <TableHead>CLOSEST DISTANCE</TableHead>
            <TableHead>CLUSTER</TableHead>
          </TableRow>
          {renderCalculation()}
        </Table>
        :
        renderAllCalculation()
      }
    </CalculationContainer>
  )
}

export default Calculation
