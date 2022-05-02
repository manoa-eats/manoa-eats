import React from 'react';
import { Card, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
      <Card.Group>
        <Card>
          <Card.Content>
            <Card.Header textAlign='center'>
              {this.props.reviews.note}
            </Card.Header>
            <br/>
            <Card.Meta textAlign='center'>Review:
              <Rating defaultRating={this.props.reviews.rating} maxRating={5} disabled icon='star' size='large'/>
            </Card.Meta>
            <Card.Meta textAlign='center'>Date created: {this.props.reviews.createdAt.toLocaleDateString('en-US')}</Card.Meta>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

// Require a document to be passed to this component.
Review.propTypes = {
  reviews: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Review);
