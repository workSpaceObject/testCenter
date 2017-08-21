import React from 'react';
import { Router, Route } from 'dva/router';

import EventPage from './EventPage';
import MainPage from './MainPage';
import ExaminePage from './ExaminePage';
import LoginPage from './LoginPage';
import TestingPage from './TestingPage';
import TestOverPage from './TestOverPage';
import  SelectTestPage from './SelectTestPage';
import HelpEventPage from './HelpEventPage';
import EventWaitPage from './EventWaitPage';
import TestWaitPage from './TestWaitPage';
import LeaveWaitPage from './LeaveWaitPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route component={MainPage}>
        <Route path="/" component={LoginPage} />
        <Route path="/examin" component={ExaminePage} />
        <Route path="/select" component={SelectTestPage} />
        <Route path="/event" component={EventPage} />
        <Route path="/helpEvent" component={HelpEventPage} />
        <Route path="/eventWait" component={EventWaitPage} />
        <Route path="/leaveWait" component={LeaveWaitPage} />
      </Route>
      <Route path="/testing" component={TestingPage} />
      <Route path="/over" component={TestOverPage} />
      <Route path="/testWait" component={TestWaitPage} />
    </Router>
  );
}

export default RouterConfig;
