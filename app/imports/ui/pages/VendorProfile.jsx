import React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { UserProfile } from '../../api/userprofile/UserProfile';
import { UserProfileInfoSchema as formSchema } from '../forms/UserProfileInfo';
import { UserDiet } from '../../api/userdiet/UserDiet';

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateVendorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { owner: false, image: 'https://react.semantic-ui.com/images/wireframe/image.png' };
  }

  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data) {
    let insertError;
    const { name, image, userPreferredFoods, diets } = data;
    const owner = Meteor.user().username;
    UserProfile.insert({ name, image, owner, userPreferredFoods, diets },
      (error) => {
        insertError = error;
        if (error) {
          swal('Error', insertError.message, 'error');
        } else {
          UserDiet.insert({ owner, diets },
            // This is a different error for inserting a User's diet
            // eslint-disable-next-line no-shadow
            (error) => {
              insertError = error;
              if (insertError) {
                swal('Error', insertError.message, 'error');
              } else {
                swal('Success', 'CONGRATULATIONS! You profile was created.', 'success');
              }
            });
          swal('Success', 'Your profile was created.', 'success');
          this.setState({ owner });
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">User Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Image centered rounded src={this.state.image} size='medium' />
              <TextField name="name" showInlineError={true} placeholder={'Your name'}/>
              <TextField name="image" showInlineError={true} placeholder={'image link'}/>
              <MultiSelectField name="userPreferredFoods" showInlineError={true}
                placeholder={'Select Food Preferences (optional)'}/>
              <MultiSelectField name="diets" showInlineError={true}
                placeholder={'Select Diet Preferences (optional)'}/>
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
