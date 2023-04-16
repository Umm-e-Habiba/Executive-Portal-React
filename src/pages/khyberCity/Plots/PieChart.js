import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = (props) => {
    const apexDonutOpts = {
        chart: {
            height: 320,
            type: 'pie',
        },
        labels: props.labels,
        tooltip: {
            theme: 'dark',
            x: { show: false },
            y: { 
                show: true,
                formatter: function (value) {
                    return (value).toLocaleString()
                } 
            }
        },
        legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10,
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
        <Chart options={apexDonutOpts} series={props.series} type="pie" height={320} className="apex-charts" />
    );
};

export default PieChart;
