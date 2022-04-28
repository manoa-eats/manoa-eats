import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Segment, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurants } from '../../api/Restaurant/Restaurants';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile';
import Restaurant from '../components/Restaurant';
import contact from '../components/Contact';
import { Reviews } from '../../api/review/Reviews';

/** Renders a table containing all of the Stuff documents. */
class ImFeelingHungry extends React.Component {

  // sets sort / filter method
  constructor(props) {
    super(props);
    this.state = { sortName: true, sortRating: true };
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const restaurants = this.props.restaurants;
    return (
      <Container id='im-Feeling-Hungry-page'>
        <Header as="h2" textAlign="center" inverted>I am Feeling Hungry</Header>
        <Segment>
          <Button className="fluid ui button"
            onClick={() => this.setState({
              sortName: false,
              sortRating: !this.state.sortRating,
            })}>
            Pick Another Restaurant
          </Button>
        </Segment>
        <Card centered>
          {restaurants.map((restaurant, index) => <Restaurant
            key={index}
            restaurant={restaurant}
            reviews={this.props.reviews.filter(review => (review.contactId === contact._id))}/>)}
        </Card>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ImFeelingHungry.propTypes = {
  restaurants: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('VendorProfile');
  const subscriptionAdmin = Meteor.subscribe(Restaurants.adminPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  const subscription2Admin = Meteor.subscribe(Reviews.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscriptionAdmin.ready();
  const ready2 = subscription2.ready() && subscription2Admin.ready();
  // Get the Stuff documents
  const restaurants = VendorProfile.find({}).fetch();
  const reviews = Reviews.collection.find({}).fetch();
  return {
    restaurants,
    reviews,
    ready,
    ready2,
  };
})(ImFeelingHungry);
