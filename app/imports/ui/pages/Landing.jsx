import React from 'react';
import { Grid, Header, List, Search } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <Grid stackable columns={3} >
          <Grid.Column textAlign='center' className={'gridbkg'}>
            <Header as="h1" inverted >Hours</Header>
            <List inverted>
              <List.Item><Header as={'h3'}>Restaurant 1</Header></List.Item>
              <br/>
              <List.Item><Header as={'h3'}>Restaurant 2</Header></List.Item>
              <br/>
              <List.Item><Header as={'h3'}>Restaurant 3</Header></List.Item>
              <br/>
            </List>
          </Grid.Column>
          <Grid.Column textAlign='center' width={8} className={'margin'}>
            <Grid.Row verticalAlign={'middle'}>
              <Search
                placeholder={'Search for food'}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
