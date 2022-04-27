import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import RestaurantAdmin from '../components/RestaurantAdmin';
import { Restaurants } from '../../api/Restaurant/Restaurants';

/** Renders a table containing all of the Stuff documents. */
class VendorVerification extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id='vendor-Verification-page'>
        <Header as="h1" textAlign="center" inverted>List Restaurant (Admin)</Header>
        <Card.Group centered>
          {this.props.restaurants.map((restaurant, index) => <RestaurantAdmin key={index} restaurant={restaurant} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
VendorVerification.propTypes = {
  restaurants: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Restaurants.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const restaurants = Restaurants.collection.find({}).fetch();
  return {
    restaurants,
    ready,
  };
})(VendorVerification);
