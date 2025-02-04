'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const UserNodeData = [2089, 18900, 40598, 70443, 92345, 120087, 156721, 195488, 230065, 263291, 290872, 338765, 390923, 427685, 480650, 509778, 520943, 562890, 605273]

export default function AccountsDIDChart() {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'accounts-did-chart',
            type: 'area',
            height: 350,
            toolbar: {
                show: true,
            },
            zoom: false,
        },
        title: {
            text: "Accounts DID",
            align: 'center',
            style: {
                color: "white"
            }
        },


        stroke: {
            curve: 'straight',
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2023-07-01', '2023-08-01', '2023-09-01', '2023-10-01', '2023-11-01', '2023-12-01',
                '2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01', '2024-06-01', '2024-07-01', '2024-08-01', '2024-09-01', '2024-10-01', '2024-11-01', '2024-12-01',
                '2025-01-01'
            ],
            labels: {
                datetimeUTC: true,
                datetimeFormatter: {
                    day: 'dd MMM',
                    week: 'ww MMM',
                    month: 'MMM yyyy',
                },
                style: {
                    colors: 'white'
                },
            }
        },
        yaxis: {
            show: true,
            axisBorder: {
                show: false,
                color: '#78909C',
                width: 2
            },
            axisTicks: {
                show: false,
                borderType: 'solid',
                width: 6,
                offsetX: 0,
                offsetY: 0
            },
            min: 0,
            labels: {
                formatter: (value: any) => value,
                style: {
                    colors: 'white'
                },
            }
        },
        grid: {
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#0079F2'],  // 数据颜色
        tooltip: {
            enabled: true,
            theme: 'dark',
        },
    })

    const [seriesData, setSeriesData] = useState<{ name: string; data: number[] }[]>([
        {
            name: 'User Nodes',
            data: UserNodeData,
        }
    ])


    return (
        <div className='w-full text-white flex-col' >
            <ApexChart options={chartOptions} series={seriesData} type="area" />
        </div >

    );
}

