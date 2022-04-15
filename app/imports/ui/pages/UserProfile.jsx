import React from 'react';
import { Grid, Segment, Header } from "semantic-ui-react";
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, SubmitField } from "uniforms-semantic";
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { UserProfileInfoSchema as formSchema } from '../forms/UserProfileInfo';
import { UserProfile } from '../../api/userprofile/UserProfile';
import { UserDiet } from '../../api/userdiet/UserDiet';

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { diets: false };
    }

    /** On submit, try to insert the data. If successful, reset the form. */
    submit(data) {
        let insertError;
        const { name, image, userPreferredFoods, diets } = data;
        UserProfile.insert({ name, image, userPreferredFoods, diets },
            (error) => { insertError = error; });
        if (insertError) {
            swal('Error', insertError.message, 'error');
        } else {
            UserDiet.insert({ diets },
                (error) => { insertError = error; });
            if (insertError) {
                swal('Error', insertError.message, 'error');
            } else {
                swal('Success', 'Your profile was created.', 'success');
                this.setState({ diets });
            }
        }
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">User Profile</Header>
                    <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
                        <Segment>
                            <TextField name='name' showInlineError={true} placeholder={'Your name'}/>
                            <TextField name='image' showInlineError={true} placeholder={'image link'}/>
                            <MultiSelectField name='userPreferredFoods' showInlineError={true} placeholder={'Select Food Preferences (optional)'}/>
                            <MultiSelectField name='diets' showInlineError={true} placeholder={'Select Diet Preferences (optional)'}/>
                            <SubmitField value='Submit'/>
                        </Segment>
                    </AutoForm>
                </Grid.Column>
            </Grid>
        );
    }
}

export default CreateUserProfile;