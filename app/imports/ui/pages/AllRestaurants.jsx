import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurants } from '../../api/Restaurant/Restaurants';
import Restaurant from '../components/Restaurant';
import contact from '../components/Contact';
import { Reviews } from '../../api/review/Reviews';

/** Renders a table containing all of the Stuff documents. */
class AllRestaurants extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Restaurants</Header>
        <Card.Group centered>
          {this.props.restaurants.map((restaurant, index) => <Restaurant
            key={index}
            restaurant={restaurant}
            reviews={this.props.reviews.filter(review => (review.contactId === contact._id))}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
AllRestaurants.propTypes = {
  restaurants: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Restaurants.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const restaurants = Restaurants.collection.find({}).fetch();
  const reviews = Reviews.collection.find({}).fetch();
  return {
    restaurants,
    reviews,
    ready,
  };
})(AllRestaurants);
