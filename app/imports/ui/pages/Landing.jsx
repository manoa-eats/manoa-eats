import React from 'react';
import { Grid, Header, List, Loader, Dropdown, Card, Label, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { VendorProfile } from '../../api/vendorprofile/VendorProfile';
import { Restaurants } from '../../api/Restaurant/Restaurants';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    // search implementation
    const vendors = JSON.parse(JSON.stringify(this.props.vendors)).map(x => ({
      text: <a href={`/#/vendor-page/${x.owner}`}>{x.name}</a>,
      key: Math.floor(Math.random() * 100000),
      image: x.image,
    }));

    // Open Now implementation
    const date = new Date();
    const compareDate = new Date('2022-04-28T03:00:00');
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todaysDate = weekday[date.getDay()];
    const checkJSON = () => this.props.vendors.map((restaurant) => restaurant.weekdayOpen);
    const restaurantDates = (doubleDateArray) => {
      const returnArr = [];
      for (let i = 0; i < doubleDateArray.length; i++) {
        if (doubleDateArray[i].includes(todaysDate)) {
          returnArr.push(i);
        }
      }
      return returnArr;
    };
    const validateOpen = (restaurantOpenHour, restaurantClosedHours) => {
      const todaysHours = date.getHours();
      const todaysMinutes = date.getMinutes();
      return todaysHours <= restaurantClosedHours.getHours()
        && todaysHours >= restaurantOpenHour.getHours()
        && todaysMinutes < restaurantClosedHours.getMinutes();
    };
    const res = () => {
      const restaurants = [];
      let validRestaurant;
      let opened;
      const checkedDateRestaurants = restaurantDates(checkJSON());
      for (let i = 0; i < checkedDateRestaurants.length; i++) {
        validRestaurant = this.props.vendors[checkedDateRestaurants[i]];
        opened = validRestaurant.weekdayOpen.includes(todaysDate) && validateOpen(validRestaurant.openHour, validRestaurant.closeHour);
        if (opened) {
          restaurants.push(validRestaurant);
        }
      }
      return restaurants;
    };
    const openRestaurants = (res().length === 0) ? <Card centered>
      <Card.Content>
        <Card.Header>Currently no open restaurants</Card.Header>
      </Card.Content>
    </Card> :
      res().map((restaurant, i) => <Card centered
        key={i}>
        <Card.Content>
          <Card.Header>{restaurant.name}</Card.Header>
          <Card.Description>
            {`OPEN: ${restaurant.openHour.toLocaleTimeString()}`}
          </Card.Description>
          <Card.Description>
            {`CLOSED: ${restaurant.closeHour.toLocaleTimeString()}`}
          </Card.Description>
          <Card.Description>{'DIETS: '}<br/>{restaurant.diets.map((diets, key) => <Label key={key} color="green">{diets}</Label>)}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/vendor-page/${restaurant.owner}`}><Button>View Restaurant</Button></Link>
        </Card.Content>
      </Card>);
    return (
      <div id='landing-page'>
        <Grid stackable columns={3}>
          <Grid.Column textAlign='center' className={'gridbkg'}>
            <Header as="h1" inverted >Open Now</Header>
            <Card.Group centered itemsPerRow={2}>
              { openRestaurants }
            </Card.Group>
          </Grid.Column>
          <Grid.Column textAlign='center' width={8} className={'margin'}>
            <Grid.Row verticalAlign={'middle'}>
              <Dropdown
                placeholder={'Search for restaurants'}
                fluid
                search
                selection
                options={vendors}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
Landing.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('VendorProfile');
  const subscriptionAdmin = Meteor.subscribe(Restaurants.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscriptionAdmin.ready();
  // Get the Stuff documents
  const vendors = VendorProfile.find({}).fetch();
  return {
    vendors,
    ready,
  };
})(Landing);
