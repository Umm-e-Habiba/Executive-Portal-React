import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';

const AmountsChart = (props) => {
    var options = {
        chart: {
        id: 'area-datetime',
        type: 'area',
        height: 296,
        zoom: {
          autoScaleYaxis: true,
          autoScaleXaxis: true,
        },
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min))
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        title: {
          text: props.xAxisTitle,
        }
      },
      yaxis: {
        title: {
          text: props.yAxisTitle,
        },
        labels: {
          formatter: function (val) {
            return `Rs. ${(parseInt(val)).toLocaleString()}`;
          },
        }
      },
      tooltip: {
        theme: 'dark',
        x: {
          format: 'dd MMM yyyy'
        }
      },
      colors: [props.color],
      fill: {
        type: 'gradient',
        gradient: {
            type: "vertical",
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [45, 100]
        },
    },
      };

    return (
        <Card>
            <CardBody className="pb-0">
                <h5 className="card-title mb-0 header-title">
                  <span className={`font-size-12 badge badge-danger mr-2`}>{props.numberOfDataItems}</span>
                  {`${props.name} `} 
                </h5>
                
                <Chart
                  options={options}
                  series={props.series}
                  type="area"
                  className="apex-charts mt-3"
                  height={296} />
            </CardBody>
        </Card>
    );
};

export default AmountsChart;
