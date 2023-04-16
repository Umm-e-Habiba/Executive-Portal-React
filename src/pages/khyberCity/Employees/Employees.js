import React from "react";
import Chart from "react-apexcharts";

import { 
    Row, Col, Card, CardBody, 
    Button, Media, Modal, ModalHeader, 
    ModalBody, ModalFooter,
    Container } from "reactstrap";

import axios from "axios";

import PageTitle from "../../../components/PageTitle";
import Preloader from "../../../components/Preloader";

import NoDataSVG from "../../../assets/images/no-data.svg";
import EmployeeMaleSVG from "../../../assets/images/employee-male.svg";
import VisitorSVG from "../../../assets/images/visitor.svg";

const EmployeesGrid = (props) => {
    const { 
        employees,
        showModals,
        toggleModal } = props;

    return (
        <React.Fragment>
            <Row>
                {employees.map((employee, index) => {
                    const numberOfReviews = employee.Reviews.length;

                    let averageRating = ((employee.AverageRating ?? 0.00) / 20).toFixed(1);

                    let ratingColor = averageRating > 4 ? "success" : 
                        (averageRating > 2.5 ? "info" :
                        (averageRating > 1.5 ? "warning" : "danger"));

                    if (numberOfReviews === 0) {
                        averageRating = "Unrated";
                        ratingColor = "secondary";
                    }

                    return (
                        <Col lg={6} xl={4} key={`cash-plot-${employee.RowNumber}`}>
                            <Card>
                                <CardBody className="pb-0">
                                    <div className="text-center mt-3">
                                        <img src={EmployeeMaleSVG} alt=""
                                            className="avatar-xl rounded-circle" />
                                        
                                        <h5 className="mt-2 mb-0">{employee.Name}</h5>
                                        <h6 className="text-muted font-weight-normal mt-2 mb-0">{employee.Designation}</h6>

                                        {employee.IsIMSUser ? <h6 className="text-muted font-weight-normal mt-2 mb-0">
                                            <span className={`badge badge-soft-success py-1 ml-2`}>
                                            <span className={`fas fa-desktop mr-1`} />IMS User</span>
                                        </h6> : <h6 className="text-muted font-weight-normal mt-2 mb-0">
                                            <span className={`badge badge-soft-secondary py-1 ml-2`}>
                                            <span className={`fas fa-user mr-1`} />Regular</span>
                                        </h6>}

                                        <h6 className="text-muted font-weight-normal mt-2 mb-4">
                                            <span className={`badge badge-soft-${employee.Role === "Unknown" ? "secondary" : "primary"} py-1`}>
                                            <span className={`fas fa-shield-alt mr-2`} />{employee.Role}</span>
                                            <span className={`badge badge-soft-${ratingColor} py-1 ml-2`}>
                                            <span className={`fas fa-star mr-1`} />{averageRating}</span>
                                        </h6>

                                        <a href={`https://api.whatsapp.com/send?phone=${employee.PhoneNo}`}
                                            rel="noopener noreferrer" target="_blank" className="btn btn-success btn-sm mr-1">
                                            <span className="fab fa-whatsapp mr-2" />Message</a>
                                    </div>

                                    <div className="mt-3 pt-2 border-top">
                                        <h4 className="mb-3 font-size-15">Employee Details</h4>
                                        <div className="table-responsive">
                                            <table className="table table-borderless mb-0 text-muted">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Username</th>
                                                        <td>{employee.Username ? `@${employee.Username.toLowerCase()}` : "@anonymous"}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Contact Number</th>
                                                        <td>{employee.PhoneNo}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Total Reviews</th>
                                                        <td>
                                                            <span className="badge badge-info">{numberOfReviews.toLocaleString()}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="mt-4 mb-4 pt-3 border-top text-left">
                                        <Button color="outline-info" className="btn-block"
                                            disabled={numberOfReviews === 0}
                                            onClick={() => toggleModal(index)}>Reviews and Ratings</Button>
                                    </div>

                                    {numberOfReviews > 0 &&
                                    <Modal
                                    className="bg-light"
                                    isOpen={showModals[index]}
                                    toggle={() => toggleModal(index)}
                                    size="md">
                                    
                                    <ModalHeader toggle={() => toggleModal(index)}>{`Reviews for @${employee.Username.toLowerCase()}`}</ModalHeader>

                                    <ModalBody>
                                        <Card>
                                            <CardBody>
                                                <Chart 
                                                    options={{
                                                        chart: {
                                                            height: 160,
                                                            type: "line",
                                                            zoom: {
                                                                enabled: false
                                                            }
                                                        },
                                                        colors: ["#FEB019"],
                                                        dataLabels: {
                                                            enabled: false
                                                        },
                                                        yaxis: {
                                                            labels: {
                                                                formatter: function (val) {
                                                                    return `${val} Stars`;
                                                                },
                                                            }
                                                        },
                                                    }} 
                                                    series={[{
                                                        name: "Stars",
                                                        data: employee.Reviews.map(review => (review.Rating / 20).toFixed(1))
                                                    }]} 
                                                    type="line" height={160} />

                                                <h5 className="card-title mb-0 header-title">
                                                    Showing<span className={`font-size-12 badge badge-success ml-2`}>Top 10</span>
                                                </h5>

                                                {employee.Reviews.map((review, index) => {
                                                    const rating = (review.Rating / 20).toFixed(1);

                                                    const color = rating > 4 ? "success" : 
                                                        (rating > 2.5 ? "info" :
                                                        (rating > 1.5 ? "warning" : "danger"));

                                                    return <Media key={index} className="mt-3">
                                                        <img src={VisitorSVG} className="mr-3 avatar rounded-circle" alt="shreyu" />
                                                        <Media body>
                                                            <h6 className="text-muted font-weight-normal">
                                                                <span className={`badge badge-soft-${color} py-1`}>
                                                                <span className={`fas fa-star mr-1`} />{rating}</span>
                                                            </h6>
                                                            <h6 className="mt-0 mb-0 font-size-15 font-weight-normal">
                                                                <span className="font-weight-bold text-secondary mr-1">{review.VisitorName}</span>{`wrote: `}<span className="font-italic">{review.Review}</span>
                                                            </h6>
                                                            <p className="text-muted">{new Date(review.Date).toLocaleString("en-US", {
                                                                weekday: "long", 
                                                                day: "numeric", 
                                                                year: "numeric",
                                                                month: "long",
                                                                hour: "numeric",
                                                                minute: "numeric",
                                                            })}</p>
                                                        </Media>
                                                    </Media>;
                                                })}
                                            </CardBody>
                                        </Card>
                                    </ModalBody>
                                    
                                    <ModalFooter>
                                        <Button color="secondary" className="ml-1" onClick={() => toggleModal(index)}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>}
                                </CardBody>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </React.Fragment>
    );
};

class Employees extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsDataFetched: false,
            IsDataFound: false,
            Employees: [],
            ShowModals: [],
        };

        this.toggleModal = this.toggleModal.bind(this);;
    }

    toggleModal = (index) => {
        let { ShowModals } = this.state;

        ShowModals[index] = !ShowModals[index];

        this.setState({
            ShowModals: ShowModals
        });
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/khyberCity/employees`);

            this.setState({
                IsDataFetched: true,
            });

            if (response.data.Message === "Data found.") {
                this.setState({
                    IsDataFound: true,
                    Employees: response.data.Employees,
                    ShowModals: Array.from(
                        { length: response.data.Employees.length }, () => false),
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
            Employees,
            ShowModals,
        } = this.state;

        return IsDataFound? 
        <React.Fragment>
        <Row className="page-title">
            <Col md={12}>
                <PageTitle
                    breadCrumbItems={[
                        { label: "Khyber City", path: "/khyberCity/sales" },
                        { label: "Employees", path: "/khyberCity/employees", active: true },
                    ]}
                    title={"Employees"}
                />
            </Col>
        </Row>

        {Employees.length > 0 ?
            <React.Fragment>
                <EmployeesGrid 
                    employees={Employees}
                    showModals={ShowModals}
                    toggleModal={this.toggleModal} />
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
                        <h3 className="mt-3">No employees found.</h3>
                    </Col>
                </Row>
            </Container>}
    </React.Fragment> : 
    <Preloader 
        isDataFetched={IsDataFetched}
        retryLink={"/khyberCity/employees"} />;
    }
};

export default Employees;