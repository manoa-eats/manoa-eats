import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MenuItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.menu.foodName}</Table.Cell>
        <Table.Cell>${this.props.menu.price}</Table.Cell>
        <Table.Cell>{this.props.menu.available.toLocaleString()}</Table.Cell>
        <Table.Cell>
          <Link to={`/editMenuItem/${this.props.menu._id}`}>Edit</Link>
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
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MenuItem);
