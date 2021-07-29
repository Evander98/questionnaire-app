import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Scatter } from "react-chartjs-2";
import { urlAPI } from "../../assets/URLs";
import {
  CategoriesWrapper,
  Category,
  ResultContainer,
  Table,
  TableData,
  TableHead,
  TableRow,
  Text,
} from "./ResultElements";

const Result = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(() => ({ page: 1, id: 0 }));
  const [chartData, setChartData] = useState([]);
  const [chartCategoryData, setChartCategoryData] = useState(() => ({}));
  // const [frequent, setFrequent] = useState([]);

  useEffect(() => {
    axios
      .get(urlAPI + "/category/getCategory")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let tempFrequent = [0, 0, 0, 0];
    if (page.id !== 0) {
      axios
        .get(urlAPI + `/survey/countCategory?id=${page.id}`)
        .then((res) => {
          console.log(res.data.clusterResult)
          let tempChartData = [[], [], [], []];
          for(let i = 0; i < res.data.clusterResult.length; i++) {
            for(let j = 0; j < res.data.clusterResult[i].length; j++) {
              tempChartData[j].push({ x: j+1, y: res.data.clusterResult[i][j]})
            }
          }

          setChartData(tempChartData);
          // console.log(tempChartData)

          // var tempFirstHalf = [];
          // var tempSecondHalf = [];
          // for (let i = 0; i < res.data.clusterResult.length; i++) {
          //   tempFirstHalf.push({
          //     x: res.data.clusterResult[i][0],
          //     y: res.data.clusterResult[i][1],
          //   });
          //   tempSecondHalf.push({
          //     x: res.data.clusterResult[i][2] + 5,
          //     y: res.data.clusterResult[i][3] + 5,
          //   });
          // }

          // setChartCategoryData({
          //   first: tempFirstHalf,
          //   second: tempSecondHalf,
          // });
          // console.log(tempFirstHalf);

          // if (Object.keys(res.data).length > 0) {
          //   res.data.minimumCluster.map((key) => {
          //     if (key == 1) {
          //       tempFrequent[0] += 1;
          //     } else if (key == 2) {
          //       tempFrequent[1] += 1;
          //     } else if (key == 3) {
          //       tempFrequent[2] += 1;
          //     } else {
          //       tempFrequent[3] += 1;
          //     }
          //   });
          //   setFrequent(tempFrequent);
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(urlAPI + "/survey/countAll")
        .then((res) => {
          // console.log(res.data.resultArrays)
          
          // let tempChartData = [[], [], [], []];
          // for(let i = 0; i < res.data.resultArrays[res.data.resultArrays.length-1].length; i++) {
          //   for(let j = 0; j < res.data.resultArrays[res.data.resultArrays.length-1][i].length; j++) {
          //     tempChartData[j].push({ x: j+1, y: res.data.resultArrays[res.data.resultArrays.length-1][i][j]})
          //     // tempChartData[j].push({ x: res.data.resultArrays[res.data.resultArrays.length-1][i][j], y: res.data.resultArrays[res.data.resultArrays.length-1][i][j]})
          //   }
          // }
          
          
          let tempChartData = [];
          // for(let i=0; i< res.data.resultArrays.length; i++) {
          //   tempChartData.push([[], [], [], []])
          //   for(let j=0; j < res.data.resultArrays[i].length; j++) {
          //     for(let k=0; k < res.data.resultArrays[i][j].length; k++) {

          //       if(k == res.data.resultArrays[i][j].indexOf(Math.min(...res.data.resultArrays[i][j]))){
          //         tempChartData[i][k].push({ 
          //           // x: res.data.resultArrays[i][j][res.data.resultArrays[i][j].indexOf(Math.min(...res.data.resultArrays[i][j]))],
          //           x: k+1,
          //           y: res.data.resultArrays[i][j][res.data.resultArrays[i][j].indexOf(Math.min(...res.data.resultArrays[i][j]))]
          //         })
          //       }
          //     }
          //   }
          // }
          for(let i=0; i< res.data.resultArrays.length; i++) {
            tempChartData.push([[], [], [], []])
            for(let j=0; j < res.data.resultArrays[i].length; j++) {
              for(let k=0; k < res.data.resultArrays[i][j].length; k++) {
                
                // if(k == res.data.resultArrays[i][j].indexOf(Math.min(...res.data.resultArrays[i][j]))){
                  tempChartData[i][k].push({ 
                    x: k+1,
                    // x: res.data.resultArrays[i][j][k],
                    y: res.data.resultArrays[i][j][k]
                    // x: res.data.resultArrays[i][j][res.data.resultArrays[i][j].indexOf(Math.min(...res.data.resultArrays[i][j]))],
                    // y: res.data.resultArrays[i][j][res.data.resultArrays[i][j].indexOf(Math.min(...res.data.resultArrays[i][j]))]
                  })
                // }
              }
            }
          }

          // for (let i = 0; i < res.data.resultArrays.length; i++) {
          //   if (i == 0) {
          //     for (let j = 0; j < res.data.resultArrays[i].length; j++) {
          //       for (let k = 0; k < res.data.resultArrays[i][j].length; k++) {
          //         tempChartData[k].push({ x: res.data.resultArrays[i][j][k] });
          //       }
          //     }
          //   } else if (i == res.data.resultArrays.length - 1) {
          //     for (let j = 0; j < res.data.resultArrays[i].length; j++) {
          //       for (let k = 0; k < res.data.resultArrays[i][j].length; k++) {
          //         tempChartData[k][j].y = res.data.resultArrays[i][j][k];
          //       }
          //     }
          //   }
          // }
          // console.log(tempChartData)
          setChartData(tempChartData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [page]);

  const renderCategories = () => {
    return categories.map((key, index) => (
      <Category
        key={key.id}
        page={page.page}
        onClick={() => setPage({ page: index + 2, id: key.id })}
      >
        <Text>{key.category_name.toUpperCase()}</Text>
      </Category>
    ));
  };

  const renderChart = () => {
    return chartData.map((key, index) => {
      return <div style={{marginBottom: '30px'}}>
        <Scatter key={index}
          data={{
            datasets: [
              {
                label: "Facebook",
                data: chartData[index][0],
                backgroundColor: "rgba(255, 99, 132, 1)",
              },
              {
                label: "Instagram",
                data: chartData[index][1],
                backgroundColor: "rgba(54, 162, 235, 1)",
              },
              {
                label: "Twitter",
                data: chartData[index][2],
                backgroundColor: "rgba(255, 206, 86, 1)",
              },
              {
                label: "Tiktok",
                data: chartData[index][3],
                backgroundColor: "rgba(75, 192, 192, 1)",
              },
            ],
          }}
          width={600}
          height={400}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
        <p style={{position: 'absolute', transform: 'rotate(-90deg)', marginTop: '-45vh', marginLeft: "-55px"}}>Category</p>
        <p style={{textAlign: 'center'}}>Social Media</p>
      </div>
    })
  }

  return (
    <ResultContainer>
      <CategoriesWrapper>
        <Category page={page.page} onClick={() => setPage({ page: 1, id: 0 })}>
          <Text>All</Text>
        </Category>
        {renderCategories()}
      </CategoriesWrapper>
      {/* {page.id !== 0 ? (
        <Scatter
          data={{
            datasets: [
              {
                label: "Facebook",
                data: chartCategoryData.first,
                backgroundColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                ],
              },
              {
                label: "Instagram",
                backgroundColor: "rgba(54, 162, 235, 1)",
              },
              {
                label: "Twitter",
                data: chartCategoryData.second,
                backgroundColor: [
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                ],
              },
              {
                label: "Tiktok",
                backgroundColor: "rgba(75, 192, 192, 1)",
              },
            ],
          }}
          width={600}
          height={400}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      ) : (
        <Scatter
          data={{
            datasets: [
              {
                label: "Facebook",
                data: chartData[0],
                backgroundColor: "rgba(255, 99, 132, 1)",
              },
              {
                label: "Instagram",
                data: chartData[1],
                backgroundColor: "rgba(54, 162, 235, 1)",
              },
              {
                label: "Twitter",
                data: chartData[2],
                backgroundColor: "rgba(255, 206, 86, 1)",
              },
              {
                label: "Tiktok",
                data: chartData[3],
                backgroundColor: "rgba(75, 192, 192, 1)",
              },
            ],
          }}
          width={600}
          height={400}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
        )} */}
        {renderChart()}
    </ResultContainer>
  );
};

export default Result;
