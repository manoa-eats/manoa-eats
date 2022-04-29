import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { UserProfile } from '../../api/userprofile/UserProfile';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {

  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#2F4C39' };
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
    const spacing = { marginLeft: '5px' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image src='/images/manoa-eats-logo2.png' size="small"/>
        </Menu.Item>
        <Menu.Item id='navbar-all-restaurants' as={NavLink} activeClassName="active" exact to="/all-restaurants" key="all-restaurants">All
                    Restaurants <Icon name='food' size="large"/></Menu.Item>
        <Menu.Item id='navbar-feeling-lucky' as={NavLink} activeClassName="active" exact to="/im-feeling-hungry" key="hungry">I`m Feeling
                    Hungry <Icon name='random' size="large"/></Menu.Item>

        {this.props.currentUser && !checkDatabase(UserProfile) && !username() ? (
          [
            <Menu.Item as={NavLink} activeClassName="active" exact to="/user-profile"
              key="profile">Create Profile <Icon style={spacing} name="add user" size="large"/></Menu.Item>,
          ]
        ) : ''}
        {this.props.currentUser && checkDatabase(UserProfile) && !username() ? (
          [
            <Menu.Item id='navbar-edit-profile' as={NavLink} activeClassName="active" exact to={`/edit-profile/${this.props.currentUser}`}
              key="edit">Edit Profile<Icon style={spacing} name="edit" size="large"/></Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item id='navbar-vendor-verification' as={NavLink} activeClassName="active" exact to="/vendor-review" key="admin">Vendor
                        Verification <Icon style={spacing} name='check square outline' size="large"/></Menu.Item>
        ) : ''}

        {(username() && !checkDatabase(VendorProfile)) ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/vendor-profile" key="vendor">Vendor
            Profile
          <Icon.Group style={spacing} size='large'>
            <Icon name='home' />
            <Icon corner color="black" name='add' />
          </Icon.Group></Menu.Item>
        ) : ''}
        {username() && checkDatabase(VendorProfile) ? (
          [
            <Menu.Item as={NavLink} activeClassName="active" exact to={`/edit-vendor-profile/${this.props.currentUser}`}
              key="edit-vendor">Edit Vendor Profile
              <Icon style={spacing} name="edit" size="large"/>
            </Menu.Item>,
          ]
        ) : ''}
        {(username()) ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/create-menu-item" key="menu">Create Menu
            <Icon.Group style={spacing} size='large'>
              <Icon name='food' />
              <Icon corner color="black" name='add' />
            </Icon.Group>
          </Menu.Item>
        ) : ''}
        {(username()) ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to={`/view-menu/${this.props.currentUser}`} key="view-menu">View Menu
            <Icon style={spacing} name="eye" size="large"/>
          </Menu.Item>
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
  const VendorProfileSubscription = Meteor.subscribe('VendorProfile');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: UserProfileSubscription.ready() && VendorProfileSubscription.ready(),
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
