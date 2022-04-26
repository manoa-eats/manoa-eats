import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Restaurants } from '../../api/Restaurant/Restaurants';
import Restaurant from '../components/Restaurant';
import contact from '../components/Contact';
import { Reviews } from '../../api/review/Reviews';

/** Renders a table containing all of the Stuff documents. */
class ImFeelingHungry extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>I am Feeling Hungry</Loader>;
  }

  // Render the page once subscriptions have been received.
  // On click button will pick a random restaurant
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>I am Feeling Hungry</Header>
        <Card centered>
          {this.props.restaurants.map((restaurant, index) => <Restaurant
            key={index}
            restaurant={restaurant}
            reviews={this.props.reviews.filter(review => (review.contactId === contact._id))}/>)}
        </Card>
        <button className="fluid ui button">Pick Another Restaurant</button>
      </Container>
    );
  }

  // <Button title="Pick Another Restaurant" onPress={this.GenerateRandomNumber} />

  // On submit, insert the data.
  submit(data, formRef) {
    const { note, owner, contactId, createdAt } = data;
    Reviews.collection.insert({ note, owner, contactId, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
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
})(ImFeelingHungry);
