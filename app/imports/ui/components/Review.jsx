import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
      <Feed.Event >
        <Feed.Content>
          <Feed.Summary>
            <a>{this.props.review.owner}</a>
            <Feed.Date content={this.props.review.createdAt.toLocaleDateString('en-US')} />
          </Feed.Summary>
          <Feed.Extra text>
            {this.props.review.note}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Review.propTypes = {
  review: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Review);
