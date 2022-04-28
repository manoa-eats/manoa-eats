import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class Review extends React.Component {
  render() {
    return (
      <Header as="h2" textAlign="center">
        <p>{this.props.reviews.note}</p>
      </Header>
    );
  }
}

// Require an array of Stuff documents in the props.
Review.propTypes = {
  // restaurants: PropTypes.array.isRequired,
  reviews: PropTypes.object.isRequired,
};

export default withRouter(Review);
