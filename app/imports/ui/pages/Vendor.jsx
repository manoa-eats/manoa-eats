import React from 'react';
import { Grid, Image, Loader, Header, Container, Segment, Divider } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurants } from '../../api/Restaurant/Restaurants';
import { Reviews } from '../../api/review/Reviews';
import Review from '../components/Review';

/** Renders the Page for adding a document. */
class Vendor extends React.Component {

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Data loading...</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Segment>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image src={this.props.restaurants.image} rounded bordered/>
              </Grid.Column>
              {/* <Divider /> */}
              <Grid.Column>
                <div>
                  <Header as="h1" textAlign="center">{this.props.restaurants.name}</Header>
                  <Header as="h3" align="center">Location</Header>
                  <p>{this.props.restaurants.address}</p>
                  <Header as="h3" align="center">Hours</Header>
                  <p align="center">{this.props.restaurants.hour}</p>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row centered>
              <Header as="h2" align="center">Menu</Header>
              {/* <List> */}
              {/*  {this.props.map((item) => <List.Item>{item}</List.Item>)} */}
              {/* </List> */}
            </Grid.Row>
            <Grid.Row centered>
              <Header as="h2" align="center">Reviews</Header>
              {this.props.reviews.map((review, index) => <Review key={index} review={review}/>)}
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }

}

// export default Vendor;

// Require an array of Stuff documents in the props.
Vendor.propTypes = {
  restaurants: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // const docId = match.params._id;
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
})(Vendor);
