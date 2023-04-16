import React from "react";

import { 
    Row, Col, Card, CardBody, 
    Button, Media, Modal, ModalHeader, 
    ModalBody, ModalFooter } from "reactstrap";

import axios from "axios";

import DonutChart from "./DonutChart";
import PageTitle from '../../../components/PageTitle';
import PaginationTable from "./PaginationTable";
import Preloader from "../../../components/Preloader";

const columns = [
    {
        dataField: "ID",
        text: "ID",
        sort: true,
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

const defaultSorted = [
    {
        dataField: "Date",
        order: "desc",
    },
];

class Expenses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsDataFetched: false,
            IsDataFound: false,
            Expenses: [],
            ShowModals: []
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle = (index) => {
        let { ShowModals } = this.state;
        ShowModals[index] = !ShowModals[index];

        this.setState({
            ShowModals: ShowModals,
        });
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/khyberCity/expenses`);

            this.setState({
                IsDataFetched: true,
            });

              if (response.data.Message === "Data found.") {
                  let expenses = response.data.Expenses;
                  
                  let showModals = [];
                  showModals.fill(false, 0, expenses.length);

                  this.setState({
                      IsDataFound: true,
                      Expenses: expenses,
                      ShowModals: showModals,
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
            Expenses,
            ShowModals,
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

        <h6>CATEGORY WISE STATISTICS</h6>

        <Row>
            {Expenses.map((expense, index) => 
                <Col key={index} xl={12}>
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
                                    <h6>TOTAL AMOUNT</h6>
                                    <p>{`Rs. ${(expense.TotalAmount).toLocaleString()}`}</p>
                                    <hr />
                                    
                                    <h6>EXPENSE LOGS</h6>

                                    <PaginationTable
                                        records={expense.ExpenseLogs}
                                        columns={columns}
                                        defaultSorted={defaultSorted} />
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
    <Preloader 
    isDataFetched={IsDataFetched}
    retryLink={"/khyberCity/expenses"} />;
    }
};

export default Expenses;