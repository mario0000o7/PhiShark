import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {useEffect,useState} from "react";




Chart.register(...registerables);
let labels:any = ['Odrzucone','Link','Załącznik','Kradzież'];
let datasets:any = [0,0,0,0];
var dataTmp2 = {
    labels: labels,
    datasets: [
        {
            data: datasets,
            backgroundColor: [
                'rgba(0,255,12,0.87)',
                '#F3BB2C',
                '#E8AA5E',
                'rgba(255,0,0,0.92)',

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
    layout: {
        padding: 10,
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
            align: 'start',
            text: 'Wysłane maile',
            font: {
                size: 20,
            },
            color: 'white',

        },
        subtitle: {
            display: true,
            text:'200',
            align: 'start',
            font: {
                size: 20,
            },
            padding:{
                bottom: 20,
            },
            color: 'white',

        }
    },
};
export default function MyChart({campaignId}:any) {
    console.log(campaignId);
    const [dataState,setDataState]=useState(dataTmp2);
    const [optionsState,setOptionsState]=useState(options);

    function refreshChart(){
        if(campaignId==0){
            return;
        }
        fetch(('/api/campaignDetails/'+campaignId))
            .then(response => response.json())
            .then(data => {
                    let newDataSets= [0,0,0,0]
                    for (let i = 0; i < data.length; i++) {
                        if(data[i].skradzione_dane){
                            newDataSets[3]++;
                        }
                        else if(data[i].url){
                            newDataSets[1]++;
                        }
                        else if(data[i].zalacznik){
                            newDataSets[2]++;
                        }
                        else{
                            newDataSets[0]++;
                        }
                    }
                    const newData ={
                        labels: labels,
                        datasets: [
                            {
                                data: newDataSets,
                                backgroundColor: [
                                    'rgba(0,255,12,0.87)',
                                    '#F3BB2C',
                                    '#E8AA5E',
                                    'rgba(255,0,0,0.92)',

                                ],

                                borderWidth: 1
                            },
                        ],
                    }
                    options.plugins.subtitle.text=data.length;
                    setDataState(newData);

                }
            ).catch((error) => {
            console.error('Error:', error);
        });
    }
    // refreshChart();


    useEffect(() => {
       refreshChart()

    }, [campaignId])



    return (
        // @ts-ignore
            <Bar data={dataState} options={optionsState} style={{background:'#3B4256',borderRadius:'20px'}} />

    )
}