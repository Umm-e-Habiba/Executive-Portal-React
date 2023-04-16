import React from "react";
import { Row, Col, Card, CardBody, Form, FormGroup } from "reactstrap";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import Chart from 'react-apexcharts';

import PageTitle from '../../../components/PageTitle';
import StatisticsChartWidget2 from '../../../components/StatisticsChartWidget2';
import Preloader from "../../../components/Preloader";

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
            DailyClosing: {},
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
                      DailyClosing: response.data.DailyClosing,
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
            DailyClosing,
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
    
                <h6>THIS MONTH STATISTICS</h6>
    
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
                
                <Card>
                    <CardBody>
                        <h5 className="card-title header-title">Select Date Range</h5>

                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Flatpickr value={DateRange}
                                    onChange={date => { 
                                        this.setState({ DateRange: date });
                                    }} 
                                    options={{ 
                                        mode: "range" 
                                    }}
                                    className="form-control" />
                            </FormGroup>

                            <div className="btn-group ml-1">
                                <button type="button" className="btn btn-secondary"
                                    onClick={this.onFilter}>Filter</button>
                                <button type="button" className="btn btn-white"
                                    onClick={() => {
                                        this.setState({
                                            FilteredBookings: NewBookings,
                                            FilteredInstallments: Installments
                                        });
                                    }}>All</button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>

                <h6>
                    {"Selected Range: "} 
                    <span className="text-info">{new Date(DateRange[0]).toLocaleString("default", { year: "numeric", month: "long", day: "numeric" })}</span>
                    <span className="fas fa-arrow-right mx-1"/>
                    <span className="text-info">{new Date(DateRange[1]).toLocaleString("default", { year: "numeric", month: "long", day: "numeric" })}</span>
                </h6>

                <Card>
                    <CardBody className="pb-0">
                        <h5 className="card-title mb-0 header-title">
                            Plot Bookings<span className={`font-size-12 badge badge-info ml-2`}>{FilteredBookings.Amounts.length.toLocaleString()}</span>
                        </h5>

                        <div id="-new-bookings-charts-wrapper">
                            <div id="new-bookings-chart-line">
                                <Chart
                                    options={{
                                        chart: {
                                            group: "new-bookings",
                                            type: 'line',
                                            height: 160,
                                        },
                                        dataLabels: {
                                            enabled: false
                                        },
                                        colors: ["#43D39E"],
                                        xaxis: {
                                            type: 'datetime',
                                        },
                                        yaxis: {
                                            title: {
                                                text: "Number of Bookings",
                                            },
                                            labels: {
                                                minWidth: 80,
                                                formatter: function (val) {
                                                    return `${(parseInt(val)).toLocaleString()}`;
                                                },
                                            },
                                            tooltip: {
                                                x: {
                                                    format: 'dd MMM yyyy'
                                                }
                                            }
                                        },
                                    }}
                                    series={[
                                        {
                                            name: "Number of Bookings",
                                            data: FilteredBookings.Counts
                                        }
                                    ]}
                                    type="line"
                                    className="apex-charts mt-3"
                                    height={160} />
                            </div>
                            <div id="new-bookings-chart-area">
                                <Chart 
                                    options={{
                                        chart: {
                                            group: "new-bookings",
                                            type: 'area',
                                            height: 300,
                                        },
                                        dataLabels: {
                                            enabled: false
                                        },
                                        colors: ["#25C2E3"],
                                        xaxis: {
                                            type: 'datetime',
                                            title: {
                                                text: "Booking Dates",
                                            }
                                        },
                                        yaxis: {
                                            title: {
                                                text: "Booking Amounts",
                                            },
                                            labels: {
                                                minWidth: 80,
                                                formatter: function (val) {
                                                    return `Rs. ${(parseInt(val)).toLocaleString()}`;
                                                },
                                            }
                                        },
                                        tooltip: {
                                            x: {
                                                format: 'dd MMM yyyy'
                                            }
                                        }
                                    }}
                                    series={[
                                        {
                                            name: "Amount",
                                            data: FilteredBookings.Amounts
                                        }
                                    ]}
                                    type="area"
                                    className="apex-charts mt-3"
                                    height={200} />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="pb-0">
                        <h5 className="card-title mb-0 header-title">
                            Installments<span className={`font-size-12 badge badge-info ml-2`}>{FilteredInstallments.Amounts.length.toLocaleString()}</span>
                        </h5>

                        <div id="installments-charts-wrapper">
                            <div id="installments-chart-line">
                                <Chart
                                    options={{
                                        chart: {
                                            group: "installments",
                                            type: 'line',
                                            height: 200,
                                        },
                                        dataLabels: {
                                            enabled: false
                                        },
                                        colors: ["#FFBE0B"],
                                        xaxis: {
                                            type: 'datetime',
                                        },
                                        yaxis: {
                                            title: {
                                                text: "Number of Installments",
                                            },
                                            labels: {
                                                minWidth: 80,
                                                formatter: function (val) {
                                                    return `${(parseInt(val)).toLocaleString()}`;
                                                },
                                            },
                                            tooltip: {
                                                x: {
                                                    format: 'dd MMM yyyy'
                                                }
                                            }
                                        },
                                    }}
                                    series={[
                                        {
                                            name: "Number of Installments",
                                            data: FilteredInstallments.Counts
                                        },
                                    ]}
                                    type="line"
                                    className="apex-charts mt-3"
                                    height={200} />
                            </div>
                            <div id="installments-chart-area">
                                <Chart 
                                    options={{
                                        chart: {
                                            group: "installments",
                                            type: 'area',
                                            height: 300,
                                        },
                                        dataLabels: {
                                            enabled: false
                                        },
                                        colors: ["#5369F8"],
                                        xaxis: {
                                            type: 'datetime',
                                            title: {
                                                text: "Installment Dates",
                                            }
                                        },
                                        yaxis: {
                                            title: {
                                                text: "Installments Amounts",
                                            },
                                            labels: {
                                                minWidth: 80,
                                                formatter: function (val) {
                                                    return `Rs. ${(parseInt(val)).toLocaleString()}`;
                                                },
                                            }
                                        },
                                        tooltip: {
                                            x: {
                                                format: 'dd MMM yyyy'
                                            }
                                        }
                                    }}
                                    series={[
                                        {
                                            name: "Amount",
                                            data: FilteredInstallments.Amounts
                                        }
                                    ]}
                                    type="area"
                                    className="apex-charts mt-3"
                                    height={200} />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="pb-0">
                        <h5 className="card-title mb-0 header-title">Daily Closing Statistics</h5>

                            <Chart
                                options={{
                                    chart: {
                                        type: "bar",
                                        stacked: true,
                                        height: 600,
                                    },
                                    dataLabels: {
                                        enabled: false
                                    },
                                    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#A493DF", "#DF93A4"],
                                    xaxis: {
                                        type: 'datetime',
                                        title: {
                                            text: "Dates",
                                        },
                                    },
                                    yaxis: {
                                        title: {
                                            text: "Amounts",
                                        },
                                        labels: {
                                            minWidth: 80,
                                            formatter: function (val) {
                                                return `Rs. ${(parseInt(val)).toLocaleString()}`;
                                            },
                                        },
                                        tooltip: {
                                            x: {
                                                format: 'dd MMM yyyy'
                                            }
                                        }
                                    },
                                }}
                                series={[
                                    {
                                        name: "New Bookings",
                                        data: DailyClosing.NewBookingAmounts,
                                    },
                                    {
                                        name: "Installments",
                                        data: DailyClosing.InstallmentAmounts,
                                    },
                                    {
                                        name: "Other Transactions",
                                        data: DailyClosing.OtherTransactionAmounts,
                                    },
                                    {
                                        name: "Online Transfers",
                                        data: DailyClosing.OnlineTransferAmounts,
                                    },
                                    {
                                        name: "Expenses",
                                        data: DailyClosing.ExpensesAmounts,
                                    },
                                    {
                                        name: "Cash in Hand",
                                        data: DailyClosing.CashInHandAmounts,
                                    },
                                    {
                                        name: "Plot Transfers",
                                        data: DailyClosing.PlotTransferAmounts,
                                    },
                                ]}
                                type="bar"
                                className="apex-charts mt-3"
                                height={600} />
                    </CardBody>
                </Card>
            </React.Fragment> :
            <Preloader 
                isDataFetched={IsDataFetched}
                retryLink={"/khyberCity/sales"} />;
    }
};

export default Sales;