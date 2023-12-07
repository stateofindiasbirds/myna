import React from 'react';
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
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  const data = {
    labels,
    maintainAspectRatio:true,
    responsive:true,

    datasets: [
      {
        label: 'Dataset 1',
        data: [10,20,30,40,50,60,70,10,30,40,50,33],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [33,12,34,17,88,4,40,81,10,30,40,13],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 3',
        data: [4,6,8,10,12,14,16,18,19,20,20,10],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 4',
        data: [3,1,4,17,13,2,4,88,7,5,3,1],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 5',
        data: [90,12,34,17,88,4,40,81,10,30,40,13],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 6',
        data: [1,12,34,17,88,4,40,81,10,30,40,13],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 6',
        data: [10,12,34,17,88,4,40,81,10,30,40,13],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 8',
        data: [11,12,34,17,88,4,40,81,10,30,40,13],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 9',
        data: [2,12,34,17,88,4,40,81,10,30,40,13],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 9',
        data: [100,12,34,17,88,4,40,81,10,30,40,13],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },

    ],
  };
  
  const options = {
    responsive: true,
  
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

function Linechart() {
  return (
    <Line options={options} data={data} />
  )
}

export default Linechart