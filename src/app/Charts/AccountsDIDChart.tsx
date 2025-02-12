'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const UserNodeData ={
   Day: [3105, 5340, 23732, 2333, 34343, 7788, 76757, 57578, 58885, 142230,],
   Week: [5688, 18996, 34343, 34344, 9879, 79923, 6646,],
   Month: [3105, 18996, 34095, 49872, 64896, 79923, 95076, 112300, 127076, 142230, 157032, 172660, 187076, 209765, 237854, 268322, 315690, 356901, 403207],

} 
export default function AccountsDIDChart({ timeframe }: { timeframe: "Day" | "Week" | "Month" }) {
    useEffect(()=>{
            setSeriesData([
                {
                    name: 'User Nodes',
                    data: UserNodeData[timeframe],
                }
            ])
            setCategories(generateDates(timeframe));
        },[timeframe])
    
    
        // Function to generate dynamic dates based on timeframe
    const generateDates = (timeframe: "Day" | "Week" | "Month") => {
        const today = new Date();
        let dates: string[] = [];
    
        if (timeframe === "Day") {
            for (let i = 9; i >= 0; i--) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                dates.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
            }
        } else if (timeframe === "Week") {
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(today.getDate() - i * 7);
                dates.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
            }
        } else if (timeframe === "Month") {
            const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // 0 (Jan) to 11 (Dec)
    
        for (let i = 19; i >= 0; i--) {
            // Calculate the target month and year
            const totalMonths = currentMonth - i;
            const year = currentYear + Math.floor(totalMonths / 12);
            const month = (totalMonths % 12 + 12) % 12; // Ensure positive month
    
            // Create a date for the first day of the calculated month/year
            const date = new Date(year, month, 1);
            dates.push(date.toISOString().split('T')[0]);
        }
        }
    
        return dates;
    };
    
    const [categories, setCategories] = useState(generateDates(timeframe));
    
        const chartOptions = {
            chart: {
                id: 'user-nodes-chart',
                type: 'area',
                height: 350,
                toolbar: {
                    show: false,
                },
            },
            title: {
                text: "User Nodes",
                align: 'center',
                style: {
                    color: "white"
                }
            },
            tooltip: {
                enabled: true,
                theme: 'dark',
            },
            stroke: {
                curve: 'straight',
            },
            xaxis: {
                type: 'datetime',
                categories: categories,
                labels: {
                    // show: false,
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
            legend: {
                labels: {
                    colors: 'black' // 图例颜色
                }
            },
            dataLabels: {
                enabled: false,
            },
            colors: ['#0079F2'], // 数据颜色
            lable: {
                color: ['#0079F2']
            },
        } as unknown as ApexOptions
    
        const [seriesData, setSeriesData] = useState<{ name: string; data: number[] }[]>([
            {
                name: 'User Nodes',
                data: UserNodeData[timeframe],
            }
        ])


    return (
        <div className='w-full text-white flex-col' >
            <ApexChart options={chartOptions} series={seriesData} type="area" />
        </div >

    );
}

