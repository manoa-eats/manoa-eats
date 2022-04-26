import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Notes } from '../../api/note/Notes';

// Create a schema to specify the structure of the data to appear in the form.
const bridge = new SimpleSchema2Bridge(Notes.schema);

/** Renders the Page for adding a document. */
class AddFood extends React.Component {

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    return (
      <Button icon='plus' color='orange'/>
    );
  }
}

// AddFood.propTypes = {
//   owner: PropTypes.string.isRequired,
//   contactId: PropTypes.string.isRequired,
// };

export default AddFood;
