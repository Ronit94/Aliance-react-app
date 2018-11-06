import React, { Component } from "react";
import AuthService from "../../../services/authService";
import LoginForm from './loginFormComponent'
import { Form } from 'antd'
import icon from '../../../static/image/icon.svg'
class LoginComponent extends Component {
  state = {
    email: "",
    password: ""
  };
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }
  render() {
    const MyHorizontalLoginForm = Form.create()(LoginForm);
    return (
      <React.Fragment>
        <div className="App">
          <img src={icon} alt={"icon"} id="icon" />
          <MyHorizontalLoginForm />
        </div>
      </React.Fragment>
    );
  }
}


export default LoginComponent;
