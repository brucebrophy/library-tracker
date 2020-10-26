import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Books from '../pages/Books';

const Routes = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={ userData ? Books : Login} />
          <Route path="/register" component={ Register } />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;