import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './../auth/auth-helper'

const PrivateRoute2 = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/admin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute2
