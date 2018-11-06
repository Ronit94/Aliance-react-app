import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/authService";
class PrivateRoute extends Component {
  state = { isLogged: false };
  constructor() {
    super();
    this.auth = new AuthService();
  }
  render() {
    if (!this.auth.loggedIn()) {
      console.log('enter')
      return <Redirect to="/admin/login" />;
    } else {
      console.log('else')
      return <Redirect to="/admin/dashboard" />;
    }
  }
}

export default PrivateRoute;
