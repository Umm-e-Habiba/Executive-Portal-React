import React from "react";
import Chart from 'react-apexcharts';

import { 
    Row, Col, Card, CardBody, 
    Button, Media, Modal, ModalHeader, 
    ModalBody, ModalFooter, Spinner, Progress, 
    UncontrolledTooltip, 
    Container, Alert } from "reactstrap";

import axios from "axios";

import PageTitle from '../../../components/PageTitle';
import Preloader from "../../../components/Preloader";
import PieChart from "./PieChart";
import ExpandableTable from "./ExpandableTable";
import SelectableTable from "./SeletableTable";

import PlotsImage from "../../../assets/images/plots.svg";
import NoDataSVG from "../../../assets/images/no-data.svg";
import BookingDetailsSVG from "../../../assets/images/booking-details.svg";
import UnblockPlotsSVG from "../../../assets/images/unblock-plots.svg";
import ProcessingSVG from "../../../assets/images/processing.svg";

const colors = ['primary', 'primary', 'primary' ];

const plotDetailsColumns = [
    {
        dataField: "RowNumber",
        text: "Row #",
        sort: true,
    },
    {
        dataField: "PlotNumber",
        text: "Plot #",
        sort: true,
    },
    {
        dataField: "Size",
        text: "Size",
        sort: false,
    },
    {
        dataField: "TotalAmount",
        text: "Total Amount",
        sort: true,
    },
    {
        dataField: "IsBooked",
        text: "Is Booked?",
        formatter: (cell, row, rowIndex, extraData) =>
            row.IsBooked ? 
                <span className="badge badge-soft-success py-1">Booked</span> : 
                <span className="badge badge-soft-warning py-1">Unbooked</span>,
        sort: false,
    },
    {
        dataField: "IsBlocked",
        text: "Is Blocked?",
        formatter: (cell, row, rowIndex, extraData) =>
            row.IsBlocked ? 
                <span className="badge badge-soft-danger py-1">Blocked</span> : 
                <span className="badge badge-soft-success py-1">Active</span>,
        sort: false,
    },
];

const plotDetailsExpandRenderer = row => {
    return row.IsBooked ? 
        <Card className="bg-light">
            <Row className="align-items-center p-3">
                <Col md={7}>
                    <CardBody>
                        <h5 className="card-title text-uppercase font-size-16">Booking Details</h5>
                        <div className="table-responsive">
                            <table className="table table-borderless mb-0 text-muted">
                                <tbody>
                                    <tr>
                                        <th scope="row">Booking Type</th>
                                        <td>{row.BookingType}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Booking Date</th>
                                        <td>{row.BookingDate}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Customer's Membership #</th>
                                        <td>{row.MembershipNumber}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Customer Name</th>
                                        <td>{row.CustomerName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Dealer ID</th>
                                        <td>{row.DealerID}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Dealer Name</th>
                                        <td>{row.DealerName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Paid Amount</th>
                                        <td>{row.PaidAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Col>
                <Col md={5}>
                    <img className="card-img" src={BookingDetailsSVG} alt="Booking Details" />
                </Col>
            </Row>
        </Card>  : 
        <Card className="bg-light align-items-center p-3">
            <CardBody>
                <Row className="justify-content-center">
                    <Col xl={4} lg={5}>
                        <div className="text-center">
                            <div>
                                <img src={NoDataSVG} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <h3 className="mt-3">Booking details not found!</h3>
                        <p className="text-muted mb-2"><strong>{`Plot # ${row.PlotNumber} `}</strong>is not booked.</p>
                    </Col>
                </Row>
            </CardBody>
        </Card>;
};

const blockedPlotsColumns = [
    {
        dataField: "RowNumber",
        text: "Row #",
        sort: true,
    },
    {
        dataField: "PlotID",
        text: "Plot ID",
        sort: false,
        hidden: true,
    },
    {
        dataField: "PlotNumber",
        text: "Plot #",
        sort: true,
    },
    {
        dataField: "Size",
        text: "Size",
        sort: false,
    },
    {
        dataField: "PlotType",
        text: "Plot Type",
        formatter: (cell, row, rowIndex, extraData) =>
            row.PlotType === "Commercial" ? row.PlotType : "Residential",
        sort: false,
    },
    {
        dataField: "TotalAmount",
        text: "Total Amount",
        formatter: (cell, row, rowIndex, extraData) =>
            `Rs. ${row.TotalAmount.toLocaleString()}`,
        sort: true,
    },
    {
        dataField: "RecoveryPercentage",
        text: "Recovery",
        formatter: (cell, row, rowIndex, extraData) => {
            const color = row.RecoveryPercentage > 50 ? "info" : (row.RecoveryPercentage > 30 ? "warning" : "danger");

            return <React.Fragment>
                    <Progress id={`progress-recovery-progress-${row.RowNumber}`} 
                        color={color} value={row.RecoveryPercentage} className="progress-xl" />

                    <UncontrolledTooltip
                        placement="bottom"
                        id={`tooltip-recovery-progress-${row.RowNumber}`}
                        target={`progress-recovery-progress-${row.RowNumber}`} >{`${row.RecoveryPercentage}%`}</UncontrolledTooltip>
                </React.Fragment>;
        },
        sort: false,
    },
    {
        dataField: "IsBlocked",
        text: "Status",
        formatter: (cell, row, rowIndex, extraData) =>
            <span className="badge badge-soft-danger py-1">Blocked</span>,
        sort: false,
    },
];

const blockedPlotsExpandRenderer = row => {
    return <div className="bg-light p-4">
            <h5 className="card-title text-uppercase font-size-16">Further Details</h5>

            <Row className="align-items-center">
                <Col lg={6}>
                    <h6 className="mt-0 mb-2 font-weight-bold">PAYMENT DETAILS</h6>

                    <Chart
                        options={{
                            chart: {
                                type: "pie",
                            },
                            colors: ["#43D39E", "#FF5C75", "#FFBE0B"],
                            labels: ["Paid Amount", "Short Amount", "Remaining Amount"],
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
                                show: false,
                            },
                        }}
                        series={[row.PaidAmount, row.ShortAmount, row.RemainingAmount - row.ShortAmount ]}
                        type="donut"
                        className="apex-charts" />

                    <hr />
                    <p><strong>Total Amount: </strong>{`Rs. ${row.TotalAmount.toLocaleString()}`}</p>
                    <hr />

                </Col>
                <Col lg={6}>
                    <div className="mt-4 mt-lg-0">
                        <h6 className="mt-0 mb-2 font-weight-bold">BOOKING DETAILS</h6>

                        <p><strong>Booking Type: </strong>{row.BookingType}</p>
                        <hr />
                        <p><strong>Booking Date: </strong>{row.BookingDate}</p>
                        <hr />
                        <p><strong>Last Installment Paid On: </strong>{row.LastDatePaid}</p>
                        <hr />
                        <p><strong>Next Installment Due Date: </strong>{row.DueDate}</p>
                        <hr />
                        <p><strong>Customer Membership #: </strong>{row.MembershipNumber}</p>
                        <hr />
                        <p><strong>Customer Name: </strong>{row.CustomerName}</p>
                        <hr />
                        <p><strong>Dealer ID: </strong>{row.DealerID}</p>
                        <hr />
                        <p><strong>Dealer Name: </strong>{row.DealerName}</p>
                    </div>
                </Col>
            </Row>
            
            </div>;
};

class Plots extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsDataFetched: false,
            IsDataFound: false,
            PlotSummary: [],
            ShowResidentialPlotsModal: false,
            ShowCommercialPlotsModal: false,
            ResidentailPlotDetails: [],
            CommercialPlotDetails: [],
            BlockedPlots: [],
            NumberOfSelectedPlots: 0,
            SelectedPlotRows: [],
            UnblockingPlots: false,
            UnblockAlerts: [],
        };

        this.toggle = this.toggle.bind(this);
        this.onUnblockPlots = this.onUnblockPlots.bind(this);
    }

    toggle = (modelType) => {
        let {
            ShowResidentialPlotsModal,
            ShowCommercialPlotsModal
        } = this.state;

        if (modelType === "Residential") {
            ShowResidentialPlotsModal = !ShowResidentialPlotsModal;

            this.setState({
                ShowResidentialPlotsModal: ShowResidentialPlotsModal
            });
        } else {
            ShowCommercialPlotsModal = !ShowCommercialPlotsModal;

            this.setState({
                ShowCommercialPlotsModal: ShowCommercialPlotsModal
            });
        }
    }

    onUnblockPlots = async () => {
        const { 
            SelectedPlotRows, 
            NumberOfSelectedPlots,
            UnblockAlerts } = this.state;

        if (NumberOfSelectedPlots === 0) {
            return;
        }

        this.setState({
            UnblockingPlots: true,
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/khyberCity/unblockPlots`, {
                PlotIDs: SelectedPlotRows.map(row => row.PlotID),
            });
    
            if (response.data.Message === "Plots unblocked.") {
                let { BlockedPlots } = this.state;
    
                for (const row of SelectedPlotRows) {
                    BlockedPlots = BlockedPlots.filter((value, index, arr) => value.PlotID !== row.PlotID);
                }

                UnblockAlerts.unshift({
                    ID: UnblockAlerts.length,
                    Color: "success",
                    Message: `Successfully unblocked ${SelectedPlotRows.length} plots.`
                });
    
                this.setState({
                    UnblockingPlots: false,
                    BlockedPlots: BlockedPlots,
                    NumberOfSelectedPlots: 0,
                    SelectedPlotRows: [],
                    UnblockAlerts: UnblockAlerts,
                });
            } else {
                UnblockAlerts.unshift({
                    ID: UnblockAlerts.length,
                    Color: "warning",
                    Message: "Unable to unblock plots due to some internal problem. Please try later!"
                });
    
                this.setState({
                    UnblockingPlots: false,
                    NumberOfSelectedPlots: 0,
                    SelectedPlotRows: [],
                    UnblockAlerts: UnblockAlerts,
                });
            }
        } catch (error) {
            UnblockAlerts.unshift({
                ID: UnblockAlerts.length,
                Color: "danger",
                Message: error.message
            });

            this.setState({
                UnblockingPlots: false,
                NumberOfSelectedPlots: 0,
                SelectedPlotRows: [],
                UnblockAlerts: UnblockAlerts,
            });
        }
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/khyberCity/plots`);

            this.setState({
                IsDataFetched: true,
            });

              if (response.data.Message === "Data found.") {
                  this.setState({
                      IsDataFound: true,
                      PlotSummary: response.data.PlotSummary,
                      ResidentailPlotDetails: response.data.ResidentailPlotDetails,
                      CommercialPlotDetails: response.data.CommercialPlotDetails,
                      BlockedPlots: response.data.BlockedPlots,
                    });
              }
          } catch (error) {
            this.setState({
                IsDataFetched: true,
            });
          }
    }

    render() {
        const {
            IsDataFetched,
            IsDataFound,
            PlotSummary,
            ShowResidentialPlotsModal,
            ShowCommercialPlotsModal,
            ResidentailPlotDetails,
            CommercialPlotDetails,
            BlockedPlots,
            NumberOfSelectedPlots,
            UnblockingPlots,
            UnblockAlerts,
        } = this.state;

        return IsDataFound? 
        <React.Fragment>
        <Row className="page-title">
            <Col md={12}>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Khyber City', path: '/khyberCity/sales' },
                        { label: 'Plots', path: '/khyberCity/plots', active: true },
                    ]}
                    title={"Plots"}
                />
            </Col>
        </Row>

        {PlotSummary.length > 0 &&
            <React.Fragment>
                <Card>
                    <Row className="align-items-center p-3">
                        <Col md={7}>
                            <CardBody>
                                <h5 className="card-title text-uppercase font-size-16">Commerical & Residential Plots</h5>
                                <p className="card-text text-muted">
                                    <strong> Plot Summary:</strong> Gives you a complete visualization of booked/unbooked residential and commericial plots. On hovering over the <strong>Pie Slice</strong> lets you see the total number of plots in that category. Click on <strong>Veiw Details</strong> button to view complete plot details in tabular form.
                                </p>
                            </CardBody>
                        </Col>
                        <Col md={5}>
                            <img className="card-img" src={PlotsImage} alt="Plots" />
                        </Col>
                    </Row>
                </Card>

                <h6>PlOTS SUMMARY</h6>
                
                <Row>
                    {PlotSummary.map((plotSummaryItem, index) => {
                        const isRedentialPlotsData = plotSummaryItem.Name === "Residential Plots" ? 
                            true : false;

                        const modalType = isRedentialPlotsData ? "Residential" : "Commercial";

                        return <Col key={index} xl={6}>
                            <Card>
                                <CardBody>
                                    <h4 className="header-title mt-0 mb-3">{plotSummaryItem.Name}</h4>
                                    <PieChart 
                                        labels={plotSummaryItem.Labels}
                                        series={plotSummaryItem.Counts}
                                        colors={["#"]} />

                                    <Row>
                                        <Col md={6} xl={6}>
                                            <Media className="p-3">
                                                <Media body>
                                                    <span className="text-muted text-uppercase font-size-12 font-weight-bold">{`Total ${plotSummaryItem.Name}`}</span>
                                                    <h2 className="mb-2">{plotSummaryItem.TotalPlots.toLocaleString()}</h2>
                                                    <Button color="primary" onClick={() => this.toggle(modalType)}>View Details</Button>
                                                </Media>
                                            </Media>
                                        </Col>
                                    </Row>

                                    <Modal
                                        isOpen={isRedentialPlotsData ? ShowResidentialPlotsModal : ShowCommercialPlotsModal}
                                        toggle={() => this.toggle(modalType)}
                                        size="xl">
                                        
                                        <ModalHeader toggle={() => this.toggle(modalType)}>{plotSummaryItem.Name}</ModalHeader>

                                        <ModalBody>
                                            <h6>{`Total ${plotSummaryItem.Name}`}</h6>
                                            <p>{plotSummaryItem.TotalPlots.toLocaleString()}</p>
                                            <hr />
                                            
                                            <h6>PLOT DETAILS</h6>

                                            <ExpandableTable
                                                records={isRedentialPlotsData ? ResidentailPlotDetails : CommercialPlotDetails}
                                                columns={plotDetailsColumns}
                                                expandRenderer={plotDetailsExpandRenderer} />
                                        </ModalBody>
                                        
                                        <ModalFooter>
                                            <Button color="secondary" className="ml-1" onClick={() => this.toggle(modalType)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </CardBody>
                            </Card>
                        </Col>;
                    })}
                </Row>

                <h6>BLOCKED PLOTS</h6>

                <Row className="align-items-center">
                    <Col>
                        <Card>
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col xl={2} lg={3}>
                                        <img src={UnblockPlotsSVG} className="mr-4 align-self-center img-fluid" alt="Unblock Plots" />
                                    </Col>
                                    <Col xl={10} lg={9}>
                                        <div className="mt-4 mt-lg-0">
                                            <h5 className="mt-0 mb-1 font-weight-bold">Blocked Plots</h5>
                                            <p className="text-muted mb-2">
                                                Following table shows you the detailed information of blocked plots. All of these plots have recovery percentage less than <strong>70%</strong>. Select the plots that you want to unblock, then click on <strong>Unblock Selected Plots</strong> button to proceed.
                                            </p>

                                            <p><strong>Total Blocked Plots:</strong><span className={`font-size-12 badge badge-success ml-2`}>{BlockedPlots.length.toLocaleString()}</span></p>

                                            <p><span className="badge badge-soft-success py-1">{NumberOfSelectedPlots.toLocaleString()} plots selected</span></p>
                                            <Button color="primary" className="mt-2 mr-2" onClick={this.onUnblockPlots} disabled={NumberOfSelectedPlots === 0 ? true : false}>Unblock Selected Plots</Button>
                                        </div>
                                    </Col>
                                </Row>

                                <hr />

                                {UnblockingPlots ? 
                                    <React.Fragment>
                                        <div className="my-5">
                                            <Container>
                                                <div>
                                                    <Row className="justify-content-center">
                                                        <Col xl={4} lg={5}>
                                                            <div className="text-center">
                                                                <div>
                                                                    <img src={ProcessingSVG} alt="" className="img-fluid" />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="text-center">
                                                            <h3 className="mt-3">Unblocking Plots</h3>
                                                            
                                                            <div>
                                                                {colors.map((color, index) => {
                                                                    return <Spinner key={index} className="m-2" size="sm" type="grow" color={color} />;
                                                                })}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Container>
                                        </div>
                                    </React.Fragment> : 
                                    <React.Fragment>
                                        {UnblockAlerts.map((unblockAlert, index) => 
                                            <Alert 
                                                key={index} 
                                                color={unblockAlert.Color} 
                                                isOpen={true} 
                                                toggle={() => {
                                                    let { UnblockAlerts } = this.state;

                                                    UnblockAlerts = UnblockAlerts.filter((value, index, arr) => 
                                                        value.ID !== unblockAlert.ID);

                                                    this.setState({
                                                        UnblockAlerts: UnblockAlerts,
                                                    });
                                                }}>{unblockAlert.Message}</Alert>)}

                                        <h5 className="card-title header-title">Plot Details</h5>   

                                        <SelectableTable
                                            records={BlockedPlots}
                                            columns={blockedPlotsColumns}
                                            expandRenderer={blockedPlotsExpandRenderer}
                                            onSelect={(isSelected, row) => {
                                                let { SelectedPlotRows } = this.state;

                                                if (isSelected) {
                                                    SelectedPlotRows.push(row);

                                                    this.setState({
                                                        SelectedPlotRows: SelectedPlotRows,
                                                        NumberOfSelectedPlots: SelectedPlotRows.length
                                                    });
                                                } else {
                                                    SelectedPlotRows = SelectedPlotRows.filter((value, index, arr) => value !== row);

                                                    this.setState({
                                                        SelectedPlotRows: SelectedPlotRows,
                                                        NumberOfSelectedPlots: SelectedPlotRows.length
                                                    });
                                                }
                                            }}
                                            onSelectAll={(isSelected, rows) => {
                                                let { SelectedPlotRows } = this.state;

                                                if (isSelected) {
                                                    for (const row of rows) {
                                                        SelectedPlotRows.push(row);
                                                    }

                                                    this.setState({
                                                        SelectedPlotRows: SelectedPlotRows,
                                                        NumberOfSelectedPlots: SelectedPlotRows.length
                                                    });
                                                } else {
                                                    for (const row of rows) {
                                                        SelectedPlotRows = SelectedPlotRows.filter((value, index, arr) => value !== row);
                                                    }

                                                    this.setState({
                                                        SelectedPlotRows: SelectedPlotRows,
                                                        NumberOfSelectedPlots: SelectedPlotRows.length
                                                    });
                                                }
                                            }} />
                                    </React.Fragment>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>}
    </React.Fragment> : 
    <Preloader 
        isDataFetched={IsDataFetched}
        retryLink={"/khyberCity/plots"} />;
    }
};

export default Plots;