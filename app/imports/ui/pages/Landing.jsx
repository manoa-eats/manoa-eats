import React from 'react';
import { Grid, Header, List, Loader, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile';
import { Restaurants } from '../../api/Restaurant/Restaurants';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const now = new Date().getHours();
    const openRestaurants = this.props.vendors.filter(x => x.openHour.getHours() <= now && now <= x.closeHour.getHours()).map((restaurant, i) => <List.Item
      key={i}>
      <Header as={'h3'}>{restaurant.name}</Header>
    </List.Item>);
    console.log(openRestaurants);
    console.log(now, this.props.vendors[1].openHour.getHours(), this.props.vendors[1].closeHour.getHours());
    console.log(this.props.vendors[1]);
    return (
      <div id='landing-page'>
        <Grid stackable columns={3} >
          <Grid.Column textAlign='center' className={'gridbkg'}>
            <Header as="h1" inverted >Open Now</Header>
            <List inverted>
              { openRestaurants }
              <List.Item><Header as={'h3'}>If any Restaurants are open, they will appear above.</Header></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column textAlign='center' width={8} className={'margin'}>
            <Grid.Row verticalAlign={'middle'}>
              <Search
                size={'massive'}
                placeholder={'Search for food'}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
Landing.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('VendorProfile');
  const subscriptionAdmin = Meteor.subscribe(Restaurants.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscriptionAdmin.ready();
  // Get the Stuff documents
  const vendors = VendorProfile.find({}).fetch();
  return {
    vendors,
    ready,
  };
})(Landing);
