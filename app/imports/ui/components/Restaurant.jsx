// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Card, Image, Button, Rating, Modal, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import AddReview from './AddReview';

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

          <Card.Header><Link id='restName' to={`/vendor-page/${this.props.restaurant.owner}`}>{this.props.restaurant.name} (click for more info)</Link></Card.Header>
          <Card.Meta><Icon name='location arrow'/> {this.props.restaurant.location}</Card.Meta>
          <Card.Meta><Icon name='time'/>Open: {this.props.restaurant.openHour.toLocaleTimeString().match(/\d{2}:\d{2}|[AMP]+/g).join(' ')}</Card.Meta>
          <Card.Meta><Icon name='times circle'/>Closed: {this.props.restaurant.closeHour.toLocaleTimeString().match(/\d{2}:\d{2}|[AMP]+/g).join(' ')}</Card.Meta>
          <Card.Meta><Icon name='calendar alternate'/>Weekdays open: {this.props.restaurant.weekdayOpen.map((day, key) => <Label color="blue" key={key}>{day}</Label>)}</Card.Meta>
          <Card.Meta><Icon name='food'/>Diets: {this.props.restaurant.diets.map((day, key) => <Label color="orange" key={key}>{day}</Label>)}</Card.Meta>
          <Card.Description>
            {this.props.restaurant.description}
          </Card.Description>
        </Card.Content>
        <Card.Content style={{ textAlign: 'center', paddingTop: '15px' }} extra>
          <Modal
            header='Add A Review '
            trigger={<Button id='reviewButton' primary>Add A Review!</Button>}
            actions={['cancel']}
            size='large'
            content={ <AddReview owner={this.props.restaurant.owner} contactId={this.props.restaurant._id}/> }
          />

        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Restaurant);
