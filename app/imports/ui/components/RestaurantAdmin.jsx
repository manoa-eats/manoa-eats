import React from 'react';
import { Card, Image, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile'

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantAdmin extends React.Component {
  removeItem(docID) {
    // eslint-disable-next-line no-console
    VendorProfile.remove(docID);
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='medium'
            src={this.props.restaurant.image}
          />
          <Card.Header>{this.props.restaurant.name}</Card.Header>
          <Card.Meta>{this.props.restaurant.location}</Card.Meta>
          <Card.Meta>Open: {this.props.restaurant.openHour.toLocaleTimeString()}</Card.Meta>
          <Card.Meta>Closed: {this.props.restaurant.closeHour.toLocaleTimeString()}</Card.Meta>
          <Card.Meta>Weekdays open: {this.props.restaurant.weekdayOpen.map((day, key) => <Label key={key}>{day}</Label>)}</Card.Meta>
          <Card.Description>
            {this.props.restaurant.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Owner: {this.props.restaurant.owner}
        </Card.Content>
        <Card.Content >
          <Link id='editRestaurantButton' to={`/editRestaurant/${this.props.restaurant._id}`}>Edit</Link>
        </Card.Content>
        <Card.Content >
          <Button onClick={() => this.removeItem(this.props.restaurant._id)} color='red'>Remove</Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
RestaurantAdmin.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RestaurantAdmin);
