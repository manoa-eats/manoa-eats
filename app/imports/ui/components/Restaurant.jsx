import React from 'react';
import { Card, Image, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import AddNote from './AddNote';
import Note from './Note';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Restaurant extends React.Component {
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
          <Card.Meta>{this.props.restaurant.address}</Card.Meta>
          <Card.Meta>{this.props.restaurant.hour}</Card.Meta>
          <Card.Description>
            {this.props.restaurant.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/Review/${this.props.restaurant._id}`}>Review</Link>
        </Card.Content>
        <Card.Content extra>
          <Feed>
            {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <AddNote owner={this.props.restaurant.owner} restaurantId={this.props.restaurant._id}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Restaurant);
