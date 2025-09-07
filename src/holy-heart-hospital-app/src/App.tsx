import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Tests from './pages/Tests';
import OPD from './pages/OPD';
import Dashboard from './pages/Dashboard';
import DoctorProfile from './pages/DoctorProfile';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tests" component={Tests} />
        <Route path="/opd" component={OPD} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/doctor/:id" component={DoctorProfile} />
      </Switch>
    </Router>
  );
};

export default App;