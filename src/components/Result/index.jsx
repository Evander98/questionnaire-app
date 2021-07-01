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
          var tempFirstHalf = [];
          var tempSecondHalf = [];
          for (let i = 0; i < res.data.clusterResult.length; i++) {
            tempFirstHalf.push({
              x: res.data.clusterResult[i][0],
              y: res.data.clusterResult[i][1],
            });
            tempSecondHalf.push({
              x: res.data.clusterResult[i][2] + 5,
              y: res.data.clusterResult[i][3] + 5,
            });
          }

          setChartCategoryData({
            first: tempFirstHalf,
            second: tempSecondHalf,
          });
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
          let tempChartData = [[], [], [], []];
          for (let i = 0; i < res.data.resultArrays.length; i++) {
            if (i == 0) {
              for (let j = 0; j < res.data.resultArrays[i].length; j++) {
                for (let k = 0; k < res.data.resultArrays[i][j].length; k++) {
                  tempChartData[k].push({ x: res.data.resultArrays[i][j][k] });
                }
              }
            } else if (i == res.data.resultArrays.length - 1) {
              for (let j = 0; j < res.data.resultArrays[i].length; j++) {
                for (let k = 0; k < res.data.resultArrays[i][j].length; k++) {
                  tempChartData[k][j].y = res.data.resultArrays[i][j][k];
                }
              }
            }
          }
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
      )}
    </ResultContainer>
  );
};

export default Result;
