import React, { useEffect } from "react";
import Chart from "react-apexcharts";

import Select from 'react-select';

import { 
    Row, Col, Card, CardBody, 
    Button, Spinner, Progress, 
    UncontrolledTooltip, 
    Container, Form, FormGroup, Input, } from "reactstrap";

import axios from "axios";

import CustomerSVG from "../../../assets/images/customer.svg";
import SearchingDealersSVG from "../../../assets/images/searching-dealers.svg";
import NoDataSVG from "../../../assets/images/no-data.svg";
import DealerSVG from "../../../assets/images/dealer.svg";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";

const DealerSearch = (props) => {
    useEffect(() => {
        document.body.classList.remove("authentication-bg");
    });

    const {
        isDealerSearched,
        onRetry,
    } = props;

    const colors = [ "primary", "danger", "info" ];

    return <React.Fragment>
        <div className="my-5">
            <Container>
                {isDealerSearched ? 
                    <div>
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
                                <h3 className="mt-3">Oops! No data found.</h3>
                                <p className="text-muted mb-2">Either this dealer does not exist, or there may be some network issue.<br /> Please try again for the latter!</p>
                                <Button onClick={onRetry} className="btn btn-lg btn-primary mt-4">Retry</Button>
                            </Col>
                        </Row>
                    </div> : 
                    <div>
                        <Row className="justify-content-center">
                            <Col xl={4} lg={5}>
                                <div className="text-center">
                                    <div>
                                        <img src={SearchingDealersSVG} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <h3 className="mt-3">Searching Dealer</h3>
                                
                                <div>
                                    {colors.map((color, index) => {
                                        return <Spinner key={index} className="m-2" size="sm" type="grow" color={color} />;
                                    })}
                                </div>
                            </Col>
                        </Row>
                    </div>}
            </Container>
        </div>
    </React.Fragment>;
}

const DealerBox = (props) => {
    const { dealer } = props;

    const averageRecoveryPercentageColor = dealer.AverageRecoveryPercentage > 80 ? "success" : 
        (dealer.AverageRecoveryPercentage > 50 ? "info" :
        (dealer.AverageRecoveryPercentage > 30 ? "warning" : "danger"));

    let dealerBadge = "star";
    let dealerColor = "primary";
    let dealerCategory = "Unknown Dealer";

    if (dealer.AverageRecoveryPercentage > 80) {
        dealerBadge = "smile";
        dealerColor = "success";
        dealerCategory = "Green Dealer";
    } else if (dealer.AverageRecoveryPercentage > 50) {
        dealerBadge = "meh";
        dealerColor = "warning";
        dealerCategory = "Yellow Dealer";
    } else {
        dealerBadge = "frown";
        dealerColor = "danger";
        dealerCategory = "Red Dealer";
    }

    const totalAmount = dealer.TotalRecoveredAmount + dealer.TotalBalanceAmount;

    return (
        <Card>
            <CardBody className="profile-user-box">
                <Row>
                    <Col>
                        <div className="text-center mt-3">
                            <img src={DealerSVG} alt=""
                                className="avatar-lg rounded-circle" />

                            <h5 className="mt-2 mb-0">{dealer.Name}</h5>

                            <h6 className="text-muted font-weight-normal mt-2 mb-0">
                                <span className={`badge badge-soft-${dealerColor} py-1`}>
                                <span className={`fas fa-${dealerBadge} mr-2`} />{dealerCategory}</span>
                            </h6>

                            <h6 className="text-muted font-weight-normal mt-4 mb-1">Average Plot Recovery</h6>

                            <Progress striped className="progress-xl mb-4" id={`progress-average-recovery-${dealer.ID}`} 
                                color={averageRecoveryPercentageColor} value={dealer.AverageRecoveryPercentage} />

                            <UncontrolledTooltip
                                placement="bottom"
                                id={`tooltip-average-recovery-${dealer.ID}`}
                                target={`progress-average-recovery-${dealer.ID}`} >{`${dealer.AverageRecoveryPercentage}%`}</UncontrolledTooltip>

                            <a href={`https://api.whatsapp.com/send?phone=${dealer.ContactNumber}`}
                                rel="noopener noreferrer" target="_blank" className="btn btn-success btn-sm mr-1">
                            <span className="fab fa-whatsapp mr-2" />Message</a>
                        </div>

                        <div className="mt-3 pt-2 border-top">
                            <h4 className="mb-3 font-size-15">Dealer Information</h4>
                            <div className="table-responsive">
                                <table className="table table-borderless mb-0 text-muted">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Dealer ID</th>
                                            <td>{dealer.DealerID}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Contact Number</th>
                                            <td>{dealer.ContactNumber}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Number of Plots</th>
                                            <td>
                                            <span className="badge badge-info">{dealer.Plots.length}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td>{dealer.Address === "" ? "Not Available" : dealer.Address }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {dealer.HasParentDealer &&
                            <div className="mt-3 pt-2 border-top">
                                <h4 className="mb-3 font-size-15">Parent Dealer</h4>
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0 text-muted">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Dealer ID</th>
                                                <td>{dealer.ParentDealer.DealerID}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Name</th>
                                                <td>{dealer.ParentDealer.Name}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>}

                        <div className="mt-3 pt-2 border-top">
                            <h4 className="mb-3 font-size-15">Payment Overview</h4>
                            <Chart
                                options={{
                                    chart: {
                                        type: "pie",
                                    },
                                    plotOptions: {
                                        pie: {
                                            donut: {
                                                size: "50%"
                                            }
                                        }
                                    },
                                    colors: ["#43D39E", "#FF5C75", "#FFBE0B"],
                                    labels: ["Total Recovered Amount", "Total Short Amount", "Total Balance Amount"],
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
                                series={[
                                    dealer.TotalRecoveredAmount, 
                                    dealer.TotalRecoveredAmount, 
                                    dealer.TotalBalanceAmount - dealer.TotalShortAmount ]}
                                type="donut"
                                className="apex-charts" />
                            
                            <div className="table-responsive">
                                    <table className="table table-borderless mb-0 text-muted">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Total Amount</th>
                                                <td>
                                                    <span className="text-primary font-weight-bold">{`Rs. ${totalAmount.toLocaleString()}`}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Recovered Amount</th>
                                                <td>
                                                    <span className="text-success font-weight-bold">{`Rs. ${dealer.TotalRecoveredAmount.toLocaleString()}`}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Short Amount</th>
                                                <td>
                                                    <span className="text-danger font-weight-bold">{`Rs. ${dealer.TotalShortAmount.toLocaleString()}`}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Balance Amount (Short Inclusive)</th>
                                                <td>
                                                    <span className="text-warning font-weight-bold">{`Rs. ${dealer.TotalBalanceAmount.toLocaleString()}`}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                        </div>

                        <div className="mt-3 pt-2 border-top">
                                <h4 className="mb-3 font-size-15">Commission Details</h4>
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0 text-muted">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Commission Percentage</th>
                                                <td>
                                                    <span className="text-info font-weight-bold">{`${dealer.Commission}%`}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total Commission</th>
                                                <td>
                                                    <span className="text-info font-weight-bold">{`Rs. ${dealer.TotalCommission.toLocaleString()}`}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Commission Received</th>
                                                <td>
                                                <span className="text-info font-weight-bold">{`Rs. ${dealer.AmountReceived.toLocaleString()}`}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

const plotColumns = [
    {
        dataField: "RowNumber",
        text: "Row #",
        sort: true,
        hidden: true
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
        sort: false,
        formatter: (cell, row, rowIndex, extraData) =>
            row.PlotType === "Commercial" ? row.PlotType : "Residential",
    },
    {
        dataField: "RecoveryPercentage",
        text: "Recovery",
        formatter: (cell, row, rowIndex, extraData) => {
            const recoveryPercentage = row.RecoveryPercentage ?? 100.00;

            const color = recoveryPercentage > 80 ? "success" : 
                (recoveryPercentage > 50 ? "info" :
                (recoveryPercentage > 30 ? "warning" : "danger"));

            return <React.Fragment>
                    <Progress id={`progress-recovery-${row.RowNumber}`} 
                        color={color} value={recoveryPercentage} className="progress-xl" />

                    <UncontrolledTooltip
                        placement="bottom"
                        id={`tooltip-recovery-${row.RowNumber}`}
                        target={`progress-recovery-${row.RowNumber}`} >{`${recoveryPercentage.toFixed(2)}%`}</UncontrolledTooltip>
                </React.Fragment>;
        },
        sort: false,
    },
    {
        dataField: "BookingType",
        text: "Booking Type",
        formatter: (cell, row, rowIndex, extraData) =>
            row.BookingType === "By Installment" ? 
                <span className="badge badge-soft-info py-1">Installment</span> :
                <span className="badge badge-soft-warning py-1">Cash</span>,
        sort: false,
    },
    {
        dataField: "IsBlocked",
        text: "Status",
        formatter: (cell, row, rowIndex, extraData) =>
            row.IsBlocked ? 
                <span className="badge badge-soft-danger py-1">Blocked</span> :
                <span className="badge badge-soft-success py-1">Active</span>,
        sort: false,
    },
];

const PlotsTable = (props) => {
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    const {
        plots,
        columns,
        expandRenderer
    } = props;

    return <ToolkitProvider
                bootstrap4
                keyField="RowNumber"
                data={plots}
                columns={columns}
                search
                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                {props => (
                    <React.Fragment>
                        <Row>
                            <Col>
                                <SearchBar {...props.searchProps} />
                            </Col>
                            <Col className="text-right">
                                <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                                    Export CSV
                                </ExportCSVButton>
                            </Col>
                        </Row>

                        <BootstrapTable
                            {...props.baseProps}
                            pagination={paginationFactory({
                                paginationSize: 5,
                                pageStartIndex: 1,
                                firstPageText: "First",
                                prePageText: "Back",
                                nextPageText: "Next",
                                lastPageText: "Last",
                                nextPageTitle: "First page",
                                prePageTitle: "Pre page",
                                firstPageTitle: "Next page",
                                lastPageTitle: "Last page",
                                showTotal: true,
                                paginationTotalRenderer: (from, to, size) => (
                                    <span className="react-bootstrap-table-pagination-total ml-4">
                                        Showing {from.toLocaleString()} to {to.toLocaleString()} of {size.toLocaleString()} Results
                                    </span>
                                ),
                                sizePerPageRenderer: ({ options, currSizePerPage: currentSizePerPage, onSizePerPageChange }) => (
                                    <React.Fragment>
                                        <label className="d-inline mr-1">Show</label>

                                        <Input type="select" name="select" id="no-entries" 
                                            className="custom-select custom-select-sm d-inline col-1"
                                            defaultValue={currentSizePerPage}
                                            onChange={(event) => onSizePerPageChange(event.target.value)}>
                                                {options.map((option, index) => {
                                                    return <option key={index}>{option.text}</option>
                                                })}
                                        </Input>

                                        <label className="d-inline ml-1">entries</label>
                                    </React.Fragment>
                                ),
                                sizePerPageList: [
                                    {
                                        text: "10",
                                        value: 10,
                                    },
                                    {
                                        text: "20",
                                        value: 20,
                                    },
                                    {
                                        text: "30",
                                        value: 30,
                                    },
                                    {
                                        text: "40",
                                        value: 40,
                                    },
                                ],
                            })}
                            expandRow={{
                                renderer: expandRenderer,
                                showExpandColumn: true,
                                onlyOneExpanding: true,
                                expandHeaderColumnRenderer: ({ isAnyExpands }) => {
                                    return isAnyExpands ? <i className="uil uil-minus"></i> : <i className="uil uil-plus"></i>;
                                },
                                expandColumnRenderer: ({ expanded }) => {
                                    return expanded ? <i className="uil uil-minus"></i> : <i className="uil uil-plus"></i>;
                                },
                            }}
                            wrapperClasses="table-responsive"
                        />
                    </React.Fragment>
                )}
            </ToolkitProvider>;
};

const expandRenderer = row => {
    return <div className="bg-light p-4">
            <h5 className="card-title text-uppercase font-size-16">Further Details</h5>

            <Row>
                <Col lg={6}>
                    <h4 className="mb-3 font-size-15">Payment Details</h4>

                    {row.BookingType === "By Installment" ?
                        <React.Fragment>
                            <Chart
                                options={{
                                    chart: {
                                        type: "pie",
                                    },
                                    plotOptions: {
                                        pie: {
                                            donut: {
                                                size: "50%"
                                            }
                                        }
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

                            <ul className="list mb-0">
                                <li className="list-item pr-2">
                                    <p><strong>Total Amount</strong><br />
                                        <span className="text-primary font-weight-bold">{`Rs. ${row.TotalAmount.toLocaleString()}`}</span>
                                    </p>
                                </li>
                                <li className="list-item pr-2">
                                    <p><strong>Paid Amount</strong><br />
                                        <span className="text-success font-weight-bold">{`Rs. ${row.PaidAmount.toLocaleString()}`}</span>
                                    </p>
                                </li>
                                <li className="list-item pr-2">
                                    <p><strong>Short Amount</strong><br />
                                        <span className="text-danger font-weight-bold">{`Rs. ${row.ShortAmount.toLocaleString()}`}</span>
                                    </p>
                                </li>
                                <li className="list-item pr-2">
                                    <p><strong>Remaining Amount (Short Inclusive)</strong><br />
                                        <span className="text-warning font-weight-bold">{`Rs. ${row.RemainingAmount.toLocaleString()}`}</span>
                                    </p>
                                </li>
                            </ul>
                        </React.Fragment> :
                        <React.Fragment>
                            <Chart
                                options={{
                                    chart: {
                                        type: "pie",
                                    },
                                    plotOptions: {
                                        pie: {
                                            donut: {
                                                size: "50%"
                                            }
                                        }
                                    },
                                    colors: ["#43D39E", "#FFBE0B"],
                                    labels: ["Paid Amount", "Remaining Amount"],
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
                                series={[row.PaidAmount, 0 ]}
                                type="donut"
                                className="apex-charts" />

                            <ul className="list mb-0">
                                <li className="list-item pr-2">
                                    <p><strong>Total: </strong><br />
                                        <span className="text-primary font-weight-bold">
                                        {`Rs. ${row.TotalAmount.toLocaleString()}`}</span>
                                    </p>
                                    <p><strong>Paid: </strong><br />
                                        <span className="text-success font-weight-bold">
                                        {`Rs. ${row.PaidAmount.toLocaleString()}`}</span>
                                    </p>
                                </li>
                            </ul>
                        </React.Fragment>}
                </Col>
                <Col lg={6}>
                    <h4 className="mb-3 font-size-15">Booking Details</h4>

                    <ul className="list mb-0">
                        <li className="list-item pr-2">
                            <p><strong>Booking Date</strong><br />
                                {new Date(row.BookingDate).toLocaleString("default", { year: "numeric", month: "long", day: "numeric" })}
                            </p>
                        </li>
                        {row.BookingType === "By Installment" &&
                            <React.Fragment>
                                <li className="list-item pr-2">
                                    <p><strong>Latest Payment Activity</strong><br />
                                    {new Date(row.LastDatePaid).toLocaleString("default", { year: "numeric", month: "long", day: "numeric" })}
                                    </p>
                                </li>
                                <li className="list-item pr-2">
                                    <p><strong>Monthly Installment Due Date</strong><br />
                                    {new Date(row.DueDate).toLocaleString("default", { year: "numeric", month: "long", day: "numeric" })}
                                    </p>
                                </li>
                                <li className="list-item pr-2">
                                    <p><strong>Periodic Installment Due Date</strong><br />
                                    {new Date(row.PeriodicDueDate).toLocaleString("default", { year: "numeric", month: "long", day: "numeric" })}
                                    </p>
                                </li>
                            </React.Fragment>}
                    </ul>

                    <hr />
                    <h4 className="mb-3 font-size-15">Customer Details</h4>

                    <Row>
                        <Col lg={2}>
                            <img src={CustomerSVG} className="avatar m-1 rounded-circle" alt="Dealer" />
                        </Col>

                        <Col lg={10}>
                            <ul className="list mb-0">
                                <li className="list-item pr-2">
                                    <p><strong>Membership Number</strong><br />{row.MembershipNumber}</p>
                                </li>
                                <li className="list-item pr-2">
                                    <p><strong>Name</strong><br />{row.CustomerName}</p>
                                </li>
                                <li className="list-item pr-2">
                                    <p><strong>Contact</strong><br />{row.ContactNumber}</p>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            </div>;
};

class DealerDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DisableSelect: false,
            IsDealerSearched: false,
            IsDealerFound: false,
            DealerIDs: [],
            DealerID: "",
            Dealer: {},
            activeTab: "1"
        };

        this.toggleTab = this.toggleTab.bind(this);
        this.searchDealer = this.searchDealer.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    searchDealer = async () => {
        const { DealerID } = this.state;

        this.setState({
            IsDealerSearched: false,
            IsDealerFound: false,
        });

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/khyberCity/dealer`,
                {
                    params: {
                        DealerID: DealerID
                    },
                });

            this.setState({
                IsDealerSearched: true,
            });

            if (response.data.Message === "Data found.") {
                this.setState({
                    IsDealerFound: true,
                    Dealer: response.data.Dealer,
                });
            }
          } catch (error) {
            this.setState({
                IsDealerSearched: true,
            });
          }
    };

    async componentDidMount() {
        this.setState({
            DisableSelect: true
        });

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/khyberCity/dealerIDs`);

            if (response.data.Message === "Data found.") {
                const dealerIDs = response.data.DealerIDs;

                this.setState({
                    DisableSelect: false,
                    DealerIDs: dealerIDs,
                    DealerID: dealerIDs.length > 0 ? 
                        dealerIDs[0] : ""
                });
            }
          } catch (error) {
            this.setState({
                DisableSelect: true,
                DealerIDs: [],
            });
        }

        this.searchDealer("");
    }

    render() {
        const {
            DisableSelect,
            IsDealerSearched,
            IsDealerFound,
            DealerIDs,
            Dealer,
        } = this.state;

        return <React.Fragment>
        <Card>
            <CardBody>
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Select
                            styles={{
                                control : styles => ({...styles, minWidth: "200px" })
                            }}
                            className="react-select"
                            classNamePrefix="react-select"
                            disabled={DisableSelect}
                            onChange={selectedOption => {
                                this.setState({
                                    DealerID: selectedOption.value
                                });
                            }}
                            options={DealerIDs.map((item, index) => {
                                return {
                                    value: item,
                                    label: item,
                                };
                            })}></Select>
                    </FormGroup>
                    <Button className="btn-rounded" color="primary" onClick={this.searchDealer} disabled={!IsDealerSearched}>
                        <span className="fas fa-search" />
                    </Button>
                </Form>
            </CardBody>
        </Card>

        {IsDealerFound ? 
            <React.Fragment>
                <Row>
                    <Col lg={4}>
                        <DealerBox 
                            dealer={Dealer} />
                    </Col>

                    <Col lg={8}>
                        <Card>
                            <CardBody>
                                <h5 className="card-title header-title">Plots</h5>

                                <PlotsTable 
                                    plots={Dealer.Plots}
                                    columns={plotColumns}
                                    expandRenderer={expandRenderer} />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <h5 className="card-title header-title">Plot Recovery Statistics</h5>
                                
                                <Chart options={{
                                    chart: {
                                        height: 400,
                                        type: 'pie',
                                    },
                                    colors: Dealer.RecoveryStatistics.map(item => item.Color),
                                    labels: Dealer.RecoveryStatistics.map(item => item.Name),
                                    tooltip: {
                                        theme: 'dark',
                                        x: { show: false },
                                        y: { 
                                            show: true,
                                            formatter: function (value) {
                                                return `${(value).toLocaleString()} Plots`
                                            } 
                                        }
                                    },
                                    legend: {
                                        show: true,
                                        position: 'bottom',
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
                                }} 
                                series={Dealer.RecoveryStatistics.map(item => item.Count)} type="pie" height={400} className="apex-charts" />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment> :
            <DealerSearch
                isDealerSearched={IsDealerSearched}
                onRetry={this.searchDealer} />}

    </React.Fragment>
    }
};

export default DealerDetails;