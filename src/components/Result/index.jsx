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
  // const [chartCategoryData, setChartCategoryData] = useState(() => ({}));
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
          // console.log(res.data.clusterResult)
          let tempChartData = [[], [], [], []];
          for(let i = 0; i < res.data.clusterResult.length; i++) {
            for(let j = 0; j < res.data.clusterResult[i].length; j++) {
              tempChartData[j].push({ x: j+1, y: res.data.clusterResult[i][j]})
            }
          }

          setChartData(tempChartData);
          // console.log(tempChartData)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(urlAPI + "/survey/countAll")
        .then((res) => {
          axios
          .get(urlAPI + `/survey/countCategory?id=1`)
          .then((res2) => {
            axios
            .get(urlAPI + `/survey/countCategory?id=2`)
            .then((res3) => {
              axios
              .get(urlAPI + `/survey/countCategory?id=3`)
              .then((res4) => {
                axios
                .get(urlAPI + `/survey/countCategory?id=4`)
                .then((res5) => {
                  axios
                  .get(urlAPI + `/survey/countCategory?id=5`)
                  .then((res6) => {
                    // console.log(res.data.clusterResult)
                    let tempChartData = [[], [], [], []];
                    for(let i = 0; i < res2.data.clusterResult.length; i++) {
                      for(let j = 0; j < res2.data.clusterResult[i].length; j++) {
                        tempChartData[j].push({ x: res2.data.clusterResult[i][j], y: res.data.resultArrays[res.data.resultArrays.length-1][i][j]})
                        tempChartData[j].push({ x: res3.data.clusterResult[i][j], y: res.data.resultArrays[res.data.resultArrays.length-1][i][j]})
                        tempChartData[j].push({ x: res4.data.clusterResult[i][j], y: res.data.resultArrays[res.data.resultArrays.length-1][i][j]})
                        tempChartData[j].push({ x: res5.data.clusterResult[i][j], y: res.data.resultArrays[res.data.resultArrays.length-1][i][j]})
                        tempChartData[j].push({ x: res6.data.clusterResult[i][j], y: res.data.resultArrays[res.data.resultArrays.length-1][i][j]})
                      }
                    }

                    setChartData(tempChartData);
                    // console.log(tempChartData)

                  })
                  .catch((err) => {
                    console.log(err);
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
              })
              .catch((err) => {
                console.log(err);
              });
            })
            .catch((err) => {
              console.log(err);
            });
          })
          .catch((err) => {
            console.log(err);
          });
          
          // let tempChartData = [[], [], [], []];
          // for(let i = 0; i < res.data.resultArrays[res.data.resultArrays.length-1].length; i++) {
          //   for(let j = 0; j < res.data.resultArrays[res.data.resultArrays.length-1][i].length; j++) {
          //     // tempChartData[j].push({ x: j+1, y: res.data.resultArrays[res.data.resultArrays.length-1][i][j]})
          //     tempChartData[j].push({ x: res.data.resultArrays[res.data.resultArrays.length-1][i][j], y: res.data.resultArrays[res.data.resultArrays.length-1][i][j]})
          //   }
          // }
          
          
          // let tempChartData = [];
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
          // for(let i=0; i< res.data.resultArrays.length; i++) {
          //   tempChartData.push([[], [], [], []])
          //   for(let j=0; j < res.data.resultArrays[i].length; j++) {
          //     for(let k=0; k < res.data.resultArrays[i][j].length; k++) {
                
          //       // if(k == res.data.resultArrays[i][j].indexOf(Math.min(...res.data.resultArrays[i][j]))){
          //         tempChartData[i][k].push({ 
          //           x: k+1,
          //           // x: res.data.resultArrays[i][j][k],
          //           y: res.data.resultArrays[i][j][k]
          //           // x: res.data.resultArrays[i][j][res.data.resultArrays[i][j].indexOf(Math.min(...res.data.resultArrays[i][j]))],
          //           // y: res.data.resultArrays[i][j][res.data.resultArrays[i][j].indexOf(Math.min(...res.data.resultArrays[i][j]))]
          //         })
          //       // }
          //     }
          //   }
          // }

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
          // setChartData(tempChartData);
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

  // const renderChart = () => {
  //   if(page.id !== 0){
  //     return <Scatter
  //     data={{
  //       datasets: [
  //         {
  //           label: "Facebook",
  //           data: chartData[0],
  //           backgroundColor: "rgba(255, 99, 132, 1)",
  //         },
  //         {
  //           label: "Instagram",
  //           data: chartData[1],
  //           backgroundColor: "rgba(54, 162, 235, 1)",
  //         },
  //         {
  //           label: "Twitter",
  //           data: chartData[2],
  //           backgroundColor: "rgba(255, 206, 86, 1)",
  //         },
  //         {
  //           label: "Tiktok",
  //           data: chartData[3],
  //           backgroundColor: "rgba(75, 192, 192, 1)",
  //         },
  //       ],
  //     }}
  //       width={600}
  //       height={400}
  //       options={{
  //         scales: {
  //           yAxes: [
  //             {
  //               ticks: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           ],
  //         },
  //       }}
  //     />
  //   }else{
  //     return chartData.map((key, index) => {
  //       return <div key={index} style={{marginBottom: '30px'}}>
  //         <Scatter key={index}
  //           data={{
  //             datasets: [
  //               {
  //                 label: "Facebook",
  //                 data: chartData[index][0],
  //                 backgroundColor: "rgba(255, 99, 132, 1)",
  //               },
  //               {
  //                 label: "Instagram",
  //                 data: chartData[index][1],
  //                 backgroundColor: "rgba(54, 162, 235, 1)",
  //               },
  //               {
  //                 label: "Twitter",
  //                 data: chartData[index][2],
  //                 backgroundColor: "rgba(255, 206, 86, 1)",
  //               },
  //               {
  //                 label: "Tiktok",
  //                 data: chartData[index][3],
  //                 backgroundColor: "rgba(75, 192, 192, 1)",
  //               },
  //             ],
  //           }}
  //           width={600}
  //           height={400}
  //           options={{
  //             scales: {
  //               yAxes: [
  //                 {
  //                   ticks: {
  //                     beginAtZero: true,
  //                   },
  //                 },
  //               ],
  //             },
  //           }}
  //         />
  //         <p style={{position: 'absolute', transform: 'rotate(-90deg)', marginTop: '-45vh', marginLeft: "-55px"}}>Category</p>
  //         <p style={{textAlign: 'center'}}>Social Media</p>
  //       </div>
  //     })
  //   }
  // }

  return (
    <ResultContainer>
      <CategoriesWrapper>
        <Category page={page.page} onClick={() => setPage({ page: 1, id: 0 })}>
          <Text>All</Text>
        </Category>
        {renderCategories()}
      </CategoriesWrapper>
      {page.id !== 0 ? (
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
        )}
        {/* {renderChart()} */}
    </ResultContainer>
  );
};

export default Result;
