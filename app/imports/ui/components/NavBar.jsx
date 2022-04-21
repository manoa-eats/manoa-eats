import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { UserProfile } from '../../api/userprofile/UserProfile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {

  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#C1E1B0' };
    const username = () => {
      if (Meteor.user() == null) {
        return false;
      }
      if (Meteor.user({ fields: { 'profile.role': 1 } }).profile) {
        return Meteor.user({ fields: { 'profile.role': 1 } }).profile.role === 'vendor';
      }
      return Meteor.user({ fields: { 'profile.role': 1 } }).role === 'vendor';
    };
    // Used to check that an owner has a database.
    const checkDatabase = (Database) => (Database.find({ owner: `${this.props.currentUser}` }).fetch()[0]);
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as="h1">Manoa Eats <Image
            src="https://banner2.cleanpng.com/20180617/fh/kisspng-hibiscus-red-clip-art-menu-psd-5b26fecf77e7a0.4064945415292822554911.jpg"
            size="large"/></Header>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/all-restaurants" key="all-restaurants">All
                    Restaurants</Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/im-feeling-hungry" key="hungry">I`m Feeling
                    Hungry</Menu.Item>
        {this.props.currentUser && !checkDatabase(UserProfile) && !username() ? (
          [
            <Menu.Item as={NavLink} activeClassName="active" exact to="/review" key="review">Write a
                            Review</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/user-profile"
              key="profile">Create Profile</Menu.Item>,
          ]
        ) : ''}
        {this.props.currentUser && checkDatabase(UserProfile) && !username() ? (
          [
            <Menu.Item as={NavLink} activeClassName="active" exact to={`/edit-profile/${this.props.currentUser}`}
              key="edit">Edit Profile</Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/vendor-review" key="admin">Vendor
                        Verification</Menu.Item>
        ) : ''}
        {(username()) ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/vendor-profile" key="vendor">Vendor
                        Profile</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact
                  to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink}
                  exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right"
              icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact
                  to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  const UserProfileSubscription = Meteor.subscribe('UserProfile');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: UserProfileSubscription.ready(),
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
