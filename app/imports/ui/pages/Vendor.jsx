import React from 'react';
import {
  Grid,
  Image,
  Loader,
  Header,
  Container,
  Segment,
  Divider,
  Rating,
  Comment,
  Label,
} from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile';
import { Reviews } from '../../api/review/Reviews';
import Review from '../components/Review';
import { Menus } from '../../api/menu/Menu';
import VendorMenu from './VendorMenu';

/** Renders the Page for adding a document. */
class Vendor extends React.Component {

  submit(data) {
    const { name, image, location, description, weekdayOpen, openHour, closeHour, diets } = data;
    // eslint-disable-next-line no-undef
    VendorProfile.update(_id, { $set: { name, image, location, description, weekdayOpen, openHour, closeHour, diets } }, (error) => (error ? swal('Error', error.message, 'error') : swal('Success', 'Item updated successfully', 'success')));

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
      <Container id='vendor-View-page'>
        <Segment>
          <div style={{ position: 'relative' }}>
            <Image src={this.props.doc.image} fluid />
            <div style={{ paddingLeft: 50, paddingRight: 50, position: 'absolute', bottom: -45 }}>
              <Grid verticalAlign='middle' textAlign='center' columns='2' centered>
                <Grid.Row divided>
                  <Segment raised inverted>
                    <Header as="h1" textAlign="center">{this.props.doc.name}</Header>
                  </Segment>
                </Grid.Row>
              </Grid>
            </div>
          </div>
          <br/>
          <Grid style={{ paddingTop: 25 }}>
            <Container textAlign='center'>
              <div style={{ paddingTop: 35, paddingRight: 50, paddingLeft: 50 }}>
                <span>{this.props.doc.description}</span>
              </div>
            </Container>
            <Grid.Row columns={2} divided style={{ paddingTop: 25 }}>
              <Grid.Column>
                <div>
                  <Header as="h3" align="center">Open Hours</Header>
                  <p align="center">{this.props.doc.openHour.toLocaleTimeString()}</p>
                </div>
                <br/>
                <div>
                  <Header as="h3" align="center">Closed Hours</Header>
                  <p align="center">{this.props.doc.closeHour.toLocaleTimeString()}</p>
                </div>
                <br/>
                <div>
                  <Header as="h3" align="center">Weekdays Open</Header>
                  <div align='center'>
                    {this.props.doc.weekdayOpen.map((day, key) => <Label key={key}>{day}</Label>)}
                  </div>
                </div>

              </Grid.Column>
              <Grid.Column>
                <div>
                  <Header as="h3" align="center">Location</Header>
                  <p align="center">{this.props.doc.location}</p>
                  <iframe width="530" height="400" style={{ border: '0' }} loading="lazy" allowFullScreen
                    src="https://www.google.com/maps/embed/v1/streetview?location=21.3009%2C-157.8156&key=AIzaSyCPlaH86LNtisYSdT-Dgs6vp7llJhLVlJo"/>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row centered>
              <VendorMenu menus={this.props.menus}/>
            </Grid.Row>
            <Grid.Row centered>
              <Comment.Group>
                <Header as="h2" align="center">Reviews</Header>
                <Comment>
                  {this.props.reviews.map((review, index) => <Review key={index} reviews={review}/>)}
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
  menus: PropTypes.array.isRequired,
  doc: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const docId = match.params.owner;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('VendorProfile');
  const subscription3 = Meteor.subscribe(Menus.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready();
  // Get the Stuff documents
  // const restaurants = Restaurants.collection.find({}).fetch();
  const reviewer = Reviews.collection.find({ owner: docId }).fetch();
  const menu = Menus.collection.find({ owner: docId }).fetch();
  return {
    // restaurants,
    reviews: reviewer,
    menus: menu,
    ready,
    doc: VendorProfile.findOne({ owner: docId }),
  };
})(Vendor);
