import React from 'react';
import { Grid, Image, Loader, Header, Container, Segment, Divider } from 'semantic-ui-react';
// import { TextField } from 'uniforms-semantic';
// import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';

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
          <Grid centered middle>
            <Grid.Row divided="horizontally" columns={2}>
              <Grid.Column>
                <Image src='https://www.majorgeeks.com/news/file/13592_going%20to%20work%20majorgeeks.jpg' rounded verticallyAlign='middle' centered bordered/>
              </Grid.Column>
              <Grid.Column centered>
                <div verticallyAlign='middle'>
                  <Header as="h1" align="center">Restaurant Name</Header>
                  <Header as="h3" align="center">Location</Header>
                  <Header as="h3" align="center">Hours</Header>
                  <p align="center">SOMETHING</p>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row><Header centered>Menu</Header>
              {/* <List> */}
              {/*  {this.props.map((item) => <List.Item>{item}</List.Item>)} */}
              {/* </List> */}
            </Grid.Row>
            <Grid.Row>
              <Header centered>Reviews</Header>
              <Segment>
                <p>{this.props.notes.note}</p>
              </Segment>
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
  contacts: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const subscription2 = Meteor.subscribe(Notes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const contacts = Contacts.collection.find({}).fetch();
  const notes = Notes.collection.find({}).fetch();
  return {
    contacts,
    notes,
    ready,
  };
})(Vendor);
