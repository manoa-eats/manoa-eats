import React from 'react';
import { Rating, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Reviews } from '../../api/review/Reviews';

// Create a schema to specify the structure of the data to appear in the form.
const bridge = new SimpleSchema2Bridge(Reviews.schema);

/** Renders the Page for adding a document. */
class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { note: '' };
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { note, owner, contactId, createdAt } = data;
    const rating = this.rating;
    Reviews.collection.insert({ note, rating, owner, contactId, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          this.setState({ note });
        }
      });
  }

  handleRate = (e, { rating }) => {
    this.rating = rating;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <div>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <Header> Add Rating :
              <Rating style={{ paddingTop: '10px' }}
                onRate={this.handleRate}
                maxRating={5}
                icon='star'
                size='huge'/>
            </Header>
            <TextField
              id='addAReview'
              placeholder="Write review here..."
              label="Add a Restaurant review"
              name='note'
              autoComplete="off" />
            <SubmitField id='submitReview' style={{ background: '#4CAF50' }} value='Submit'/>
            <ErrorsField/>
            <HiddenField name='owner' value={this.props.owner}/>
            <HiddenField name='contactId' value={this.props.contactId}/>
            <HiddenField name='createdAt' value={new Date()}/>
          </Segment>
        </AutoForm>
        {/* eslint-disable-next-line no-undef */}
        {this.state.note ? window.location.reload() : ''}
      </div>

    );
  }
}

AddReview.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
};

export default AddReview;
