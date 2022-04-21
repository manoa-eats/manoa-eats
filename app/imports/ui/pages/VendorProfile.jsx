import React from 'react';
import { Grid, Loader, Header, Image, Container, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurants } from '../../api/Restaurant/Restaurants';

/** Renders the Page for editing a single document. */
class VendorProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, hour, reviews, address, image, description, _id } = data;
    Restaurants.collection.update(_id, { $set: { name, hour, reviews, image, address, description } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Container>
        <Segment>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">{this.props.doc.name}</Header>
              <Image src={this.props.doc.image} centered size='large' />
              <p>{this.props.doc.hour}</p>
              <p>{this.props.doc.address}</p>
              <p>{this.props.doc.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
VendorProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Restaurants.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Restaurants.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(VendorProfile);
