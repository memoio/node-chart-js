'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const monthlyData = [3541, 18045, 49680, 104598, 287651, 420956, 573457, 680025, 726659, 814485, 860128, 936750, 1057326, 1291176, 1480078, 1793547, 1925784, 2062431, 2124795]

function generateDailyData(monthlyData: number[]) {
    const increments: number[] = [];
    let previousValue = 0;

    // 获取每个月的天数（考虑闰年）
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for (let i = 0; i < monthlyData.length - 1; i++) {
        const startOfMonthValue = monthlyData[i];
        const endOfMonthValue = monthlyData[i + 1];
        const monthDays = daysInMonth[i % 12]; // 当前月份天数

        // 计算准确的每日增量
        const dailyIncrement = (endOfMonthValue - startOfMonthValue) / monthDays;

        // 生成该月的每日增量
        for (let j = 0; j < monthDays; j++) {
            previousValue += dailyIncrement;
            increments.push(Math.round(previousValue)); // 四舍五入为整数
        }
    }

    // 确保最后一个月的最后一天值等于monthlyData的最后一项
    const lastMonthDays = daysInMonth[(monthlyData.length - 1) % 12];
    const lastMonthStartValue = monthlyData[monthlyData.length - 2];
    const lastMonthEndValue = monthlyData[monthlyData.length - 1];

    const dailyIncrement = (lastMonthEndValue - lastMonthStartValue) / lastMonthDays;
    for (let j = 0; j < lastMonthDays; j++) {
        previousValue += dailyIncrement - 1000;
        increments.push(Math.round(previousValue));
    }

    // 强制设置最后一个值为403207
    increments[increments.length - 1] = lastMonthEndValue;

    return increments;
}

function generateWeeklyData(monthlyData: number[]) {
    const increments: number[] = [];
    let previousValue = 0;

    // 获取每个月的天数（考虑闰年）
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for (let i = 0; i < monthlyData.length - 1; i++) {
        const startOfMonthValue = monthlyData[i];
        const endOfMonthValue = monthlyData[i + 1];
        const monthDays = daysInMonth[i % 12]; // 当前月份天数

        // 计算准确的每周增量（考虑月份中的周数）
        const weeksInMonth = Math.ceil(monthDays / 7);
        const weeklyIncrement = (endOfMonthValue - startOfMonthValue) / weeksInMonth;

        // 生成该月的每周增量
        for (let j = 0; j < weeksInMonth; j++) {
            previousValue += weeklyIncrement;
            increments.push(Math.round(previousValue)); // 四舍五入为整数
        }
    }

    // 确保最后一个月的最后一周值等于monthlyData的最后一项
    const lastMonthDays = daysInMonth[(monthlyData.length - 1) % 12];
    const weeksInLastMonth = Math.ceil(lastMonthDays / 7);
    const lastMonthStartValue = monthlyData[monthlyData.length - 2];
    const lastMonthEndValue = monthlyData[monthlyData.length - 1];

    const weeklyIncrement = (lastMonthEndValue - lastMonthStartValue) / weeksInLastMonth;
    for (let j = 0; j < weeksInLastMonth - 1; j++) {
        previousValue += weeklyIncrement - 5000;
        increments.push(Math.round(previousValue));
    }

    // 强制设置最后一周的值为403207
    increments[increments.length - 1] = lastMonthEndValue;

    console.log(increments);
    return increments;
}



function generateDates(timeframe: "Day" | "Week" | "Month", dataLength: number) {
    const today = new Date();
    const dates: string[] = [];

    if (timeframe === "Day") {
        // 生成与数据长度匹配的过去天数日期
        for (let i = dataLength - 1; i >= 0; i--) {
            const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            dates.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
        }
    } else if (timeframe === "Week") {
        // 生成与数据长度匹配的过去周数日期（以每周的第一天作为代表）
        for (let i = dataLength - 1; i >= 0; i--) {
            const date = new Date(today.getTime() - i * 7 * 24 * 60 * 60 * 1000);
            date.setDate(date.getDate() - date.getDay()); // 调整到周一
            dates.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
        }
    } else if (timeframe === "Month") {
        // 生成与数据长度匹配的过去月数日期（以每月的第一天作为代表）
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // 0 (Jan) to 11 (Dec)

        for (let i = dataLength - 1; i >= 0; i--) {
            // 计算目标月份和年份
            const totalMonths = currentMonth - i;
            const year = currentYear + Math.floor(totalMonths / 12);
            const month = (totalMonths % 12 + 12) % 12; // 确保月份在 0-11 范围内

            // 创建日期对象（每月的第一天）
            const date = new Date(year, month, 1);
            dates.push(date.toISOString().split('T')[0]);
        }
    }

    return dates;
}

const NodeData = {
    Day: generateDailyData(monthlyData),

    Week: generateWeeklyData(monthlyData),

    Month: monthlyData,
};

export default function FilesDIDChart({ timeframe }: { timeframe: "Day" | "Week" | "Month" }) {
    const dataLength = NodeData[timeframe].length;

    const [seriesData, setSeriesData] = useState<{ name: string; data: number[] }[]>([
        {
            name: 'Node Growth',
            data: NodeData[timeframe],
        }
    ]);

    const [categories, setCategories] = useState<string[]>(generateDates(timeframe, dataLength));

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
            text: "Files DID",
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
                formatter: (value: unknown) => value,
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

    useEffect(() => {
        setSeriesData([
            {
                name: 'Files DID',
                data: NodeData[timeframe],
            }
        ]);
        setCategories(generateDates(timeframe, NodeData[timeframe].length));
    }, [timeframe]);

    return (
        <div className='w-full text-white flex-col'>
            <ApexChart options={chartOptions} series={seriesData} type="area" />
        </div>
    );
}

