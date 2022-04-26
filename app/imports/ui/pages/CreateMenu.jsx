import React from 'react';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile';
import { VendorProfileInfoSchema as formSchema } from '../forms/VendorProfileInfo';
import AddFood from '../components/AddFood';

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateVendorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { owner: false, image: 'https://react.semantic-ui.com/images/wireframe/image.png', foodMenuList: [] };
  }

  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data) {
    let insertError;
    const { name, image, location, description, open, openHour, close, closeHour, diets } = data;
    const owner = Meteor.user().username;
    VendorProfile.insert({ name, image, owner, location, description, open, openHour, close, closeHour, diets },
      (error) => {
        insertError = error;
        if (error) {
          swal('Error', insertError.message, 'error');
        } else {
          swal('Success', 'Your profile was created.', 'success');
          this.setState({ owner });
        }
      });
  }

  onAddButtonClick = () => {
    this.setState({ foodMenuList: [<AddFood key={this.state.foodMenuList.length}/>] });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">User Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <AddFood/>
              <Button icon='plus' color='green' positive onClick={this.onAddButtonClick}/>
              {this.state.foodMenuList.map((item, i) => (<AddFood key={i}/>))}
              <br/>
              <br/>
              <SubmitField value="Submit"/>
            </Segment>
          </AutoForm>
          {this.state.owner ? <Redirect to={`/edit-profile/${this.state.owner}`}/> : ''}
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateVendorProfile;
