// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Card, Image, Button, Rating, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddReview from './AddReview';

// eslint-disable-next-line no-unused-vars
class ModalContainer extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { startOpen } = this.props;

    if (startOpen) {
      this.handleOpen();
    }
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });
}

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

          <Card.Header><Link to={`/vendor-page/${this.props.restaurant._id}`}>{this.props.restaurant.name}</Link></Card.Header>

          <Card.Meta>{this.props.restaurant.address}</Card.Meta>
          <Card.Meta>{this.props.restaurant.hour}</Card.Meta>
          <Card.Description>
            {this.props.restaurant.description}
          </Card.Description>
        </Card.Content>
        <Card.Content style={{ textAlign: 'center', paddingTop: '15px' }} extra>
          <Modal
            header='Add A Review'
            trigger={<Button primary>Add A Review!</Button>}
            actions={['cancel']}
            size='large'
            content={ <AddReview owner={this.props.restaurant.owner} contactId={this.props.restaurant._id}/> }
          />

          <Rating style={{ paddingTop: '10px' }} defaultRating={this.props.restaurant.reviews} maxRating={5} disabled icon='star' size='huge'/>
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
