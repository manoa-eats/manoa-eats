import React from 'react';
import { Grid, Segment, Header, Image, Loader } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, SubmitField, LongTextField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile';
import { VendorProfileInfoSchema as formSchema } from '../forms/VendorProfileInfo';

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class EditRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: false,
      image: 'https://react.semantic-ui.com/images/wireframe/image.png',
    };
  }

  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data) {
    let updateError;
    const vendorProfileId = this.props.vendorProfileDoc._id;
    const { name, image, location, description, weekdayOpen, openHour, closeHour, diets } = data;
    // eslint-disable-next-line no-console
    VendorProfile.update(vendorProfileId, { $set: { name, image, location, description, weekdayOpen, openHour, closeHour, diets } },
      (error) => {
        updateError = error;
        if (error) {
          swal('Error', updateError.message, 'error');
        } else {
          swal('Success', 'Your profile was updated.', 'success');
        }
      });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Create Vendor Profile</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const model = _.extend({}, this.props.vendorProfileDoc);
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" style={{ color: 'white' }} textAlign="center">Vendor Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={model}>
            <Segment>
              <Image centered rounded src={this.props.vendorProfileDoc.image} size='medium' />
              <TextField name="name" showInlineError={true} placeholder={'Your organization name'}/>
              <TextField name="image" showInlineError={true} placeholder={'image link'}/>
              <TextField name="location" showInlineError={true} placeholder={'Address'}/>
              <LongTextField name="description" showInlineError={true} placeholder={'Tell the world a little bit about your venue'}/>
              <MultiSelectField name="weekdayOpen" showInlineError={true}
                placeholder={'Weekdays open'}/>
              <DateField
                name='openHour'
                max={new Date()}
                min={new Date()}
              />
              <DateField
                name='closeHour'
                max={new Date()}
                min={new Date()}
              />
              <MultiSelectField name="diets" showInlineError={true}
                placeholder={'Accommodating Diets'}/>
              <SubmitField id='submitNewRestaurantInformation' value="Submit"/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require a UserProfile and enrollment doc.  Uniforms adds 'model' to the props, which we use. */
EditRestaurant.propTypes = {
  vendorProfileDoc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the owner from the URL field. See imports/ui/layouts/App.jsx for the route containing :owner.
  const owner = match.params._id;
  // Request UserProfile and UserDiet docs. Won't be locally available until ready() returns true.
  const VendorProfileSubscription = Meteor.subscribe('VendorProfile');
  return {
    vendorProfileDoc: VendorProfile.findOne({ _id: owner }),
    ready: VendorProfileSubscription.ready(),
  };
})(EditRestaurant);
