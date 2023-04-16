import React from "react";
import Flatpickr from "react-flatpickr";

import { 
    Row, Col, Card, CardBody, 
    Button, Media, Modal, ModalHeader, 
    ModalBody, ModalFooter,
    Form, FormGroup,
    Container, Input } from "reactstrap";

import axios from "axios";

import DonutChart from "./DonutChart";
import PageTitle from '../../../components/PageTitle';
import Preloader from "../../../components/Preloader";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit";

import NoDataSVG from "../../../assets/images/no-data.svg";

const columns = [
    {
        dataField: "ID",
        text: "ID",
        hidden: true,
    },
    {
        dataField: "Date",
        text: "Date",
        sort: true,
    },
    {
        dataField: "Amount",
        text: "Amount",
        sort: true,
    },
    {
        dataField: "Type",
        text: "Type",
        sort: true,
    },
    {
        dataField: "ExpenseBy",
        text: "Expense By",
        sort: false,
    },
    {
        dataField: "Description",
        text: "Description",
        sort: false,
    },
];

function ToTitleCase (string) {
    let splitString = string.toLowerCase().split(" ");

    for (let i = 0; i < splitString.length; ++i) {
        splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
    }

    return splitString.join(" ");
}

const ExpenseLogsTable = (props) => {
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    const {
        expenseLogs,
        columns,
    } = props;

    return <ToolkitProvider
                bootstrap4
                keyField="ID"
                data={expenseLogs}
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
                                        text: "5",
                                        value: 5,
                                    },
                                    {
                                        text: "10",
                                        value: 10,
                                    },
                                    {
                                        text: "15",
                                        value: 15,
                                    },
                                    {
                                        text: "20",
                                        value: 20,
                                    },
                                ],
                            })}
                            wrapperClasses="table-responsive"
                        />
                    </React.Fragment>
                )}
            </ToolkitProvider>;
};

class Expenses extends React.Component {
    constructor(props) {
        super(props);

        let oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 365);

        this.state = {
            IsDataFetched: false,
            IsDataFound: false,
            RawExpenses: [],
            Expenses: [],
            ShowModals: [],
            DateRange: [oneWeekAgo, new Date()],
        };

        this.toggle = this.toggle.bind(this);
        this.onFilter = this.onFilter.bind(this);
    }

    toggle = (index) => {
        let { ShowModals } = this.state;
        ShowModals[index] = !ShowModals[index];

        this.setState({
            ShowModals: ShowModals,
        });

        this.setExpenses = this.setExpenses.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/khyberCity/expenses`);

            this.setState({
                IsDataFetched: true,
            });

            if (response.data.Message === "Data found.") {
                let rawExpenses = response.data.RawExpenses;

                this.setState({
                    IsDataFound: true,
                    RawExpenses: rawExpenses,
                });

                if (rawExpenses.length > 0) {
                    this.onFilter();
                } else {
                    this.setState({
                        Expenses: []
                    });
                }
            }
        } catch (error) {
            this.setState({
                IsDataFetched: true,
            });
          }
    }

    setExpenses = rawExpenses => {
        let expenses = [];

        const categories = [...(new Set(rawExpenses.map(row => row.Category)))];
        
        for (const category of categories) {
            const categoryRows = rawExpenses.filter(row => row.Category === category);

            const types = [...(new Set(categoryRows.map(categoryRow => categoryRow.Type)))];

            let expenseTypes = [];

            for (const type of types) {
                const typeRows = categoryRows.filter(categoryRow => categoryRow.Type === type);

                expenseTypes.push({
                    Type: type,
                    Amount: typeRows.reduce((sum, typeRow) =>
                        sum + typeRow.Amount, 0)
                });
            }

            const totalAmount = categoryRows.reduce((sum, categoryRow) =>
                sum + categoryRow.Amount, 0);

            const expenseLogs = categoryRows.map(categoryRow => {
                return {
                    ID: categoryRow.ID,
                    Description: categoryRow.Description,
                    Amount: `Rs. ${(categoryRow.Amount).toLocaleString()}`,
                    ExpenseBy: ToTitleCase(categoryRow.ExpenseBy),
                    Date: new Date(categoryRow.Date).toLocaleDateString(),
                    Type: categoryRow.Type,
                };
            });

            rawExpenses.filter(row => row.Category === category); 

            expenses.push({
                Name: category,
                TotalAmount: totalAmount,
                ExpenseLogs: expenseLogs,
                ExpenseTypes: expenseTypes,
            }); 
        }

        let showModals = [];
        showModals.fill(false, 0, expenses.length);

        this.setState({
            Expenses: expenses,
            ShowModals: showModals,
        });
    };

    onFilter = () => {
        let { 
            RawExpenses,
            DateRange,
        } = this.state;

        if (DateRange.length !== 2) {
            return;
        }

        let filteredRawExpenses = [];

        const fromTimestamp = new Date(DateRange[0]).getTime();
        const toTimestamp = new Date(DateRange[1]).getTime();

        let length = RawExpenses.length;

        for (let i = 0; i < length; i++) {
            const timeStamp = new Date(RawExpenses[i].Date).getTime();

            if (timeStamp >= fromTimestamp &&
                timeStamp <= toTimestamp) {
                filteredRawExpenses.push(RawExpenses[i]);
            }
        }

        console.log(filteredRawExpenses);
        this.setExpenses(filteredRawExpenses);
    };

    render() {
        const {
            IsDataFetched,
            IsDataFound,
            RawExpenses,
            Expenses,
            ShowModals,
            DateRange,
        } = this.state;

        return IsDataFound? 
        <React.Fragment>
        <Row className="page-title">
            <Col md={12}>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Khyber City', path: '/khyberCity/sales' },
                        { label: 'Expenses', path: '/khyberCity/expenses', active: true },
                    ]}
                    title={"Expenses"}
                />
            </Col>
        </Row>

        <Card>
            <CardBody>
                <h5 className="card-title header-title">Select Date Range</h5>

                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Flatpickr 
                            value={DateRange}
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
                                this.setExpenses(RawExpenses);
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

        {Expenses.length > 0 ?
        <React.Fragment>
            <Row>
                
                {Expenses.map((expense, index) => 
                    <Col key={index}>
                        <Card>
                            <CardBody>
                                <h4 className="header-title mt-0 mb-3">{expense.Name}</h4>
                                <DonutChart 
                                    seriesLabels={expense.ExpenseTypes.map(expenseType => expenseType.Type)}
                                    seriesData={expense.ExpenseTypes.map(expenseType => expenseType.Amount)} />

                                <Row>
                                    <Col md={6} xl={6}>
                                        <Media className="p-3">
                                            <Media body>
                                                <span className="text-muted text-uppercase font-size-12 font-weight-bold">Total Amount</span>
                                                <h2 className="mb-2">{`Rs. ${(expense.TotalAmount).toLocaleString()}`}</h2>
                                                <Button color="primary" onClick={() => this.toggle(index)}>View Expenses</Button>
                                            </Media>
                                        </Media>
                                    </Col>
                                </Row>

                                <Modal
                                    isOpen={ShowModals[index]}
                                    toggle={() => this.toggle(index)}
                                    size="xl">
                                    
                                    <ModalHeader toggle={() => this.toggle(index)}>{expense.Name}</ModalHeader>

                                    <ModalBody>
                                        <h5 className="card-title header-title">Total Amount</h5>
                                        <p className="text-info font-weight-bold">{`Rs. ${(expense.TotalAmount).toLocaleString()}`}</p>
                                        <hr />
                                        
                                        <h5 className="card-title header-title">
                                            Expense Logs<span className="badge badge-info ml-2">{expense.ExpenseLogs.length.toLocaleString()}</span>
                                        </h5>

                                        <ExpenseLogsTable
                                            expenseLogs={expense.ExpenseLogs}
                                            columns={columns} />
                                    </ModalBody>
                                    
                                    <ModalFooter>
                                        <Button color="secondary" className="ml-1" onClick={() => this.toggle(index)}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </CardBody>
                        </Card>
                    </Col>)}
            </Row>
        </React.Fragment> :
        <Container>
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
                    <h3 className="mt-3">No expenses found.</h3>
                </Col>
            </Row>
        </Container>}

        
    </React.Fragment> : 
    <Preloader 
        isDataFetched={IsDataFetched}
        retryLink={"/khyberCity/expenses"} />;
    }
};

export default Expenses;