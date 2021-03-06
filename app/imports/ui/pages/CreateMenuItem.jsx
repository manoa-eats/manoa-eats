import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { MenuProfileInfoSchema as formSchema } from '../forms/MenuProfileInfo';
// eslint-disable-next-line import/named
import { Menus } from '../../api/menu/Menu';

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateMenuItem extends React.Component {

  constructor() {
    super();
    this.state = { owner: '' };
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { foodName, price } = data;
    const owner = Meteor.user().username;
    Menus.collection.insert({ owner, foodName, price },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          this.setState({ owner });
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid id='AddMenuItem-page' container centered>
        <Grid.Column>
          <Header as="h1" textAlign="center" inverted>Create Menu Item</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id='menuFoodName' name='foodName'/>
              <NumField id='menuFoodPrice' name='price' decimal/>
              <SubmitField id='submitMenuVendor' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateMenuItem;
