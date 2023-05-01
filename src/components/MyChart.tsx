import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';




Chart.register(...registerables);
let labels:any = [];
let datasets:any = [];
var dataTmp2 = {
    labels: ['URL','ATTACHMENT','STEAL'],
    datasets: [
        {
            data: [10,20,30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        },
    ],
}

const options = {
    maintainAspectRatio: false,
    responsive:true,// Set to false to allow resizing
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                color: 'white',
            }
        },
        x: {
            ticks: {
                color: 'white',
            }
        }
    },
    elements: {
        line: {
            tension: 0,
            borderWidth: 1,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,

        },
    },
};

export default function MyChart() {
    return (
            <Bar data={dataTmp2} options={options} style={{background:'#3B4256',borderRadius:'20px'}} />

    )
}