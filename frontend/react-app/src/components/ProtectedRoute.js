//import React, { Component } from 'react';
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

export const ProtectedRoute = ({ component: Component,auth:auth,checkChange:checkChange, ...rest }) => {
    return (
        <Route 
            {...rest} 
            render = {(props) => {
                checkChange()
                if (auth()) {
                    return <Component {...props} />
                } else {
                    return (
                        <Redirect to={{pathname: "/login", state: { from: props.location}}} />
                    );
                }
            }}
        />
    );
};
