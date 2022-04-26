import React from 'react';
import { Button } from 'semantic-ui-react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Notes } from '../../api/note/Notes';

// Create a schema to specify the structure of the data to appear in the form.
// eslint-disable-next-line no-unused-vars
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
