import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { urlAPI } from '../../assets/URLs'
import { CategoriesWrapper, Category, ResultContainer, Table, TableData, TableHead, TableRow, Text } from './ResultElements'

const Result = () => {
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(() => ({page: 1, id: 0}))
  const [frequent, setFrequent] = useState([])

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
    let tempFrequent = [0,0,0,0]
    if(page.id!==0){
      axios.get(urlAPI + `/survey/countCategory?id=${page.id}`)
      .then(res => {
        if(Object.keys(res.data).length > 0){
          res.data.minimumCluster.map(key => {
            if(key == 1){
              tempFrequent[0]+=1
            }else if(key == 2){
              tempFrequent[1]+=1
            }else if(key == 3){
              tempFrequent[2]+=1
            }else{
              tempFrequent[3]+=1
            }
          })
          setFrequent(tempFrequent)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }else{
      axios.get(urlAPI + '/survey/countAll')
      .then(res => {
        console.log(res.data)
        res.data.minimumClusterArrays[res.data.minimumClusterArrays.length-1].map(key => {
          if(key == 0){
            tempFrequent[0]+=1
          }else if(key == 1){
            tempFrequent[1]+=1
          }else if(key == 2){
            tempFrequent[2]+=1
          }else{
            tempFrequent[3]+=1
          }
        })
        setFrequent(tempFrequent)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [page])

  const renderCategories = () => {
    return categories.map((key, index) => (
      <Category key={key.id} page={page.page} onClick={() => setPage({page: index+2, id: key.id})}>
        <Text>{key.category_name.toUpperCase()}</Text>
      </Category>
    ))
  }

  return (
    <ResultContainer>
      <CategoriesWrapper>
        <Category page={page.page} onClick={() => setPage({page: 1, id: 0})}>
          <Text>All</Text>
        </Category>
        {renderCategories()}
      </CategoriesWrapper>
      <Bar data={{
            labels: ['Facebook', 'Instagram', 'Twitter', 'Tiktok'],
            datasets: [{
              label: "# of chosen social media",
              data: frequent,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
              borderWidth: 1
            }]
          }} width={600} height={400} options={{scales:{
            yAxes: [{
              ticks:{
                beginAtZero: true
              }
            }]
          }}}/>
    </ResultContainer>
  )
}

export default Result