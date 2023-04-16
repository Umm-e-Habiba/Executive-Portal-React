import React, { useEffect } from "react";
import classNames from "classnames";
import Chart from 'react-apexcharts';

import Select from 'react-select';

import { 
    Row, Col, Card, CardBody, 
    Button, Media, Modal, ModalHeader, 
    ModalBody, ModalFooter, Spinner, Progress, 
    UncontrolledTooltip, 
    Container, Form, FormGroup, Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";

import axios from "axios";

import CustomerSVG from "../../../assets/images/customer.svg";
import SearchingCustomersSVG from "../../../assets/images/searching-customers.svg";
import NoDataSVG from "../../../assets/images/no-data.svg";
import DealerSVG from "../../../assets/images/dealer.svg";

const CustomerSearch = (props) => {
    useEffect(() => {
        document.body.classList.remove("authentication-bg");
    });

    const {
        isCustomerSearched,
        onRetry,
    } = props;

    const colors = [ "success", "danger", "warning" ];

    return <React.Fragment>
        <div className="my-5">
            <Container>
                {isCustomerSearched ? 
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
                                <p className="text-muted mb-2">Either this customer does not exist, or there may be some network issue.<br /> Please try again for the latter!</p>
                                <Button onClick={onRetry} className="btn btn-lg btn-primary mt-4">Retry</Button>
                            </Col>
                        </Row>
                    </div> : 
                    <div>
                        <Row className="justify-content-center">
                            <Col xl={4} lg={5}>
                                <div className="text-center">
                                    <div>
                                        <img src={SearchingCustomersSVG} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <h3 className="mt-3">Searching Customer</h3>
                                
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

const CustomerBox = (props) => {
    const { customer } = props;

    const color = customer.AverageRecoveryPercentage > 80 ? "success" : 
        (customer.AverageRecoveryPercentage > 50 ? "info" :
        (customer.AverageRecoveryPercentage > 30 ? "warning" : "danger"));

    return (
        <Card className="">
            <CardBody className="profile-user-box">
                <Row>
                    <Col>
                        <div className="text-center mt-3">
                            <img src={customer.ProfilePicture} alt=""
                                className="avatar-lg rounded-circle" />

                            <h5 className="mt-2 mb-0">{customer.Name}</h5>

                            <h6 className="text-muted font-weight-normal mt-2 mb-0">
                                {customer.FingerprintTaken ? 
                                    <span className="badge badge-soft-success py-1">
                                    <span className="fas fa-fingerprint mr-2" />Fingerprint Found</span> :
                                    <span className="badge badge-soft-danger py-1">
                                    <span className="fas fa-fingerprint mr-2" />No Fingerprint Found</span>}
                            </h6>

                            <h6 className="text-muted font-weight-normal mt-4 mb-1">Average Plot Recovery</h6>

                            <Progress striped className="progress-xl mb-4" id={`progress-average-recovery-${customer.CustomerID}`} 
                                color={color} value={customer.AverageRecoveryPercentage} />

                            <UncontrolledTooltip
                                placement="bottom"
                                id={`tooltip-average-recovery-${customer.CustomerID}`}
                                target={`progress-average-recovery-${customer.CustomerID}`} >{`${customer.AverageRecoveryPercentage}%`}</UncontrolledTooltip>

                            <a href={`https://api.whatsapp.com/send?phone=${customer.ContactNumber}`}
                                rel="noopener noreferrer" target="_blank" className="btn btn-success btn-sm mr-1">
                            <span className="fab fa-whatsapp mr-2" />Message</a>
                        </div>

                        <div className="mt-3 pt-2 border-top">
                            <h4 className="mb-3 font-size-15">Customer Information</h4>
                            <div className="table-responsive">
                                <table className="table table-borderless mb-0 text-muted">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Membership Number</th>
                                            <td>{customer.MembershipNumber}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Contact Number</th>
                                            <td>{customer.ContactNumber}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Next of Kin</th>
                                            <td>{customer.NextOfKin === null || 
                                                customer.NextOfKin === "" ? 
                                                "Not Available" : customer.NextOfKin}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Number of Plots</th>
                                            <td>
                                                <span className="badge badge-info">{customer.NumberOfPlots}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td>{customer.Address === "" ? "Not Available" : customer.Address }</td>
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

const CashPlotsGrid = (props) => {
    const { cashPlots } = props;

    return (
        <React.Fragment>
            <h5 className="mt-3">Cash Plots</h5>

            {cashPlots.length > 0 ? 
                <Row>
                    {cashPlots.map((cashPlot, index) => {
                        return (
                            <Col lg={4} xl={6} key={`cash-plot-${cashPlot.RowNumber}`}>
                                <Card className="border">
                                    <CardBody>
                                        <h1 className="justify-content-center mb-2">
                                            <span className={classNames("fas",
                                            {
                                                "text-success": cashPlot.PlotType === "Commercial",
                                                "text-info": cashPlot.PlotType === "Non Commercial",
                                                "fa-hotel": cashPlot.PlotType === "Commercial",
                                                "fa-home": cashPlot.PlotType === "Non Commercial"
                                            })}></span>
                                        </h1>
                                        
                                        <div className="badge float-right badge-success">Active</div>

                                        <p className={classNames("text-uppercase", "font-size-12", "mb-2",
                                            {
                                                "text-success": cashPlot.PlotType === "Commercial",
                                                "text-info": cashPlot.PlotType === "Non Commercial",
                                            })}>{cashPlot.PlotType === "Commercial" ? cashPlot.PlotType : "Residential"}</p>

                                        <hr />                                       
                                        <h4 className="mb-3 font-size-15">Plot Details</h4>

                                        <ul className="list mb-0">
                                            <li className="list-item pr-2">
                                                <p><strong>Plot Number: </strong>{cashPlot.PlotNumber}</p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Size: </strong>{cashPlot.Size}</p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Street: </strong>{cashPlot.StreetNumber}</p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Booking Date: </strong>{cashPlot.BookingDate}</p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Total Amount: </strong>
                                                <span className="font-size-16 font-weight-bold text-primary">{`Rs. ${cashPlot.TotalAmount.toLocaleString()}`}</span>
                                                </p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Paid Amount: </strong>
                                                <span className="font-size-16 font-weight-bold text-success">{`Rs. ${cashPlot.PaidAmount.toLocaleString()}`}</span>
                                                </p>
                                            </li>
                                        </ul>

                                        <hr />
                                        <h4 className="mb-3 font-size-15">Dealer Details</h4>

                                        <Row>
                                            <Col lg={2}>
                                                <img src={DealerSVG} className="avatar m-1 rounded-circle" alt="Dealer" />
                                            </Col>

                                            <Col lg={10}>
                                                <ul className="list mb-0">
                                                    <li className="list-item pr-2">
                                                        <p><strong>ID: </strong>{cashPlot.DealerID}</p>
                                                    </li>
                                                    <li className="list-item pr-2">
                                                        <p><strong>Name: </strong>{cashPlot.DealerName}</p>
                                                    </li>
                                                    <li className="list-item pr-2">
                                                        <p><strong>Commission: </strong>
                                                        <span className="font-size-16 font-weight-bold text-info">{`Rs. ${((cashPlot.DealerCommission / 100) * cashPlot.TotalAmount).toLocaleString()}`}</span>
                                                        </p>
                                                    </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </CardBody>

                                    <CardBody className="border-top">
                                        <Row className="align-items-center">
                                            <Col className="col-sm-auto">Recovery</Col>
                                            <Col className="offset-sm-1">
                                                <Progress value={100} id={`progress-cash-plot-recovery-${cashPlot.RowNumber}`} 
                                                    color="success" className="progress-sm" />

                                                <UncontrolledTooltip
                                                    placement="bottom"
                                                    id={`tooltip-cash-plot-recovery-${cashPlot.RowNumber}`}
                                                    target={`progress-cash-plot-recovery-${cashPlot.RowNumber}`} >100%</UncontrolledTooltip>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row> :
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
                            <h3 className="mt-3">No cash plots found.</h3>
                        </Col>
                    </Row>
                </Container>}
        </React.Fragment>
    );
};

const InstallmentEvent = (props) => {
    const { installment } = props;
    const date = new Date(installment.Date);

    const color = installment.Type === "New Booking" ? "success" :
        installment.Type === "Monthly" ? "info" : "warning";

    return <Media>
        <div className="event-date text-center mr-4">
            <div className="avatar-sm rounded-circle bg-soft-primary">
                <span className="font-size-16 avatar-title text-primary font-weight-semibold">{date.getDate().toLocaleString("default", {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                })}</span>
            </div>
            <p className="mt-2">{`${date.toLocaleString("default", { month: "short" })}, ${date.getFullYear()}`}</p>
        </div>
        <Media body>
            <Card className="d-inline-block">
                <CardBody>
                    <Row>
                        <Col lg={2}>
                            <div>
                                <img className="img-fluid border mb-2" alt="QR Code" src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${installment.QRContent}&choe=UTF-8`} />
                            </div>
                        </Col>
                        <Col lg={10}>
                            <div className={`badge float-right badge-${color}`}>{installment.Type}</div>
                            <p className={`text-uppercase font-size-16 text-${color}`}>{`Rs. ${installment.Amount.toLocaleString()}`}</p>

                            <ul className="list mb-2">
                                <li className="list-item pr-2">
                                    <p><strong>Invoice Number: </strong>{installment.InvoiceNumber}</p>
                                </li>
                                <li className="list-item pr-2">
                                    <p><strong>Amount Received By: </strong>{installment.ReceivedBy}</p>
                                </li>
                            </ul>

                            <p><strong>NOTE: </strong>Scan the QR Code from KCEB IMS to see complete invoice. Paid amount till this transaction was <strong>{`Rs. ${installment.PaidAmount.toLocaleString()}`}</strong>, and the remaining amount was <strong>{`Rs. ${installment.RemainingAmount.toLocaleString()}`}</strong></p>
                        </Col> 
                    </Row>

                    
                </CardBody>
            </Card>
        </Media>
    </Media>;
};

const InstallmentPlotsGrid = (props) => {
    const { 
        installmentPlots,
        showModals,
        toggleModal
     } = props;

    return (
        <React.Fragment>
            <h5 className="mt-3">Installment Plots</h5>

            {installmentPlots.length > 0 ? 
                <Row>
                    {installmentPlots.map((installmentPlot, index) => {
                        const recoveryColor = installmentPlot.RecoveryPercentage > 80 ? "success" : 
                            (installmentPlot.RecoveryPercentage > 50 ? "info" :
                            (installmentPlot.RecoveryPercentage > 30 ? "warning" : "danger"));

                        return (
                            <Col lg={4} xl={6} key={`cash-plot-${installmentPlot.RowNumber}`}>
                                <Card className="border">
                                    <CardBody>
                                        <h1 className="justify-content-center mb-2">
                                            <span className={classNames("fas",
                                            {
                                                "text-success": installmentPlot.PlotType === "Commercial",
                                                "text-info": installmentPlot.PlotType === "Non Commercial",
                                                "fa-hotel": installmentPlot.PlotType === "Commercial",
                                                "fa-home": installmentPlot.PlotType === "Non Commercial"
                                            })}></span>
                                        </h1>
                                        
                                        <div className={classNames("badge", "float-right",
                                            {
                                                "badge-success": !installmentPlot.IsBlocked,
                                                "badge-danger": installmentPlot.IsBlocked,
                                            })}>{installmentPlot.IsBlocked ? "Blocked" : "Active"}</div>

                                        <p className={classNames("text-uppercase", "font-size-12", "mb-2",
                                            {
                                                "text-success": installmentPlot.PlotType === "Commercial",
                                                "text-info": installmentPlot.PlotType === "Non Commercial",
                                            })}>{installmentPlot.PlotType === "Commercial" ? installmentPlot.PlotType : "Residential"}</p>

                                        <hr />                                      
                                        <h4 className="mb-3 font-size-15">Plot Details</h4>

                                        <ul className="list mb-0">
                                            <li className="list-item pr-2">
                                                <p><strong>Plot Number: </strong>{installmentPlot.PlotNumber}</p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Size: </strong>{installmentPlot.Size}</p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Street: </strong>{installmentPlot.StreetNumber}</p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Booking Date: </strong>{installmentPlot.BookingDate}</p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Total Amount: </strong>
                                                <span className="font-size-16 font-weight-bold text-primary">{`Rs. ${installmentPlot.TotalAmount.toLocaleString()}`}</span>
                                                </p>
                                            </li>
                                            <li className="list-item pr-2">
                                                <p><strong>Paid Amount: </strong>
                                                <span className="font-size-16 font-weight-bold text-success">{`Rs. ${installmentPlot.PaidAmount.toLocaleString()}`}</span>
                                                </p>
                                            </li>
                                        </ul>

                                        <hr />
                                        <h4 className="mb-3 font-size-15">Dealer Details</h4>

                                        <Row>
                                            <Col lg={2}>
                                                <img src={DealerSVG} className="avatar m-1 rounded-circle" alt="Dealer" />
                                            </Col>

                                            <Col lg={10}>
                                                <ul className="list mb-0">
                                                    <li className="list-item pr-2">
                                                        <p><strong>ID: </strong>{installmentPlot.DealerID}</p>
                                                    </li>
                                                    <li className="list-item pr-2">
                                                        <p><strong>Name: </strong>{installmentPlot.DealerName}</p>
                                                    </li>
                                                    <li className="list-item pr-2">
                                                        <p><strong>Commission: </strong>
                                                        <span className="font-size-16 font-weight-bold text-info">{`Rs. ${((installmentPlot.DealerCommission / 100) * installmentPlot.TotalAmount).toLocaleString()}`}</span>
                                                        </p>
                                                    </li>
                                                </ul>
                                            </Col>
                                        </Row>

                                        <hr />
                                        <Button color="outline-info" className="btn-rounded btn-block" 
                                            onClick={() => toggleModal(index)}>View More</Button>

                                        <Modal
                                            className="bg-light"
                                            isOpen={showModals[index]}
                                            toggle={() => toggleModal(index)}
                                            size="xl">
                                            
                                            <ModalHeader toggle={() => toggleModal(index)}>{`Plot Number: ${installmentPlot.PlotNumber}`}</ModalHeader>

                                            <ModalBody>
                                                <Row>
                                                    <Col>
                                                        <Card>
                                                            <CardBody className="p-0">
                                                                <h6 className="card-title border-bottom p-3 mb-0 header-title">Plot Overview</h6>

                                                                <Row className="py-1">
                                                                    <Col xl={4} sm={5}>
                                                                        <Media className="p-3">
                                                                            <h1 className="m-0 text-muted"><span className="fas fa-th-large align-self-center mr-4" /></h1>
                                                                            <Media body>
                                                                                <h4 className="mt-0 mb-0">{installmentPlot.Size}</h4>
                                                                                <span className="text-muted font-size-13">Plot Size</span>
                                                                            </Media>
                                                                        </Media>
                                                                    </Col>
                                                                    <Col xl={4} sm={5}>
                                                                        <Media className="p-3">
                                                                            <h1 className="m-0 text-muted"><span className={`fas ${installmentPlot.PlotType === "Commercial" ? "fa-hotel" : "fa-home"} align-self-center mr-4`} /></h1>
                                                                            <Media body>
                                                                                <h4 className="mt-0 mb-0">{installmentPlot.PlotType === "Commercial" ? installmentPlot.PlotType : "Residential"}</h4>
                                                                                <span className="text-muted font-size-13">Plot Type</span>
                                                                            </Media>
                                                                        </Media>
                                                                    </Col>
                                                                    <Col xl={4} sm={5}>
                                                                        <Media className="p-3">
                                                                            <h1 className="m-0 text-muted"><span className="fas fa-calendar-check align-self-center mr-4" /></h1>
                                                                            <Media body>
                                                                                <h4 className="mt-0 mb-0">{installmentPlot.BookingDate}</h4>
                                                                                <span className="text-muted font-size-13">Booking Date</span>
                                                                            </Media>
                                                                        </Media>
                                                                    </Col>
                                                                    <Col xl={4} sm={5}>
                                                                        <Media className="p-3">
                                                                            <h1 className="m-0 text-muted"><span className="fas fa-clock align-self-center mr-4" /></h1>
                                                                            <Media body>
                                                                                <h4 className="mt-0 mb-0">{installmentPlot.LastDatePaid}</h4>
                                                                                <span className="text-muted font-size-13">Latest Payment Activity</span>
                                                                            </Media>
                                                                        </Media>
                                                                    </Col>
                                                                    <Col xl={4} sm={5}>
                                                                        <Media className="p-3">
                                                                            <h1 className="m-0 text-muted"><span className="fas fa-calendar-alt align-self-center mr-4" /></h1>
                                                                            <Media body>
                                                                                <h4 className={`mt-0 mb-0 ${ (new Date(installmentPlot.DueDate).getTime() < new Date().getTime() && 
                                                                                    installmentPlot.PaidAmount !== installmentPlot.TotalAmount) && "text-danger" }`}>{installmentPlot.DueDate}</h4>
                                                                                <span className="text-muted font-size-13">Monthly Due Date</span>
                                                                            </Media>
                                                                        </Media>
                                                                    </Col>
                                                                    <Col xl={4} sm={5}>
                                                                        <Media className="p-3">
                                                                            <h1 className="m-0 text-muted"><span className="fas fa-calendar-day align-self-center mr-4" /></h1>
                                                                            <Media body>
                                                                                <h4 className={`mt-0 mb-0 ${ (new Date(installmentPlot.DueDate).getTime() < new Date().getTime() && 
                                                                                    installmentPlot.PaidAmount !== installmentPlot.TotalAmount) && "text-danger" }`}>{installmentPlot.PeriodicDueDate}</h4>
                                                                                <span className="text-muted font-size-13">Periodic Due Date</span>
                                                                            </Media>
                                                                        </Media>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                        <Card>
                                                            <CardBody className="p-0">
                                                                <h6 className="card-title border-bottom p-3 mb-0 header-title">Payment Overview</h6>

                                                                <Row>
                                                                    <Col lg={4}>
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
                                                                        series={[
                                                                            installmentPlot.PaidAmount, 
                                                                            installmentPlot.ShortAmount, 
                                                                            installmentPlot.RemainingAmount - installmentPlot.ShortAmount ]}
                                                                        type="donut"
                                                                        className="apex-charts" />
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <h6 className="mt-2 mb-4 font-weight-bold">INSTALLMENT INFORMATION</h6>

                                                                        <Row className="py-1">
                                                                            <Col xl={4} sm={5}>
                                                                                <h4 className="mt-0 mb-0">{`Rs. ${installmentPlot.MonthlyInstallment.toLocaleString()} / Month`}</h4>
                                                                                <span className="text-muted font-size-13">Monthly Installment</span>
                                                                            </Col>
                                                                            <Col xl={4} sm={5}>
                                                                                <h4 className="mt-0 mb-0">{`Rs. ${installmentPlot.PeriodicInstallment.toLocaleString()} / ${installmentPlot.Period} Month(s)`}</h4>
                                                                                <span className="text-muted font-size-13">Periodic Installment</span>
                                                                            </Col>
                                                                        </Row>

                                                                        <hr />
                                                                        
                                                                        <h6 className="mt-2 mb-4 font-weight-bold">PAYMENT DETAILS</h6>

                                                                        <Row className="py-1">
                                                                            <Col xl={3} sm={6}>
                                                                                <h4 className="mt-0 mb-0 text-info">{`Rs. ${installmentPlot.TotalAmount.toLocaleString()}`}</h4>
                                                                                <span className="text-muted font-size-13">Total</span>
                                                                            </Col>
                                                                            <Col xl={3} sm={6}>
                                                                                <h4 className="mt-0 mb-0 text-success">{`Rs. ${installmentPlot.PaidAmount.toLocaleString()}`}</h4>
                                                                                <span className="text-muted font-size-13">Paid</span>
                                                                            </Col>
                                                                            <Col xl={3} sm={6}>
                                                                                <h4 className="mt-0 mb-0 text-danger">{`Rs. ${installmentPlot.ShortAmount.toLocaleString()}`}</h4>
                                                                                <span className="text-muted font-size-13">Short</span>
                                                                            </Col>
                                                                            <Col xl={3} sm={6}>
                                                                                <h4 className="mt-0 mb-0 text-warning">{`Rs. ${installmentPlot.RemainingAmount.toLocaleString()}`}</h4>
                                                                                <span className="text-muted font-size-13">Remaining (Short Inclusive)</span>
                                                                            </Col>
                                                                        </Row>

                                                                        <hr />

                                                                        <h6 className="mt-2 mb-4 font-weight-bold">{`PLOT RECOVERY PERCENTAGE: ${installmentPlot.RecoveryPercentage.toFixed(2)}%`}</h6>

                                                                        <Row className="py-1">
                                                                            <Col>
                                                                                <Progress value={installmentPlot.RecoveryPercentage} color={recoveryColor} className="progress-lg mb-2" />
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                        <Card>
                                                            <CardBody className="p-0">
                                                                <h6 className="card-title border-bottom p-3 mb-0 header-title">Installment Activity
                                                                    <span className="badge badge-info ml-2">{installmentPlot.Installments.length.toLocaleString()}</span></h6>

                                                                <div className="left-timeline mt-2 pl-4">
                                                                    <ul className="list-unstyled events">
                                                                        {installmentPlot.Installments.map((installment, index) => {
                                                                            
                                                                            return <li key={index} className="event-list">
                                                                                <div>
                                                                                    <InstallmentEvent installment={installment} />
                                                                                </div>
                                                                            </li>;
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </ModalBody>
                                            
                                            <ModalFooter>
                                                <Button color="secondary" className="ml-1" onClick={() => toggleModal(index)}>Cancel</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </CardBody>

                                    <CardBody className="border-top">
                                        <Row className="align-items-center">
                                            <Col className="col-sm-auto">Recovery</Col>
                                            <Col className="offset-sm-1">
                                                <Progress value={installmentPlot.RecoveryPercentage} id={`progress-installment-plot-recovery-${installmentPlot.RowNumber}`} 
                                                    color={recoveryColor} className="progress-sm" />

                                                <UncontrolledTooltip
                                                    placement="bottom"
                                                    id={`tooltip-installment-plot-recovery-${installmentPlot.RowNumber}`}
                                                    target={`progress-installment-plot-recovery-${installmentPlot.RowNumber}`} >{`${installmentPlot.RecoveryPercentage.toFixed(2)}%`}</UncontrolledTooltip>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row> :
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
                            <h3 className="mt-3">No installment plots found.</h3>
                        </Col>
                    </Row>
                </Container>}
        </React.Fragment>
    );
};

class CustomerDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DisableSelect: false,
            IsCustomerSearched: false,
            IsCustomerFound: false,
            MembershipNumbers: [],
            MembershipNumber: "",
            Customer: {},
            CashPlots: [],
            InstallmentPlots: [],
            ShowModals: [],
            activeTab: "1"
        };

        this.toggleTab = this.toggleTab.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.searchCustomer = this.searchCustomer.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleModal = (index) => {
        let { ShowModals } = this.state;

        ShowModals[index] = !ShowModals[index];

        this.setState({
            ShowModals: ShowModals
        });
    };

    searchCustomer = async () => {
        const { MembershipNumber } = this.state;

        this.setState({
            IsCustomerSearched: false,
            IsCustomerFound: false,
        });

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/khyberCity/customer`,
                {
                    params: {
                        MembershipNumber: MembershipNumber
                    },
                });

            this.setState({
                IsCustomerSearched: true,
            });

            if (response.data.Message === "Data found.") {
                this.setState({
                    IsCustomerFound: true,
                    Customer: response.data.Customer,
                    CashPlots: response.data.CashPlots,
                    InstallmentPlots: response.data.InstallmentPlots,
                    ShowModals: Array.from(
                        { length: response.data.InstallmentPlots.length }, () => false)
                });
            }
          } catch (error) {
            this.setState({
                IsCustomerSearched: true,
            });
          }
    };

    async componentDidMount() {
        this.setState({
            DisableSelect: true
        });

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/khyberCity/membershipNumbers`);

            if (response.data.Message === "Data found.") {
                const membershipNumbers = response.data.MembershipNumbers;

                this.setState({
                    DisableSelect: false,
                    MembershipNumbers: membershipNumbers,
                    MembershipNumber: membershipNumbers.length > 0 ? 
                        membershipNumbers[0] : ""
                });
            }
          } catch (error) {
            this.setState({
                DisableSelect: true,
                MembershipNumbers: [],
            });
        }

        this.searchCustomer("");
    }

    render() {
        const {
            DisableSelect,
            IsCustomerSearched,
            IsCustomerFound,
            MembershipNumbers,
            Customer,
            CashPlots,
            InstallmentPlots,
            ShowModals
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
                                        MembershipNumber: selectedOption.value
                                    });
                                }}
                                options={MembershipNumbers.map((item, index) => {
                                    return {
                                        value: item,
                                        label: item,
                                    };
                                })}></Select>
                    </FormGroup>
                    <Button className="btn-rounded" color="primary" onClick={this.searchCustomer} disabled={!IsCustomerSearched}>
                        <span className="fas fa-search" />
                    </Button>
                </Form>
            </CardBody>
        </Card>

        {IsCustomerFound ? 
            <React.Fragment>
                <Row>
                    <Col lg={4}>
                        <CustomerBox 
                            customer={Customer} />
                    </Col>

                    <Col lg={8}>
                        <Card>
                            <CardBody>
                                <Nav className="nav nav-pills navtab-bg nav-justified">
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === "1" })}
                                            onClick={() => { this.toggleTab("1"); }}>Installment Plots
                                            {InstallmentPlots.length > 0 && <span className="badge badge-info ml-2">{InstallmentPlots.length}</span>}</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === "2" })}
                                            onClick={() => { this.toggleTab("2"); }}>Cash Plots
                                            {CashPlots.length > 0 && <span className="badge badge-info ml-2">{CashPlots.length}</span>}</NavLink>
                                    </NavItem>
                                </Nav>
                                
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <InstallmentPlotsGrid 
                                            installmentPlots={InstallmentPlots}
                                            showModals={ShowModals}
                                            toggleModal={this.toggleModal} />
                                    </TabPane>

                                    <TabPane tabId="2">
                                        <CashPlotsGrid cashPlots={CashPlots} />
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment> :
            <CustomerSearch
                isCustomerSearched={IsCustomerSearched}
                onRetry={this.searchCustomer} />}

    </React.Fragment>
    }
};

export default CustomerDetails;