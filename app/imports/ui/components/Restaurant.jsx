import React from 'react';
import { Card, Image, Button, Rating, Modal, Form, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
          <Card.Header>{this.props.restaurant.name}</Card.Header>
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
            actions={['cancel', { key: 'Submit', content: 'Submit', positive: true }]}
            size='large'
            content=
              {
                <Form style={{ padding: '15px' }}>
                  <Form.Field>
                    <Header as='h5'>Please drag to leave Rating</Header>
                    <Rating defaultRating={0} maxRating={5} icon='star' size='huge'/>
                  </Form.Field>
                  <Form.Field>
                    <Form.TextArea label='Write Review Below' placeholder='Tell us more about your experience:' />
                  </Form.Field>
                </Form>
              }
          />

          <Rating defaultRating={this.props.restaurant.reviews} maxRating={5} disabled icon='star' size='huge'/>
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