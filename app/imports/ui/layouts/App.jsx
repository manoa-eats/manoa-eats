import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Landing from '../pages/Landing';
import ListContacts from '../pages/ListContacts';
import ListContactsAdmin from '../pages/ListContactsAdmin';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import EditContact from '../pages/EditContact';
import AllRestaurants from '../pages/AllRestaurants';
import ImFeelingHungry from '../pages/ImFeelingHungry';
import VendorVerification from '../pages/VendorVerification';
import Review from '../pages/Review';
import VendorProfile from '../pages/VendorProfile';
import UserProfile from '../pages/UserProfile';
import EditProfile from '../pages/EditUserProfile';
import EditRestaurant from '../pages/EditRestaurant';
import CreateMenu from '../pages/CreateMenu';
import EditVendorProfile from '../pages/EditVendorProfile';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <ProtectedRoute path="/list" component={ListContacts}/>
            <Route path="/all-restaurants" component={AllRestaurants}/>
            <Route path="/im-feeling-hungry" component={ImFeelingHungry}/>
            <ProtectedRoute path="/vendor-review" component={VendorVerification}/>
            <ProtectedRoute path="/user-profile" component={UserProfile}/>
            <ProtectedRoute path="/edit-profile/:owner" component={EditProfile}/>
            <ProtectedRoute path="/vendor-profile" component={VendorProfile}/>
            <ProtectedRoute path="/edit-vendor-profile/:owner" component={EditVendorProfile}/>
            <ProtectedRoute path="/review" component={Review}/>
            <ProtectedRoute path="/edit/:_id" component={EditContact}/>
            <ProtectedRoute path="/editRestaurant/:_id" component={EditRestaurant}/>
            <AdminProtectedRoute path="/admin" component={ListContactsAdmin}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
