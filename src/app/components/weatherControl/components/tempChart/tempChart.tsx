"use client";
import React from 'react';
import {Line} from 'react-chartjs-2';
import { TempChartProps } from './tempChartProps';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);
export const TempChart = ({weatherData}: TempChartProps) => {
    const {dates, maxTemp, minTemp} = weatherData;

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Min Temperature',
                data: minTemp,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                fill: false,
                tension: 0.4,
            },
            {
                label: 'Max Temperature',
                data: maxTemp,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                fill: false,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Daily Weather Highs & Lows',
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x'
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
                beginAtZero: false,
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
        },
    };

    return <Line data={data} options={options}/>;
};
