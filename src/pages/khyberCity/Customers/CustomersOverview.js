import React from "react";
import Chart from 'react-apexcharts';

import { 
    Row, Col, Card, CardBody, 
    Progress, UncontrolledTooltip, Input} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";

import axios from "axios";

import Preloader from "../../../components/Preloader";

const customerColumns = [
    {
        dataField: "ID",
        text: "ID",
        sort: true,
        hidden: true
    },
    {
        dataField: "MembershipNumber",
        text: "Membership #",
        sort: true,
    },
    {
        dataField: "CustomerName",
        text: "Name",
        sort: false,
    },
    {
        dataField: "ContactNumber",
        text: "Contact",
        sort: false,
    },
    {
        dataField: "Address",
        text: "Address",
        sort: false,
    },
    {
        dataField: "RecoveryPercentage",
        text: "Overall Recovery",
        formatter: (cell, row, rowIndex, extraData) => {
            const recoveryPercentage = row.RecoveryPercentage ?? 100.00;

            const color = recoveryPercentage > 80 ? "success" : 
                (recoveryPercentage > 50 ? "info" :
                (recoveryPercentage > 30 ? "warning" : "danger"));

            return <React.Fragment>
                    <Progress id={`progress-overall-recovery-${row.ID}`} 
                        color={color} value={recoveryPercentage} className="progress-xl" />

                    <UncontrolledTooltip
                        placement="bottom"
                        id={`tooltip-overall-recovery-${row.ID}`}
                        target={`progress-overall-recovery-${row.ID}`} >{`${recoveryPercentage.toFixed(2)}%`}</UncontrolledTooltip>
                </React.Fragment>;
        },
        sort: false,
    },
];

const CustomersTable = (props) => {
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    const {
        customers,
        columns,
    } = props;

    return <ToolkitProvider
                bootstrap4
                keyField="RowNumber"
                data={customers}
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
                            wrapperClasses="table-responsive"
                        />
                    </React.Fragment>
                )}
            </ToolkitProvider>;
};

class CustomersOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsDataFetched: false,
            IsDataFound: false,
            Customers: [],
            CustomerTypes: [],
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/khyberCity/customers`);

            this.setState({
                IsDataFetched: true,
            });

              if (response.data.Message === "Data found.") {
                  this.setState({
                      IsDataFound: true,
                      Customers: response.data.Customers,
                      CustomerTypes: response.data.CustomerTypes,
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
            Customers,
            CustomerTypes,
        } = this.state;

        return IsDataFound ? 
            <React.Fragment>
                {Customers.length > 0 &&
                    <React.Fragment>
                        <Card>
                            <CardBody>
                                <h5 className="card-title header-title">
                                    All Customers<span className="badge badge-info ml-2">{Customers.length.toLocaleString()}</span>
                                </h5>

                                <CustomersTable
                                    columns={customerColumns}
                                    customers={Customers} />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <h5 className="card-title header-title">Customers Statistics</h5>
                                
                                <Chart options={{
                                    chart: {
                                        height: 400,
                                        type: 'pie',
                                    },
                                    colors: CustomerTypes.map(item => item.Color),
                                    labels: CustomerTypes.map(item => item.Name),
                                    tooltip: {
                                        theme: 'dark',
                                        x: { show: false },
                                        y: { 
                                            show: true,
                                            formatter: function (value) {
                                                return `${(value).toLocaleString()} Customers`
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
                                series={CustomerTypes.map(item => item.Count)} type="pie" height={400} className="apex-charts" />
                            </CardBody>
                        </Card>
                    </React.Fragment>}
            </React.Fragment> : 
            <Preloader
                isDataFetched={IsDataFetched}
                retryLink={"/khyberCity/customers"} />;
    }
};

export default CustomersOverview;