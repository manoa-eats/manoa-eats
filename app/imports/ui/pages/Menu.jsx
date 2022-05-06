import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Menus } from '../../api/menu/Menu';
import MenuItem from '../components/MenuItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MenuTable extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id='ViewMenuItem-page'>
        <Header as="h2" textAlign="center">Menu</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Edit</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Remove</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.menus.map((menu) => <MenuItem key={menu._id} menu={menu} Menus={Menus}/>)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
MenuTable.propTypes = {
  menus: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const owner = match.params.owner;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Menus.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const menus = Menus.collection.find({ owner: owner }).fetch();
  return {
    menus,
    ready,
  };
})(MenuTable);
