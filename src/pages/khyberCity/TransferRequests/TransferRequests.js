import React, { useState } from "react";
import Chart from 'react-apexcharts';
import classNames from "classnames";

import { 
    Row, Col, Card, CardBody, 
    Button, Media, Modal, ModalHeader, 
    ModalBody, ModalFooter, Spinner, Progress, 
    UncontrolledTooltip, 
    Container,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators } from "reactstrap";

import axios from "axios";

import PageTitle from '../../../components/PageTitle';
import Preloader from "../../../components/Preloader";

import NoDataSVG from "../../../assets/images/no-data.svg";
import TransferRequestsSVG from "../../../assets/images/transfer-requests.svg";
import DealerSVG from "../../../assets/images/dealer.svg";
import CustomerSVG from "../../../assets/images/customer.svg";
import GeometryJPG from "../../../assets/images/geometry.jpg";

const CarousalWithCaptions = (props) => {
    const { items } = props;

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}>
                <div className="text-center bg-secondary p-4">
                    <img className="img-fluid" 
                        style={{ width: "100%" }}
                        src={item.Source} alt={item.AltText} />
                </div>
            </CarouselItem>
        );
    });

    return (
        <Carousel
            style={{ width: "100%" }}
            activeIndex={activeIndex}
            next={next}
            cssModule={{ "width": "100%" }}
            previous={previous} >
            
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl className="text-secondary" direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl className="text-secondary" direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}

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

const RequestsGrid = (props) => {
    const { 
        requests,
        showModals,
        toggleModal,
        approveRequest } = props;

    return (
        <React.Fragment>
            <Row>
                {requests.map((request, index) => {
                    request.RecoveryPercentage = request.RecoveryPercentage ?? 100.00;
                    
                    const recoveryColor = request.RecoveryPercentage > 80 ? "success" : 
                        (request.RecoveryPercentage > 50 ? "info" :
                        (request.RecoveryPercentage > 30 ? "warning" : "danger"));

                    return (
                        <Col lg={6} xl={4} key={`cash-plot-${request.RowNumber}`}>
                            <Card className="border">
                                <CardBody>
                                    <h1 className="justify-content-center mb-2">
                                        <span className={classNames("fas",
                                        {
                                            "text-success": request.PlotType === "Commercial",
                                            "text-info": request.PlotType === "Non Commercial",
                                            "fa-hotel": request.PlotType === "Commercial",
                                            "fa-home": request.PlotType === "Non Commercial"
                                        })}></span>
                                    </h1>
                                    
                                    <div className={classNames("badge", "float-right",
                                        {
                                            "badge-success": !request.IsBlocked,
                                            "badge-danger": request.IsBlocked,
                                        })}>{request.IsBlocked ? "Blocked" : "Active"}</div>

                                    <p className={classNames("text-uppercase", "font-size-12", "mb-2",
                                        {
                                            "text-success": request.PlotType === "Commercial",
                                            "text-info": request.PlotType === "Non Commercial",
                                        })}>{request.PlotType === "Commercial" ? request.PlotType : "Residential"}</p>

                                    <hr />

                                    <h6 className="text-muted font-weight-normal mt-2 mb-0">
                                        <span className="badge badge-soft-success py-1">
                                            <span className="fas fa-fingerprint mr-2" />Fingerprint Scanned</span>
                                    </h6>

                                    <h4 className="mb-3 font-size-15">Request Overview</h4>

                                    <ul className="list mb-0">
                                        <li className="list-item pr-2">
                                            <p><strong>Booking Type: </strong>{request.BookingType === "By Installment" ? "Installment" : "Cash"}</p>
                                        </li>
                                        <li className="list-item pr-2">
                                            <p><strong>Plot Number: </strong>{request.PlotNumber}</p>
                                        </li>
                                        <li className="list-item pr-2">
                                            <p><strong>Transfer Date: </strong>{new Date(request.TransferDate).toLocaleString("default", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </li>
                                        <li className="list-item pr-2">
                                            <p><strong>Transfer Fee: </strong>
                                            <span className="font-size-16 font-weight-bold text-primary">{`Rs. ${request.TransferFee.toLocaleString()}`}</span>
                                            </p>
                                        </li>
                                    </ul>

                                    <div className="button-list">
                                        <Button color="outline-info" className="btn-block"
                                            onClick={() => toggleModal(index)}>View Details</Button>
                                        
                                        {request.IsApproving ? 
                                            <Button color="outline-success" className="btn-block" disabled>
                                                <span><Spinner color="success" size="sm" /></span>
                                                <span className="ml-2">Approving</span>
                                            </Button> : request.IsApproved ? 
                                                <Button color="success" className="btn-block" disabled>
                                                    <span className="fas fa-check mr-2"/>Approved</Button> :
                                                <Button color="outline-success" className="btn-block" 
                                                    onClick={() => {
                                                        approveRequest(request.TransferRequestID)
                                                    }}>Approve</Button>}
                                    </div>

                                    <Modal
                                        className="bg-light"
                                        isOpen={showModals[index]}
                                        toggle={() => toggleModal(index)}
                                        size="lg">
                                        
                                        <ModalHeader toggle={() => toggleModal(index)}>{`Plot Number: ${request.PlotNumber}`}</ModalHeader>

                                        <ModalBody>
                                            <Row>
                                                <Col>
                                                    <Card>
                                                        <CardBody className="p-0">
                                                            <h6 className="card-title border-bottom p-3 mb-0 header-title">Transfer Request Overview</h6>

                                                            <Row className="py-1">
                                                                <Col xl={4} sm={5}>
                                                                    <Media className="p-3">
                                                                        <h1 className="m-0 text-muted"><span className="fas fa-money-bill-wave align-self-center mr-4" /></h1>
                                                                        <Media body>
                                                                            <h4 className="mt-0 mb-0">{`Rs. ${request.TransferFee.toLocaleString()}`}</h4>
                                                                            <span className="text-muted font-size-13">Transfer Fee</span>
                                                                        </Media>
                                                                    </Media>
                                                                </Col>
                                                                <Col xl={4} sm={5}>
                                                                    <Media className="p-3">
                                                                        <h1 className="m-0 text-muted"><span className="fas fa-calendar align-self-center mr-4" /></h1>
                                                                        <Media body>
                                                                            <h4 className="mt-0 mb-0">{new Date(request.TransferDate).toLocaleString("default", { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                                                            <span className="text-muted font-size-13">Requested On</span>
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
                                                            <h6 className="card-title border-bottom p-3 mb-0 header-title">Customers Overview</h6>

                                                            <Row className="py-1">
                                                                <Col lg={6}>
                                                                    <Card className="profile-widget bg-light">
                                                                        <img src={request.CurrentCustomerPhoto} alt="Current Customer Webcam" className="card-img-top" />

                                                                        <CardBody className="text-center p-0">
                                                                            <div className="profile-info pb-3">
                                                                                <img src={CustomerSVG} alt="" className="img-thumbnail avatar-xl rounded-circle" />

                                                                                
                                                                                <h5><span className="badge badge-soft-warning mt-2 mb-0">Current Customer</span></h5>
                                                                                <h5 className="mt-2 mb-0">{request.CurrentCustomerMembershipNumber}</h5>
                                                                                <h6 className="text-muted font-weight-normal mt-2 mb-4">{request.CurrentCustomerName}</h6>

                                                                                <a href={`https://api.whatsapp.com/send?phone=${request.CurrentCustomerContactNumber}`}
                                                                                    rel="noopener noreferrer" target="_blank" className="btn btn-success btn-sm mr-1">
                                                                                    <span className="fab fa-whatsapp mr-2" />Message</a>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                </Col>

                                                                <Col lg={6}>
                                                                    <Card className="profile-widget bg-light">
                                                                        <img src={request.NewCustomerPhoto} alt="New Customer Webcam" className="card-img-top" />

                                                                        <CardBody className="text-center p-0">
                                                                            <div className="profile-info pb-3">
                                                                                <img src={CustomerSVG} alt="" className="img-thumbnail avatar-xl rounded-circle" />

                                                                                
                                                                                <h5><span className="badge badge-soft-success mt-2 mb-0">New Customer</span></h5>
                                                                                <h5 className="mt-2 mb-0">{request.NewCustomerMembershipNumber}</h5>
                                                                                <h6 className="text-muted font-weight-normal mt-2 mb-4">{request.NewCustomerName}</h6>

                                                                                <a href={`https://api.whatsapp.com/send?phone=${request.NewCustomerContactNumber}`}
                                                                                    rel="noopener noreferrer" target="_blank" className="btn btn-success btn-sm mr-1">
                                                                                    <span className="fab fa-whatsapp mr-2" />Message</a>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
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
                                                            <h6 className="card-title border-bottom p-3 mb-0 header-title">Dealers Overview</h6>

                                                            <Row className="py-1">
                                                                <Col lg={6}>
                                                                    <Card className="profile-widget bg-light">
                                                                        <img src={GeometryJPG} alt="Geometry" className="card-img-top" />

                                                                        <CardBody className="text-center p-0">
                                                                            <div className="profile-info pb-3">
                                                                                <img src={DealerSVG} alt="" className="img-thumbnail avatar-xl rounded-circle" />

                                                                                
                                                                                <h5><span className="badge badge-soft-warning mt-2 mb-0">Current Dealer</span></h5>
                                                                                <h5 className="mt-2 mb-0">{request.CurrentDealerID}</h5>
                                                                                <h6 className="text-muted font-weight-normal mt-2 mb-0">{request.CurrentDealerName}</h6>
                                                                                <h6 className="text-info font-weight-small mt-2 mb-4">{`Commission: Rs. ${request.DealerCommission.toLocaleString()}`}</h6>

                                                                                <a href={`https://api.whatsapp.com/send?phone=${request.CurrentDealerContactNumber}`}
                                                                                    rel="noopener noreferrer" target="_blank" className="btn btn-success btn-sm mr-1">
                                                                                    <span className="fab fa-whatsapp mr-2" />Message</a>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                </Col>

                                                                {request.CurrentDealerID !== request.NewDealerID &&
                                                                    <Col lg={6}>
                                                                        <Card className="profile-widget bg-light">
                                                                            <img src={GeometryJPG} alt="Geometry" className="card-img-top" />

                                                                            <CardBody className="text-center p-0">
                                                                                <div className="profile-info pb-3">
                                                                                    <img src={DealerSVG} alt="" className="img-thumbnail avatar-xl rounded-circle" />

                                                                                    
                                                                                    <h5><span className="badge badge-soft-success mt-2 mb-0">New Dealer</span></h5>
                                                                                    <h5 className="mt-2 mb-0">{request.NewDealerID}</h5>
                                                                                    <h6 className="text-muted font-weight-normal mt-2 mb-4">{request.NewDealerName}</h6>

                                                                                    <a href={`https://api.whatsapp.com/send?phone=${request.NewDealerContactNumber}`}
                                                                                        rel="noopener noreferrer" target="_blank" className="btn btn-success btn-sm mr-1">
                                                                                        <span className="fab fa-whatsapp mr-2" />Message</a>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>}
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Card>
                                                        <CardBody className="p-0">
                                                            <h6 className="card-title border-bottom p-3 mb-0 header-title">Scanned Documents</h6>

                                                            <Row className="py-1 text-center">
                                                                <CarousalWithCaptions
                                                                    items={request.Documents.map((document, index) => {
                                                                        return {
                                                                        Source: document.DocumentImage,
                                                                        AltText: `Document ${index + 1}`
                                                                    }})} />
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>

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
                                                                            <h4 className="mt-0 mb-0">{request.Size}</h4>
                                                                            <span className="text-muted font-size-13">Plot Size</span>
                                                                        </Media>
                                                                    </Media>
                                                                </Col>
                                                                <Col xl={4} sm={5}>
                                                                    <Media className="p-3">
                                                                        <h1 className="m-0 text-muted"><span className={`fas ${request.PlotType === "Commercial" ? "fa-hotel" : "fa-home"} align-self-center mr-4`} /></h1>
                                                                        <Media body>
                                                                            <h4 className="mt-0 mb-0">{request.PlotType === "Commercial" ? request.PlotType : "Residential"}</h4>
                                                                            <span className="text-muted font-size-13">Plot Type</span>
                                                                        </Media>
                                                                    </Media>
                                                                </Col>
                                                                <Col xl={4} sm={5}>
                                                                    <Media className="p-3">
                                                                        <h1 className="m-0 text-muted"><span className="fas fa-calendar-check align-self-center mr-4" /></h1>
                                                                        <Media body>
                                                                            <h4 className="mt-0 mb-0">{new Date(request.BookingDate).toLocaleString("default", { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                                                            <span className="text-muted font-size-13">Booking Date</span>
                                                                        </Media>
                                                                    </Media>
                                                                </Col>
                                                                {request.BookingType === "By Installment" &&
                                                                    <React.Fragment>
                                                                        <Col xl={4} sm={5}>
                                                                            <Media className="p-3">
                                                                                <h1 className="m-0 text-muted"><span className="fas fa-clock align-self-center mr-4" /></h1>
                                                                                <Media body>
                                                                                    <h4 className="mt-0 mb-0">{new Date(request.LastDatePaid).toLocaleString("default", { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                                                                    <span className="text-muted font-size-13">Latest Payment Activity</span>
                                                                                </Media>
                                                                            </Media>
                                                                        </Col>
                                                                        <Col xl={4} sm={5}>
                                                                            <Media className="p-3">
                                                                                <h1 className="m-0 text-muted"><span className="fas fa-calendar-alt align-self-center mr-4" /></h1>
                                                                                <Media body>
                                                                                    <h4 className={`mt-0 mb-0 ${ (new Date(request.DueDate).getTime() < new Date().getTime() && 
                                                                                        request.PaidAmount !== request.TotalAmount) && "text-danger" }`}>{new Date(request.DueDate).toLocaleString("default", { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                                                                    <span className="text-muted font-size-13">Monthly Due Date</span>
                                                                                </Media>
                                                                            </Media>
                                                                        </Col>
                                                                        <Col xl={4} sm={5}>
                                                                            <Media className="p-3">
                                                                                <h1 className="m-0 text-muted"><span className="fas fa-calendar-day align-self-center mr-4" /></h1>
                                                                                <Media body>
                                                                                    <h4 className={`mt-0 mb-0 ${ (new Date(request.DueDate).getTime() < new Date().getTime() && 
                                                                                        request.PaidAmount !== request.TotalAmount) && "text-danger" }`}>{new Date(request.PeriodicDueDate).toLocaleString("default", { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                                                                    <span className="text-muted font-size-13">Periodic Due Date</span>
                                                                                </Media>
                                                                            </Media>
                                                                        </Col>
                                                                    </React.Fragment>}
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

                                                            {request.BookingType === "By Installment" ?
                                                                <React.Fragment>
                                                                    <Row>
                                                                        <Col>
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
                                                                                    request.PaidAmount, 
                                                                                    request.ShortAmount, 
                                                                                    request.RemainingAmount - request.ShortAmount ]}
                                                                                type="donut"
                                                                                height={350}
                                                                                className="apex-charts" />
                                                                        </Col>
                                                                    </Row> 
                                                                    <Row>
                                                                        <Col>
                                                                            <h6 className="mt-2 mb-4 font-weight-bold">INSTALLMENT INFORMATION</h6>

                                                                            <Row className="py-1">
                                                                                <Col xl={4} sm={5}>
                                                                                    <h4 className="mt-0 mb-0">{`Rs. ${request.MonthlyInstallment.toLocaleString()} / Month`}</h4>
                                                                                    <span className="text-muted font-size-13">Monthly Installment</span>
                                                                                </Col>
                                                                                <Col xl={4} sm={5}>
                                                                                    <h4 className="mt-0 mb-0">{`Rs. ${request.PeriodicInstallment.toLocaleString()} / ${request.Period} Month(s)`}</h4>
                                                                                    <span className="text-muted font-size-13">Periodic Installment</span>
                                                                                </Col>
                                                                            </Row>

                                                                            <hr />
                                                                            
                                                                            <h6 className="mt-2 mb-4 font-weight-bold">PAYMENT DETAILS</h6>

                                                                            <Row className="py-1">
                                                                                <Col xl={3} sm={6}>
                                                                                    <h4 className="mt-0 mb-0 text-info">{`Rs. ${request.TotalAmount.toLocaleString()}`}</h4>
                                                                                    <span className="text-muted font-size-13">Total</span>
                                                                                </Col>
                                                                                <Col xl={3} sm={6}>
                                                                                    <h4 className="mt-0 mb-0 text-success">{`Rs. ${request.PaidAmount.toLocaleString()}`}</h4>
                                                                                    <span className="text-muted font-size-13">Paid</span>
                                                                                </Col>
                                                                                <Col xl={3} sm={6}>
                                                                                    <h4 className="mt-0 mb-0 text-danger">{`Rs. ${request.ShortAmount.toLocaleString()}`}</h4>
                                                                                    <span className="text-muted font-size-13">Short</span>
                                                                                </Col>
                                                                                <Col xl={3} sm={6}>
                                                                                    <h4 className="mt-0 mb-0 text-warning">{`Rs. ${request.RemainingAmount.toLocaleString()}`}</h4>
                                                                                    <span className="text-muted font-size-13">Remaining (Short Inclusive)</span>
                                                                                </Col>
                                                                            </Row>

                                                                            <hr />

                                                                            <h6 className="mt-2 mb-4 font-weight-bold">{`PLOT RECOVERY PERCENTAGE: ${request.RecoveryPercentage.toFixed(2)}%`}</h6>

                                                                            <Row className="py-1">
                                                                                <Col>
                                                                                    <Progress value={request.RecoveryPercentage} color={recoveryColor} className="progress-lg mb-2" />
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </React.Fragment> :
                                                                <React.Fragment>
                                                                    <Row>
                                                                        <Col>
                                                                            <Chart
                                                                                options={{
                                                                                    chart: {
                                                                                        type: "pie",
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
                                                                                series={[ request.PaidAmount, 0 ]}
                                                                                type="donut"
                                                                                height={350}
                                                                                className="apex-charts" />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col>                                                                        
                                                                            <h6 className="mt-2 mb-4 font-weight-bold">PAYMENT DETAILS</h6>

                                                                            <Row className="py-1">
                                                                                <Col xl={3} sm={6}>
                                                                                    <h4 className="mt-0 mb-0 text-info">{`Rs. ${request.TotalAmount.toLocaleString()}`}</h4>
                                                                                    <span className="text-muted font-size-13">Total</span>
                                                                                </Col>
                                                                                <Col xl={3} sm={6}>
                                                                                    <h4 className="mt-0 mb-0 text-success">{`Rs. ${request.PaidAmount.toLocaleString()}`}</h4>
                                                                                    <span className="text-muted font-size-13">Paid</span>
                                                                                </Col>
                                                                            </Row>

                                                                            <hr />

                                                                            <h6 className="mt-2 mb-4 font-weight-bold">{`PLOT RECOVERY PERCENTAGE: ${request.RecoveryPercentage.toFixed(2)}%`}</h6>

                                                                            <Row className="py-1">
                                                                                <Col>
                                                                                    <Progress value={request.RecoveryPercentage} color={recoveryColor} className="progress-lg mb-2" />
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </React.Fragment>}
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>

                                            {request.BookingType === "By Installment" &&
                                                <Row>
                                                    <Col>
                                                        <Card>
                                                            <CardBody className="p-0">
                                                                <h6 className="card-title border-bottom p-3 mb-0 header-title">Installment Activity
                                                                    <span className="badge badge-info ml-2">{request.Installments.length.toLocaleString()}</span></h6>

                                                                <div className="left-timeline mt-2 pl-4">
                                                                    <ul className="list-unstyled events">
                                                                        {request.Installments.map((installment, index) => {
                                                                            
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
                                                </Row>}
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
                                            <Progress value={request.RecoveryPercentage} id={`progress-request-recovery-${request.RowNumber}`} 
                                                color={recoveryColor} className="progress-sm" />

                                            <UncontrolledTooltip
                                                placement="bottom"
                                                id={`tooltip-request-recovery-${request.RowNumber}`}
                                                target={`progress-request-recovery-${request.RowNumber}`} >{`${request.RecoveryPercentage.toFixed(2)}%`}</UncontrolledTooltip>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </React.Fragment>
    );
};

class TransferRequests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsDataFetched: false,
            IsDataFound: false,
            Requests: [],
            ShowModals: [],
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.approveRequest = this.approveRequest.bind(this);
    }

    

    toggleModal = (index) => {
        let { ShowModals } = this.state;

        ShowModals[index] = !ShowModals[index];

        this.setState({
            ShowModals: ShowModals
        });
    };

    approveRequest = async (transferRequestID) => {
        let { Requests } = this.state;

        let index;

        for (let i = 0; i < Requests.length; ++i) {
            if (Requests[i].TransferRequestID === transferRequestID)
            {
                index = i;
                break;
            }
        }

        if (Requests[index].IsApproving || Requests[index].IsApproved) return;

        Requests[index].IsApproving = true;

        this.setState({
            Requests: Requests,
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/khyberCity/approveRequest`, {
                TransferRequestID: transferRequestID,
            });
    
            if (response.data.Message === "Request approved.") {
                Requests[index].IsApproving = false;
                Requests[index].IsApproved = true;
                
                this.setState({
                    Requests: Requests,
                });
            } else {
                Requests[index].IsApproving = false

                this.setState({
                    Requests: Requests,
                });
            }      
        } catch (error) {
            Requests[index].IsApproving = false

            this.setState({
                Requests: Requests,
            });
        }
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/khyberCity/transferRequests`);

            this.setState({
                IsDataFetched: true,
            });

            if (response.data.Message === "Data found.") {
                let { Requests } = response.data;

                for (let request of Requests) {
                    request.IsApproving = false;
                }

                this.setState({
                    IsDataFound: true,
                    Requests: Requests,
                    ShowModals: Array.from(
                        { length: Requests.length }, () => false),
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
            Requests,
            ShowModals,
        } = this.state;

        return IsDataFound? 
        <React.Fragment>
        <Row className="page-title">
            <Col md={12}>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Khyber City', path: '/khyberCity/sales' },
                        { label: 'Transfer Reqeusts', path: '/khyberCity/transferRequests', active: true },
                    ]}
                    title={"Transfer Requests"}
                />
            </Col>
        </Row>

        {Requests.length > 0 ?
            <React.Fragment>
                <Row className="align-items-center">
                    <Col>
                        <Card>
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col xl={2} lg={3}>
                                        <img src={TransferRequestsSVG} className="mr-4 align-self-center img-fluid" alt="Transfer Requests" />
                                    </Col>
                                    <Col xl={10} lg={9}>
                                        <div className="mt-4 mt-lg-0">
                                            <h5 className="mt-0 mb-1 font-weight-bold">Plot Transfer Requests</h5>
                                            <p className="text-muted mb-2">
                                                Following cards show requests for plot transfer that are approved by one of you KCEB IMS Users. Each of the request has been biometrically approved in the presence of both, the plot owner and the person to whom the plot is being transferred. All of associated scanned documents are also attached.
                                            </p>

                                            <p><strong>Total Requests:</strong><span className={`font-size-12 badge badge-success ml-2`}>{Requests.length}</span></p>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Card>
                    <CardBody>
                        <RequestsGrid 
                            requests={Requests}
                            showModals={ShowModals}
                            toggleModal={this.toggleModal}
                            approveRequest={this.approveRequest} />
                    </CardBody>
                </Card>
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
                        <h3 className="mt-3">No requests found.</h3>
                    </Col>
                </Row>
            </Container>}
    </React.Fragment> : 
    <Preloader 
        isDataFetched={IsDataFetched}
        retryLink={"/khyberCity/employees"} />;
    }
};

export default TransferRequests;