import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart = (props) => {
    const options = {
        chart: {
            height: 400,
            type: "pie",
        },
        labels: props.seriesLabels,
        tooltip: {
            theme: "dark",
            y: { 
                show: true,
                formatter: function (value) {
                    return `Rs. ${(value).toLocaleString()}`
                } 
            }
            
        },
        legend: {
            show: true,
            position: "right",
            horizontalAlign: "left",
            verticalAlign: "middle",
            floating: false,
            fontSize: '12px',
            offsetX: 0,
            offsetY: 0,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        height: 240,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    return (
        <Chart
            options={options}
            series={props.seriesData}
            type="donut"
            height={400}
            className="apex-charts" />
    );
};

export default DonutChart;
