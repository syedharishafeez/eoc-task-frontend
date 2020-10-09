import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { SnackbarProvider } from "notistack";
import SignIn from './SignIn';
import Register from './Register';
import EmployeeDetails from './EmployeeDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={EmployeeDetails}/>
      </Switch>
    </Router>
  );
}

function NotificationOverlay(props) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <App props={{ ...props }} />
    </SnackbarProvider>
  );
}

export default NotificationOverlay