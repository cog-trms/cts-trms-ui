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
import ServiceOrderCreate from '../components/so/ServiceOrderCreate';
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

const routes = [
  {
    activeIndex: 0,
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    icon: DashboardIcon,
    isMenu: true,
    access: ['admin']
  },
  {
    activeIndex: 1,
    path: '/business',
    name: 'Business',
    component: Business,
    icon: BusinessCenterIcon,
    isMenu: true,
    access: ['admin']
  },
  {
    activeIndex: 2,
    path: '/account',
    name: 'Account',
    component: Account,
    icon: AccountTreeIcon,
    isMenu: true,
    access: ['admin']
  },
  {
    activeIndex: 3,
    path: '/program',
    name: 'Program',
    component: Program,
    icon: GroupWorkIcon,
    isMenu: true,
    access: ['admin', 'hiring_manager']
  },
  {
    activeIndex: 4,
    path: '/team',
    name: 'Team',
    component: Team,
    icon: GroupIcon,
    isMenu: true,
    access: ['admin', 'hiring_manager']
  },
  {
    activeIndex: 5,
    path: '/user',
    name: 'User',
    component: User,
    icon: AccountBoxIcon,
    isMenu: true,
    access: ['admin']
  },
  {
    activeIndex: 6,
    path: '/serviceorder',
    name: 'Opportunities',
    component: ServiceOrder,
    icon: AccountTreeIcon,
    isMenu: true,
    access: ['hiring_manager']
  },
  {
    activeIndex: 7,
    path: '/serviceorder/:create?/:soId',
    name: 'Service Order Add',
    component: ServiceOrderCreate,
    icon: AccountTreeIcon,
    isMenu: false,
    access: ['hiring_manager']
  }
];

export default routes;
