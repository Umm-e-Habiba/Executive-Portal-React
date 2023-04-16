import React from "react";
import { Row, Col, Button } from "reactstrap";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import Chart from 'react-apexcharts';

import PageTitle from '../../../components/PageTitle';
import StatisticsChartWidget2 from '../../../components/StatisticsChartWidget2';
import AmountsChart from "./AmountsChart";
import CountsChart from "./CountsChart";
import Preloader from "../../../components/Preloader";

class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 60
          })
        }],
        options: {
          chart: {
            id: 'fb',
            group: 'social',
            type: 'line',
            height: 160
          },
          colors: ['#008FFB'],
          yaxis: {
            labels: {
              minWidth: 40
            }
          }
        },
      
        seriesLine2: [{
          data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 30
          })
        }],
        optionsLine2: {
          chart: {
            id: 'tw',
            group: 'social',
            type: 'line',
            height: 160
          },
          colors: ['#546E7A'],
          yaxis: {
            labels: {
              minWidth: 40
            }
          }
        },
      
        seriesArea: [{
          data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 60
          })
        }],
        optionsArea: {
          chart: {
            id: 'yt',
            group: 'social',
            type: 'area',
            height: 160
          },
          colors: ['#00E396'],
          yaxis: {
            labels: {
              minWidth: 40
            }
          }
        },
      
      
      };
    }

  

    render() {
      return (
        <div id="wrapper">
            <div id="chart-line">
                <Chart options={this.state.options} series={this.state.series} type="line" height={160} />
            </div>
            <div id="chart-line2">
                <Chart options={this.state.optionsLine2} series={this.state.seriesLine2} type="line" height={160} />
            </div>
            <div id="chart-area">
                <Chart options={this.state.optionsArea} series={this.state.seriesArea} type="area" height={160} />
            </div>
        </div>
      );
    }
  }


class Sales extends React.Component {
    constructor(props) {
        super(props);

        let oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 365);

        this.state = {
            IsDataFetched: false,
            IsDataFound: false,
            SalesCards: [],
            NewBookings: {
                Amounts: [],
                Counts: [],
            },
            Installments: {
                Amounts: [],
                Counts: [],
            },
            FilteredBookings: {
                Amounts: [],
                Counts: [],
            },
            FilteredInstallments: {
                Amounts: [],
                Counts: [],
            }, 
            DateRange: [oneWeekAgo, new Date()]
        };

        this.onFilter = this.onFilter.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/khyberCity/sales`);

            this.setState({
                IsDataFetched: true,
            });

              if (response.data.Message === "Data found.") {
                  this.setState({
                      IsDataFound: true,
                      SalesCards: response.data.SalesCards,
                      NewBookings: response.data.NewBookings,
                      Installments: response.data.Installments,
                  });

                  this.onFilter();
              }
          } catch (error) {
            this.setState({
                IsDataFetched: true,
            });
          }
    }

    onFilter = () => {
        let { 
            NewBookings,
            Installments,
            DateRange,
        } = this.state;

        if (DateRange.length !== 2) {
            return;
        }

        let filteredBookings = {
            Amounts: [],
            Counts: [],
        };

        let filteredInstallments = {
            Amounts: [],
            Counts: [],
        };

        const fromTimestamp = new Date(DateRange[0]).getTime();
        const toTimestamp = new Date(DateRange[1]).getTime();
        
        let count = 0;
        let length = NewBookings.Amounts.length;

        for (let i = 0; i < length; i++) {
            const amount = NewBookings.Amounts[i];

            if (amount[0] >= fromTimestamp &&
                amount[0] <= toTimestamp) {
                    filteredBookings.Amounts[count] = NewBookings.Amounts[i];
                    filteredBookings.Counts[count++] = NewBookings.Counts[i];
                }
        }

        count = 0;
        length = Installments.Amounts.length;

        for (let i = 0; i < length; i++) {
            const amount = Installments.Amounts[i];

            if (amount[0] >= fromTimestamp &&
                amount[0] <= toTimestamp) {
                    filteredInstallments.Amounts[count] = Installments.Amounts[i];
                    filteredInstallments.Counts[count++] = Installments.Counts[i];
                }
        }

        this.setState({
            FilteredBookings: filteredBookings,
            FilteredInstallments: filteredInstallments,
        });
    }

    render() {
        const {
            IsDataFetched,
            IsDataFound, 
            SalesCards,
            NewBookings,
            Installments,
            FilteredBookings,
            FilteredInstallments,
            DateRange,
        } = this.state;

        return IsDataFound ? 
            <React.Fragment>
                <Row className="page-title">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Khyber City', path: '/khyberCity/sales' },
                                { label: 'Sales', path: '/khyberCity', active: true },
                            ]}
                            title={"Sales"}
                        />
                    </Col>
                </Row>
    
                <h6>TODAY'S STATISTICS</h6>
    
                <Row>
                    {SalesCards.map((salesCard, index) =>
                        <Col key={index} md={6} xl={3}>
                            <StatisticsChartWidget2
                                name="Amount"
                                type="area"
                                title={`Rs. ${(salesCard.TotalAmount).toLocaleString()}`}
                                subtitle={`${salesCard.Count} ${salesCard.Name}`}
                                colors={[salesCard.Color]}
                                ymax={Math.max(...salesCard.Amounts)}
                                data={salesCard.Amounts}>
                            </StatisticsChartWidget2>
                        </Col>
                    )}
                </Row>

                <hr />

                <h4 className="header-title">Select Date Range</h4>

                <div className="d-flex flex-row py-3">
                    <div className="mr-2">
                        <Flatpickr value={DateRange}
                            onChange={date => { 
                                this.setState({ DateRange: date });
                            }} 
                            options={{ 
                                mode: "range" 
                            }}
                            className="form-control" />
                    </div>
                    <Button color="primary" onClick={this.onFilter}>Filter</Button>
                    <Button className="ml-2" color="success" onClick={() => {
                        this.setState({
                            FilteredBookings: NewBookings,
                            FilteredInstallments: Installments
                        });
                    }}>Show All</Button>
                </div>
                
                <h6>PLOT BOOKINGS</h6>

                <Row>
                    <Col md={6} xl={6}>
                        <AmountsChart 
                            name={"Plot Bookings - Amounts"}
                            color="#43D39E"
                            series={[{
                                name: "Amount",
                                data: FilteredBookings.Amounts}]}
                            numberOfDataItems={FilteredInstallments.Amounts.length}
                            xAxisTitle={"Booking Dates"}
                            yAxisTitle={"Booking Amounts"} />
                    </Col>

                    <Col md={6} xl={6}>
                        <CountsChart 
                            name={"Number of Plot Bookings"}
                            color="#25C2E3"
                            series={[{
                                name: "Number of Bookings",
                                data: FilteredBookings.Counts}]}
                            xAxisTitle={"Booking Dates"}
                            yAxisTitle={"Number of Bookings"} />
                    </Col>
                </Row>

                <h6>INSTALLMENTS</h6>

                <Row>
                    <Col md={6} xl={6}>
                        <AmountsChart 
                            name={"Installments - Amounts"}
                            color="#5369F8"
                            series={[{
                                name: "Amount",
                                data: FilteredInstallments.Amounts}]}
                            numberOfDataItems={FilteredInstallments.Amounts.length}
                            xAxisTitle={"Installment Dates"}
                            yAxisTitle={"Installment Amounts"} />
                    </Col>

                    <Col md={6} xl={6}>
                        <CountsChart 
                            name={"Number of Installments"}
                            color="#FFBE0B"
                            series={[{
                                name: "Number of Installments",
                                data: FilteredInstallments.Counts}]}
                            xAxisTitle={"Installment Dates"}
                            yAxisTitle={"Number of Installments"} />
                    </Col>
                </Row>
            </React.Fragment> :
            <Preloader 
                isDataFetched={IsDataFetched}
                retryLink={"/khyberCity/sales"} />;
    }
};

export default Sales;