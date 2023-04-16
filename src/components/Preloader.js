import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Spinner, Button } from "reactstrap";

import FetchFailedSVG from "../assets/images/fetch-failed.svg";
import SearchingSVG from "../assets/images/searching.svg";

const colors = ['primary', 'primary', 'primary' ];

class Preloader extends Component {
    constructor (props){
        super(props);
    }

    componentDidMount() {
        document.body.classList.add("authentication-bg");
    }

    componentWillUnmount() {
        document.body.classList.remove("authentication-bg");
    }

    render() {
        const {
            isDataFetched,
            retryLink,
        } = this.props;

        return (
            <React.Fragment>
                <div className="my-5">
                    <Container>
                        {isDataFetched ? 
                            <div>
                                <Row className="justify-content-center">
                                    <Col xl={4} lg={5}>
                                        <div className="text-center">
                                            <div>
                                                <img src={FetchFailedSVG} alt="" className="img-fluid" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <h3 className="mt-3">Oops! Something went wrong.</h3>
                                        <p className="text-muted mb-2">Failed to fetch data from the server.<br /> Please try again!</p>
                                        <Button className="btn btn-lg btn-primary mt-4"
                                            onClick={() => {
                                                window.location.reload();
                                            }}>Retry</Button>
                                    </Col>
                                </Row>
                            </div> : 
                            <div>
                                <Row className="justify-content-center">
                                    <Col xl={4} lg={5}>
                                        <div className="text-center">
                                            <div>
                                                <img src={SearchingSVG} alt="" className="img-fluid" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <h3 className="mt-3">Loading</h3>
                                        
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
            </React.Fragment>
        )
    }
}

export default Preloader;