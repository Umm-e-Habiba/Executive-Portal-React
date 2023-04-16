import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import * as FeatherIcon from "react-feather";

import { isUserAuthenticated, getLoggedInUser } from "../helpers/authUtils";

// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const ForgetPassword = React.lazy(() => import("../pages/auth/ForgetPassword"));

// Khyber City
const KhyberCitySales = React.lazy(() => import("../pages/khyberCity/Sales/Sales"));
const KhyberCityExpenses = React.lazy(() => import("../pages/khyberCity/Expenses/Expenses"));
const KhyberCityPlots = React.lazy(() => import("../pages/khyberCity/Plots/Plots"));
const KhyberCityCustomers = React.lazy(() => import("../pages/khyberCity/Customers/Customers"));
const KhyberCityTransferRequests = React.lazy(() => import("../pages/khyberCity/TransferRequests/TransferRequests"));
const KhyberCityDealers = React.lazy(() => import("../pages/khyberCity/Dealers/Dealers"));
const KhyberCityEmployees = React.lazy(() => import("../pages/khyberCity/Employees/Employees"));
const KhyberCityAttendance = React.lazy(() => import("../pages/khyberCity/Attendance/Attendance"));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: "/account/login", state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: "/" }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: "/",
    exact: true,
    component: () => <Redirect to="/khyberCity/sales" />,
    route: PrivateRoute,
};

// Khyber City
const khyberCitySalesRoutes = {
    path: "/khyberCity/sales",
    name: "Sales",
    header: "Khyber City",
    icon: FeatherIcon.BarChart,
    component: KhyberCitySales,
    route: PrivateRoute,
    roles: ["Admin"],
};

const khyberCityExpensesRoutes = {
    path: "/khyberCity/expenses",
    name: "Expenses",
    icon: FeatherIcon.DollarSign,
    component: KhyberCityExpenses,
    route: PrivateRoute,
    roles: ["Admin"],
};

const khyberCityPlotsRoutes = {
    path: "/khyberCity/plots",
    name: "Plots",
    icon: FeatherIcon.Grid,
    component: KhyberCityPlots,
    route: PrivateRoute,
    roles: ["Admin"],
};

const khyberCityCustomersRoutes = {
    path: "/khyberCity/customers",
    name: "Customers",
    icon: FeatherIcon.Users,
    component: KhyberCityCustomers,
    route: PrivateRoute,
    roles: ["Admin"],
};

const khyberCityTransferRequestsRoutes = {
    path: "/khyberCity/transferRequests",
    name: "Transfer Requests",
    icon: FeatherIcon.RefreshCw,
    component: KhyberCityTransferRequests,
    route: PrivateRoute,
    roles: ["Admin"],
};

const khyberCityDealersRoutes = {
    path: "/khyberCity/dealers",
    name: "Dealers",
    icon: FeatherIcon.Briefcase,
    component: KhyberCityDealers,
    route: PrivateRoute,
    roles: ["Admin"],
};

const khyberCityEmployeesRoutes = {
    path: "/khyberCity/employees",
    name: "Employees",
    icon: FeatherIcon.User,
    component: KhyberCityEmployees,
    route: PrivateRoute,
    roles: ["Admin"],
};

const khyberCityAttendanceRoutes = {
    path: "/khyberCity/attendance",
    name: "Attendance",
    icon: FeatherIcon.Calendar,
    component: KhyberCityAttendance,
    route: PrivateRoute,
    roles: ["Admin"],
};

const khyberCityRoutes = [
    khyberCitySalesRoutes, 
    khyberCityExpensesRoutes, 
    khyberCityPlotsRoutes, 
    khyberCityCustomersRoutes, 
    khyberCityTransferRequestsRoutes,
    khyberCityDealersRoutes,
    khyberCityEmployeesRoutes,
    khyberCityAttendanceRoutes,
 ];

// auth
const authRoutes = {
    path: "/account",
    name: "Auth",
    children: [
        {
            path: "/account/login",
            name: "Login",
            component: Login,
            route: Route,
        },
        {
            path: "/account/logout",
            name: "Logout",
            component: Logout,
            route: Route,
        },
        {
            path: "/account/forget-password",
            name: "Forget Password",
            component: ForgetPassword,
            route: Route,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== "undefined") {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    ...khyberCityRoutes, 
    authRoutes,
];

const authProtectedRoutes = [ ...khyberCityRoutes ];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
