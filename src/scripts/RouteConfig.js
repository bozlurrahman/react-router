import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routes = [
    {
        path: "/sandwiches",
        component: Sandwiches
    },
    {
        path: "/tacos",
        component: Tacos,
        routes: [
            {
                path: "/tacos/bus",
                component: Bus,
                routes: [
                    {
                        path: "/tacos/bus/a",
                        component: BusA
                    },
                    {
                        path: "/tacos/bus/b",
                        component: BusB
                    }
                ]
            },
            {
                path: "/tacos/cart",
                component: Cart
            }
        ]
    }
];


function Sandwiches() {
    return <h2>Sandwiches</h2>;
}

function Cart() {
    return <h3>Cart</h3>;
}

function BusA() {    
    return <h3>Bus1</h3>;
}

function BusB() {
    return <h3>Bus2</h3>;
}

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={(props) => {
                // pass the sub-routes down to keep nesting
                return <route.component {...props} routes={route.routes} />
            }}
        />
    );
}

function Tacos({ routes }) {
    return (
        <div>
            <h2>Tacos</h2>
            <ul>
                <li><Link to="/tacos/bus">Bus</Link></li>
                <li><Link to="/tacos/cart">Cart</Link></li>
            </ul>

            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </div>
    );
}

function Bus({ routes }) {
    return (
        <div>
            <h3>Bus</h3>
            <ul>
                <li><Link to="/tacos/bus/a">BusA</Link></li>
                <li><Link to="/tacos/bus/b">BusB</Link></li>
            </ul>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </div>
    );
}

function RouteConfigExample() {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/tacos">Tacos</Link></li>
                    <li><Link to="/sandwiches">Sandwiches</Link></li>
                </ul>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </div>
        </Router>
    );
}

export default RouteConfigExample;
