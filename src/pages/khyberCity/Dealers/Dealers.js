import React from "react";
import classNames from "classnames";

import { 
    Row, Col, Card, CardBody, 
    Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";

import PageTitle from "../../../components/PageTitle";
import DealersOverview from "./DealersOverview";
import DealerDetails from "./DealerDetails";

class Dealers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "1"
        };

        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return <React.Fragment>
        <Row className="page-title">
            <Col md={12}>
                <PageTitle
                    breadCrumbItems={[
                        { label: "Khyber City", path: "/khyberCity/sales" },
                        { label: "Dealers", path: "/khyberCity/dealers", active: true },
                    ]}
                    title={"Dealers"}
                />
            </Col>
        </Row>

        <Card>
            <CardBody>
                <Nav className="nav nav-pills navtab-bg nav-justified">
                    <NavItem>
                        <NavLink
                            href="#"
                            className={classNames({ active: this.state.activeTab === "1" })}
                            onClick={() => { this.toggleTab("1"); }}>Dealers Overview</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            href="#"
                            className={classNames({ active: this.state.activeTab === "2" })}
                            onClick={() => { this.toggleTab("2"); }}>Dealer Details</NavLink>
                    </NavItem>
                </Nav>
            </CardBody>
        </Card>

        <TabContent className="pt-0" activeTab={this.state.activeTab}>
            <TabPane tabId="1">
                <DealersOverview />
            </TabPane>

            <TabPane tabId="2">
                <DealerDetails />
            </TabPane>
        </TabContent>
    </React.Fragment>
    }
};

export default Dealers;