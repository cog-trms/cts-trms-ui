import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from '../components/layout/LandingPage';
import Login from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Dashboard from '../components/layout/Dashboard';
import Business from '../components/business/Business';
import Account from '../components/account/Account';
import Program from '../components/program/Program';
import Team from '../components/team/Team';
import User from '../components/user/User';
import Alert from '../components/layout/Alert';
// import ServiceOrder from '../components/so/SerivceOrder';
import ServiceOrderById from '../components/so/SerivceOrderById';

const AppRouter = () => (
  <BrowserRouter>
    <Alert />
    <Route path='/signin' component={Login} />
    <Route path='/signup' component={SignUp} />
    <LandingPage>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/business' component={Business} />
        <Route path='/account' component={Account} />
        <Route path='/program' component={Program} />
        <Route path='/team' component={Team} />
        <Route path='/user' component={User} />
        {/* <Route path='/serviceorder' component={ServiceOrder} /> */}
        {/* <Route path='/serviceorder/:id' component={ServiceOrderById} /> */}
      </Switch>
    </LandingPage>
  </BrowserRouter>
);

export default AppRouter;
