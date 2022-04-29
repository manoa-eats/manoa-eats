import React from "react";
import { Meteor } from "meteor/meteor";
import { Container, Header, Loader, Card } from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { VendorProfile } from "../../api/vendorprofile/VendorProfile";
import { UserProfile } from "../../api/userprofile/UserProfile";
import Restaurant from "../components/Restaurant";
import { _ } from "meteor/underscore";
import { Reviews } from "../../api/review/Reviews";

/** Renders a table containing all of the Stuff documents. */
class ImFeelingHungry extends React.Component {

    // sets sort / filter method
    constructor(props) {
        super(props);
        this.state = { restaurants: this.props.restaurants };
    }

    // If the subscription(s) have been received, render the page, otherwise show a loading icon.
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Finding you a delicious restaurant</Loader>;
    }

    arrayContains(diets, userDiets) {
        for (const userDiet of userDiets) {
            if (diets.includes(userDiet)) {
                return true;
            }
        }
        return false;
    }

    vibeCheckUser() {
        if (this.props.users[0] === undefined) {
            return [];
        }
        return this.props.users[0];
    }

    pickRandomRestaurant(userDiets) {
        let restaurantList = [];
        let validIndexes = [];
        let getValidRestaurantDiets;
        const chosenRestaurant = _.sample(this.props.restaurants);
        for (let i = 0; i < this.props.restaurants.length; i++) {
            getValidRestaurantDiets = _.flatten(this.props.restaurants[i].diets);
            
        }
        let allValidDiets = _.uniq(getValidRestaurantDiets);
        if (this.arrayContains(allValidDiets, userDiets) === false) { 
            return (<Card>
                <Card.Content header={`We couldn't find a restaurant that matches your diet: ${userDiets}`}/>
            </Card>
            );
        }
        if (userDiets !== undefined && this.arrayContains(allValidDiets, userDiets)) {
            for (let i = 0; i < this.props.restaurants.length; i++) {
                restaurantList.push(this.props.restaurants[i].diets);
                if (this.arrayContains(restaurantList[i], userDiets)) {
                    validIndexes.push(i);
                }
            }
            let randomIndex = _.sample(validIndexes);
            return <Restaurant restaurant={this.props.restaurants[randomIndex]}/>;
        }
        return <Restaurant restaurant={chosenRestaurant}/>;
    }

    // Render the page once subscriptions have been received.
    renderPage() {
        return (
            <Container id="im-Feeling-Hungry-page">
                <Header as="h2" textAlign="center" inverted>I am Feeling Hungry</Header>
                <Card centered>
                    {this.pickRandomRestaurant(this.vibeCheckUser().diets)}
                </Card>
            </Container>
        );
    }
}

// Require an array of Stuff documents in the props.
ImFeelingHungry.propTypes = {
    restaurants: PropTypes.array.isRequired,
    reviews: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe("VendorProfile");
    const userProfileSubscription = Meteor.subscribe("UserProfile");
    const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
    const subscription2Admin = Meteor.subscribe(Reviews.adminPublicationName);
    // Determine if the subscription is ready
    const ready = subscription.ready() && userProfileSubscription.ready();
    const ready2 = subscription2.ready() && subscription2Admin.ready();
    // Get the Stuff documents
    const restaurants = VendorProfile.find({}).fetch();
    const reviews = Reviews.collection.find({}).fetch();
    const checkUser = () => (Meteor.user() ? Meteor.user().username : "");
    const users = UserProfile.find({ owner: checkUser() }).fetch();
    return {
        restaurants,
        reviews,
        users,
        ready,
        ready2
    };
})(ImFeelingHungry);
