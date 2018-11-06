import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoginComponent from "./components/pages/loginComponent/loginComponent";
import RegistrationFormComponent from "./components/pages/RegistrationComponent/registerComponent";
import DashboardComponent from "./components/pages/DashboardComponent/dashboardComponent";
import PrivateRoute from "./components/middlewares/routeConfiguration";
import PageNotFound from "./components/pages/PageNotFound/pageNotFound";


const AuthGuardRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("authToken")
      ? <Component {...props} />
      : <Redirect to='/admin/login' />
  )} />
)

const NoAuthGuardRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !localStorage.getItem("authToken") ? <Component {...props} /> : <Redirect to='/admin/dashboard' />
  )} />
)




class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 2500); // simulates loading of data
  }
  render() {
    const { loading } = this.state;
    if (loading) { // if your component doesn't have to wait for async data, remove this block 
      return null; // render null when app is not ready
    }

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={PrivateRoute} />
          <NoAuthGuardRoute path="/admin/login" component={LoginComponent} />
          <NoAuthGuardRoute path="/admin/register" component={RegistrationFormComponent} />
          <AuthGuardRoute path="/admin/dashboard" component={DashboardComponent} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }

}



export default App;
