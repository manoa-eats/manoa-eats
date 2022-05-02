import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MenuItem extends React.Component {
  removeItem(docID) {
    // eslint-disable-next-line no-console
    console.log(`item to delete is: ${docID}`);
    this.props.Menus.collection.remove(docID);
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell textAlign="center">{this.props.menu.foodName}</Table.Cell>
        <Table.Cell textAlign="center">${this.props.menu.price}</Table.Cell>
        <Table.Cell textAlign="center">
          <Link to={`/editMenuItem/${this.props.menu._id}`}>Edit</Link>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Button icon onClick={() => this.removeItem(this.props.menu._id)}>
            <Icon name='trash'/>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
MenuItem.propTypes = {
  menu: PropTypes.shape({
    foodName: PropTypes.string,
    price: PropTypes.number,
    available: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
  Menus: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MenuItem);
