import React, { useState } from "react";
import Chart from "react-apexcharts";
import classNames from "classnames";

import { 
    Row, Col, Card, CardBody, 
    Button, Media, Modal, ModalHeader, 
    ModalBody, ModalFooter, Spinner, Progress, 
    UncontrolledTooltip, 
    Container,
    Form, FormGroup, Input, } from "reactstrap";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import axios from "axios";

import PageTitle from "../../../components/PageTitle";
import Preloader from "../../../components/Preloader";

import NoDataSVG from "../../../assets/images/no-data.svg";
import EmployeeMaleSVG from "../../../assets/images/employee-male.svg";
import EmployeeFemaleSVG from "../../../assets/images/employee-female.svg";

const AttendanceCalendar = (props) => {
    const { staffMember } = props;

    const events = staffMember.Attendance.map(attendanceRecord => {
        let checkTime = new Date(attendanceRecord.CheckTime);
        checkTime.setMinutes(checkTime.getMinutes() + checkTime.getTimezoneOffset());

        return {
            id: attendanceRecord.ID,
            title: attendanceRecord.IsCheckIn ? "Check-In" : "Check-Out",
            start: checkTime,
            className: `bg-${attendanceRecord.IsCheckIn ? "success" : "warning" } text-white font-size-10`,
        };
    });

    const haveAttendance = staffMember.Attendance.length > 0 ? true : false;

    let checkTime = null; 
    let latestAttendance = null;

    if (haveAttendance) {
        checkTime = new Date(staffMember.Attendance[0].CheckTime);
        checkTime.setMinutes(checkTime.getMinutes() + checkTime.getTimezoneOffset());
    
        latestAttendance = {
            Date: checkTime.toLocaleString("en-US", {
                day: "numeric", 
                year: "numeric",
                month: "long",
            }),
            Time: checkTime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
            }),
            IsCheckIn: staffMember.Attendance[0].IsCheckIn, 
        };
    }

    return (
        <Card>
            <CardBody>
                <Row className="border-botton">
                    <Col lg={2} className="text-center">
                    <img src={staffMember.Gender === "M" ? EmployeeMaleSVG : EmployeeFemaleSVG} alt="Employee"
                        className="avatar-xl rounded-circle" />
                    </Col>
                    <Col lg={10}>
                    <h5 className="mb-0">{staffMember.Name}</h5>
                    <h6 className="text-muted font-weight-normal mb-0">{staffMember.Title}</h6>

                    {haveAttendance ? 
                        latestAttendance.IsCheckIn ?
                        <h6 className="text-muted font-weight-normal mt-2">
                            <span className={`badge badge-sm badge-soft-success py-1`}>
                            <span className={`fas fa-clock mr-1`} />{`Checked in on ${latestAttendance.Date} at ${latestAttendance.Time}.`}</span>
                        </h6> : <h6 className="text-muted font-weight-normal mt-2">
                            <span className={`badge badge-sm badge-soft-info py-1`}>
                            <span className={`fas fa-clock mr-1`} />{`Checked out on ${latestAttendance.Date} at ${latestAttendance.Time}.`}</span>
                        </h6> :
                        <h6 className="text-muted font-weight-normal mt-2">
                            <span className={`badge badge-sm badge-soft-danger py-1`}>
                            <span className={`fas fa-clock mr-1`} />{"No check-in | check-out record found."}</span>
                    </h6>}
                    </Col>
                </Row>
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                    themeSystem='bootstrap'
                    handleWindowResize={true}
                    bootstrapFontAwesome={false}
                    buttonText={{today: 'Today', month: 'Month', week: 'Week', day: 'Day', list: 'List', prev: 'Prev', next: 'Next' }}
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                    }}
                    droppable={false}
                    editable={false}
                    eventLimit={false} // allow "more" link when too many events
                    selectable={false}
                    events={events}
                    id="calendar"
                />
            </CardBody>
        </Card>
    );
};

class Attendance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsDataFetched: false,
            IsDataFound: false,
            Staff: [],
            StaffNames: [],
            SelectedIndex: -1,
            SelectedMember: null,
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/khyberCity/staffAttendance`);

            this.setState({
                IsDataFetched: true,
            });

            if (response.data.Message === "Data found.") {
                const staff = response.data.Staff;

                this.setState({
                    IsDataFound: true,
                    Staff: staff,
                    StaffNames: staff.map(item => item.Name),
                    SelectedIndex: staff.length > 0 ? 0 : -1,
                    SelectedMember: staff.length > 0 ? staff[0] : null
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
            StaffNames,
            SelectedIndex,
            SelectedMember,
        } = this.state;

        return IsDataFound? 
        <React.Fragment>
        <Row className="page-title">
            <Col md={12}>
                <PageTitle
                    breadCrumbItems={[
                        { label: "Khyber City", path: "/khyberCity/sales" },
                        { label: "Attendance", path: "/khyberCity/attendance", active: true },
                    ]}
                    title={"Attendance"}
                />
            </Col>
        </Row>

        {StaffNames.length > 0 ?
            <React.Fragment>
                <Card>
                    <CardBody>
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input type="select" name="StaffNames"
                                    value={SelectedIndex}
                                    onChange={event => {
                                        const { 
                                            Staff
                                         } = this.state;

                                        this.setState({
                                            SelectedIndex: event.target.value,
                                            SelectedMember: Staff[event.target.value]
                                        });
                                    }}>
                                    {StaffNames.map((staffName, index) => {
                                        return <option key={index} value={index}>{staffName}</option>;
                                    })}
                                </Input>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>

                <AttendanceCalendar 
                    staffMember={SelectedMember} />
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
                        <h3 className="mt-3">No attendance records found.</h3>
                    </Col>
                </Row>
            </Container>}
    </React.Fragment> : 
    <Preloader 
        isDataFetched={IsDataFetched}
        retryLink={"/khyberCity/attendance"} />;
    }
};

export default Attendance;