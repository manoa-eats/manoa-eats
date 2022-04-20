import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Segment, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurants } from '../../api/Restaurant/Restaurants';
import Restaurant from '../components/Restaurant';
import contact from '../components/Contact';
import { Reviews } from '../../api/review/Reviews';

/** Renders a table containing all of the Stuff documents. */
class AllRestaurants extends React.Component {

  // sets sort / filter method
  constructor(props) {
    super(props);
    this.state = { sortName: true, sortRating: false };
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const restaurants = this.props.restaurants;

    const compName = function (a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    };

    const compRating = function (a, b) {
      const nameA = a.reviews.toUpperCase(); // ignore upper and lowercase
      const nameB = b.reviews.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    };

    // Sort by name
    if (this.state.sortName) {
      restaurants.sort(compName);
    } else if (this.state.sortRating) {
      // sort by value
      restaurants.sort(compRating);
    } else {
      restaurants.reverse();
    }

    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Restaurants</Header>
        <Segment>
          <Button
            color={'red'}
            onClick={() => this.setState({
              sortName: !this.state.sortName,
              sortRating: false,
            })}>
            Sort Alphabetically
          </Button>
          <Button
            color={'red'}
            onClick={() => this.setState({
              sortName: false,
              sortRating: !this.state.sortRating,
            })}>
            Sort by Review
          </Button>
        </Segment>
        <Card.Group centered>
          {restaurants.map((restaurant, index) => <Restaurant
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
