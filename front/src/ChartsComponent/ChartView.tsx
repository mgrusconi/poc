import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from "react-dotenv";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Chart {
  labels: string[],
  datasets: number[][]
}


export function ChartView() {

  const initChart: Chart = {
    labels: [''],
    datasets: [[], []]
  }

  const [chartData, setChartData] = useState<Chart>(initChart);
  useEffect(() => {
    const getChartData = async () => {
      const ruta = `${env.BACK_URL}/data/`;
      const { data } = await axios(ruta);
      const myData: Chart = {
        labels: data.labels,
        datasets: data.datasets
      }
      setChartData(myData);
    }

    getChartData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = chartData.labels;
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartData.datasets[0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: chartData.datasets[1],
        //data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
