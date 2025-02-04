'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ProviderNodeData = [1089, 2829, 4530, 6289, 7906, 9673, 11324, 13098, 14703, 16451, 18100, 18841, 20509, 23570, 26790, 29598, 34078, 41008, 47975]

export default function ProviderNodesChart() {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'user-nodes-chart',
            type: 'area',
            height: 350,
            toolbar: {
                show: true,
            },
            zoom: false,
        },
        title: {
            text: "Provider Nodes",
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
        tooltip: {
            enabled: true,
            theme: 'dark',
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#0079F2'],  // 数据颜色
    })

    const [seriesData, setSeriesData] = useState<{ name: string; data: number[] }[]>([
        {
            name: 'User Nodes',
            data: ProviderNodeData,
        }
    ])


    return (
        <div className='w-full text-white flex-col' >
            <ApexChart options={chartOptions} series={seriesData} type="area" />
        </div >

    );
}

