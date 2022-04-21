import React from 'react';
import { Grid, Segment, Header, Loader, Image } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { UserProfile } from '../../api/userprofile/UserProfile';
import { UserProfileInfoSchema as formSchema } from '../forms/UserProfileInfo';
import { UserDiet } from '../../api/userdiet/UserDiet';

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for editing a document. */
class EditUser extends React.Component {

  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data) {
    let updateError;
    const userProfileId = this.props.userProfileDoc._id;
    const userDietId = this.props.userDietDoc._id;
    const { name, image, userPreferredFoods, diets } = data;
    UserProfile.update(userProfileId, { $set: { name, image, userPreferredFoods, diets } },
      (error) => {
        updateError = error;
        if (updateError) {
          swal('Error', updateError.message, 'error');
        } else {
          UserDiet.update(userDietId, { $set: { diets } },
            // eslint-disable-next-line no-shadow
            (error) => { updateError = error; });
          if (updateError) {
            swal('Error', updateError.message, 'error');
          } else {
            swal('Success', 'user profile was updated.', 'success');
          }
        }
      });

  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Create a Profile</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    // Build the model object that Uniforms will use to fill in the form.
    const model = _.extend({}, this.props.userProfileDoc, this.props.userDietDoc);
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit User Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={model}>
            <Segment>
              <Image centered rounded src={model.image} size='medium' />
              <TextField name="name" showInlineError={true} placeholder={'Your name'}/>
              <TextField name="image" showInlineError={true} placeholder={'image link'}/>
              <MultiSelectField name="userPreferredFoods" showInlineError={true}
                placeholder={'Select Food Preferences (optional)'}/>
              <MultiSelectField name="diets" showInlineError={true}
                placeholder={'Select Diet Preferences (optional)'}/>
              <SubmitField value="Submit"/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require a UserProfile and enrollment doc.  Uniforms adds 'model' to the props, which we use. */
EditUser.propTypes = {
  userProfileDoc: PropTypes.object,
  userDietDoc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the owner from the URL field. See imports/ui/layouts/App.jsx for the route containing :owner.
  const owner = match.params.owner;
  // Request UserProfile and UserDiet docs. Won't be locally available until ready() returns true.
  const UserProfileSubscription = Meteor.subscribe('UserProfile');
  const UserDietSubscription = Meteor.subscribe('UserDiet');
  return {
    userProfileDoc: UserProfile.findOne({ owner }),
    userDietDoc: UserDiet.findOne({ owner }),
    ready: UserProfileSubscription.ready() && UserDietSubscription.ready(),
  };
})(EditUser);
