import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { TextField } from 'uniforms-semantic';
import { DateField } from 'uniforms-unstyled';

function handleDelete() {
  console.log('item deleted');
}
export default function MenuItemField() {
  return (
    <Grid.Row>
      <Grid.Column>
        <TextField name="foodName"/>
      </Grid.Column>
      <Grid.Column>
        <DateField name="dateAvailable"/>
      </Grid.Column>
      <Grid.Column>
        <DateField name="timeAvailable"/>
      </Grid.Column>
      <Grid.Column>
        <TextField name="price"/>
      </Grid.Column>
      <Grid.Column>
        <Button icon='cancel' onClick={handleDelete} />
      </Grid.Column>
    </Grid.Row>
  );
}
