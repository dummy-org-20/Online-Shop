//import React, { Component } from 'react';
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest} 
            render = {(props) => {
                if (Auth.authenticated) {
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
