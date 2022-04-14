import React from 'react';
import { Card, Image, Button, Rating, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
          <Card.Header>{this.props.restaurant.name}</Card.Header>
          <Card.Meta>{this.props.restaurant.address}</Card.Meta>
          <Card.Meta>{this.props.restaurant.hour}</Card.Meta>
          <Card.Description>
            {this.props.restaurant.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Modal
            trigger={<Button primary>Add Review!</Button>}
            header='Add Review!'
            content='Call Benjamin regarding the reports.'
            actions={['cancel', { key: 'done', content: 'Done', positive: true }]}
          />

          <Rating defaultRating={3} maxRating={5} disabled />
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
