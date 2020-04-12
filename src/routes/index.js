import React from 'react';
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
import ServiceOrder from '../components/so/ServiceOrder';
import ServiceOrderById from '../components/so/SerivceOrderById';
import {
  AccountCircle,
  AccountTree as AccountTreeIcon,
  BarChart as BarChartIcon,
  BusinessCenter as BusinessCenterIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  Mail as MailIcon,
  MoveToInbox as InboxIcon,
  MoreVert as MoreIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  GroupWork as GroupWorkIcon,
  Group as GroupIcon,
  AccountBox as AccountBoxIcon
} from '@material-ui/icons';

const Routes = [
  {
    path: '/',
    sidebarName: 'Dashboard',
    component: Dashboard,
    icon: DashboardIcon
  },
  {
    path: '/business',
    sidebarName: 'Business',
    component: Business,
    icon: BusinessCenterIcon
  },
  {
    path: '/account',
    sidebarName: 'Account',
    component: Account,
    icon: AccountTreeIcon
  },
  {
    path: '/program',
    sidebarName: 'Program',
    component: Program,
    icon: GroupWorkIcon
  },
  {
    path: '/team',
    sidebarName: 'Team',
    component: Team,
    icon: GroupIcon
  },
  {
    path: '/user',
    sidebarName: 'User',
    component: User,
    icon: AccountBoxIcon
  },
  {
    path: '/serviceorder',
    sidebarName: 'Service Order',
    component: ServiceOrder,
    icon: AccountTreeIcon
  }
];

export default Routes;
