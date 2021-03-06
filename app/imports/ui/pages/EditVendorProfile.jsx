import React from 'react';
import { Grid, Header, Image, Loader, Segment } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, DateField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
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
class EditVendor extends React.Component {
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
    const owner = Meteor.user().username;
    // eslint-disable-next-line no-console
    VendorProfile.update(vendorProfileId, { $set: { name, image, owner, location, description, weekdayOpen, openHour, closeHour, diets } },
      (error) => {
        updateError = error;
        if (error) {
          swal('Error', updateError.message, 'error');
        } else {
          swal('Success', 'Your profile was updated.', 'success');
          this.setState({ owner });
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
      <Grid id='editVendorProfile-page' container centered>
        <Grid.Column>
          <Header as="h1" style={{ color: 'white' }} textAlign="center" inverted>Vendor Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={model}>
            <Segment>
              <Image centered rounded src={this.props.vendorProfileDoc.image} size='medium' />
              <TextField id = 'vendorFormName' name="name" showInlineError={true} placeholder={'Your organization name'}/>
              <TextField id = 'vendorFormImage' name="image" showInlineError={true} placeholder={'image link'}/>
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
              <SubmitField id='submitEditVendor' value="Submit"/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require a UserProfile and enrollment doc.  Uniforms adds 'model' to the props, which we use. */
EditVendor.propTypes = {
  vendorProfileDoc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the owner from the URL field. See imports/ui/layouts/App.jsx for the route containing :owner.
  const owner = match.params.owner;
  // Request UserProfile and UserDiet docs. Won't be locally available until ready() returns true.
  const VendorProfileSubscription = Meteor.subscribe('VendorProfile');
  return {
    vendorProfileDoc: VendorProfile.findOne({ owner }),
    ready: VendorProfileSubscription.ready(),
  };
})(EditVendor);
