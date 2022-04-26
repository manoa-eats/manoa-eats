import React from 'react';
import { Grid, Image, Loader, Header, Container, Segment, Divider, Rating, Comment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Restaurants } from '../../api/Restaurant/Restaurants';
import { Reviews } from '../../api/review/Reviews';
import Review from '../components/Review';

/** Renders the Page for adding a document. */
class Vendor extends React.Component {

  submit(data) {
    const { name, hour, reviews, address, image, description, _id } = data;
    // eslint-disable-next-line no-undef
    Restaurants.collection.update(_id, { $set: { name, hour, reviews, image, address, description } }, (error) => (error ? swal('Error', error.message, 'error') : swal('Success', 'Item updated successfully', 'success')));

    const { note, owner, contactId, createdAt } = data;
    Reviews.collection.insert({ note, owner, contactId, createdAt }, (error) => {
      if (error) { swal('Error', error.message, 'error'); } else {
        swal('Success', 'Item added successfully', 'success');
      }
    });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Data loading...</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Segment>
          <div style={{ position: 'relative' }}>
            <Image src={this.props.doc.image} fluid />
            <div style={{ paddingLeft: 50, paddingRight: 50, position: 'absolute', bottom: -45 }}>
              <Grid verticalAlign='middle' textAlign='center' columns='2' centered>
                <Grid.Row divided>
                  <Grid.Column width={5}>
                    {/* Change with logo */}
                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' circular size={'medium'} bordered/>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <Segment raised inverted tertiary>
                      <Header as="h1" textAlign="center">{this.props.doc.name}</Header>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </div>
          <Grid style={{ paddingTop: 25 }} >
            <div align='center' style={{ paddingTop: 35, paddingRight: 50, paddingLeft: 50 }}>
              <Rating style={{ paddingTop: '10px' }} defaultRating={this.props.doc.reviews} maxRating={5} disabled icon='star' size='huge'/>
              <br/><br/>
              <span>{this.props.doc.description}</span>
            </div>
            <Grid.Row columns={2} divided style={{ paddingTop: 25 }}>
              <Grid.Column>
                {/* <Image src={this.props.doc.image} centered size='large' rounded bordered/> */}
                <div>
                  <Header as="h3" align="center">Hours</Header>
                  <p align="center">{this.props.doc.hour}</p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <Header as="h3" align="center">Location</Header>
                  <p align="center">{this.props.doc.address}</p>
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
              <Comment.Group>
                <Header as="h2" align="center">Reviews</Header>
                {/* /!* eslint-disable-next-line react/jsx-key *!/ */}
                <Comment>
                  {/* eslint-disable-next-line react/jsx-key */}
                  {this.props.reviews.map((review, index) => <Review key={index} review={review}/>)}
                </Comment>
              </Comment.Group>
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
  // restaurants: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  doc: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const docId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Restaurants.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  // const restaurants = Restaurants.collection.find({}).fetch();
  // const reviews = Reviews.collection.find({}).fetch();
  return {
    // restaurants,
    reviews: Reviews.collection.find({ restaurantName: (Restaurants.collection.findOne(docId) !== undefined) ? (Restaurants.collection.findOne(docId).name) : ('') }).fetch(),
    ready,
    doc: Restaurants.collection.findOne(docId),
  };
})(Vendor);
