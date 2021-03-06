import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { allRestaurantsPage } from './allRestaurants.page';
import { vendorVerificationPage } from './VendorVerification.page';
import { signupPage } from './signup.page';
import { userProfilePage } from './UserProfile.page';
import { feelingluckyPage } from './im-feeling-lucky.page';
import { vendorProfilePage } from './VendorProfile.page';
import { vendorMenuPage } from './VendorMenu.page';
import { vendorViewMenuPage } from './VendorViewMenu.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const tempCredentials = { username: 'apple@foo.com', userPassword: 'changeme', adminName: 'pear@foo.com', adminPassword: 'changeme' };
const userCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const vendorCredentials = { username: 'asia@foo.com', password: 'changeme' };
const testingData = {
  review: 'The food was great, however service was slow',
  name: 'TestName',
  changeHour: '7:00pm-12:00am',
  changeReview: '5',
  changeAddress: 'Hamilton Library',
  changeImage: 'https://www.gannett-cdn.com/media/2021/06/03/USATODAY/usatsports/imageForEntry18-8on.jpg?width=2560',
  changeDescription: 'McDonalds is an American multinational fast food corporation, founded in 1940 as a restaurant operated by Richard and Maurice McDonald, in San Bernardino, California, United States',
  price: '5.00',
  changeName: 'apple',
};

const testingProfileData = {
  name: 'TestName',
  changeProfileImage: 'https://www.gannett-cdn.com/media/2021/06/03/USATODAY/usatsports/imageForEntry18-8on.jpg?width=2560',
};

fixture('manoa-eats localhost test with default db')
  .page('http://localhost:3000');

/** TestCafe Page Tests */
test('Testing that the landing page displays', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Testing the landing page view restaurant Button', async (testController) => {
  await landingPage.isDisplayed(testController);
  await landingPage.displayRest(testController);
});

test('Testing the user signin and signout', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.isLoggedIn(testController, userCredentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Testing the user signup', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, tempCredentials.username, tempCredentials.userPassword);
  await navBar.isLoggedIn(testController, tempCredentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Testing the vendor signup', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupVendor(testController, tempCredentials.adminName, tempCredentials.adminPassword);
  await navBar.isLoggedIn(testController, tempCredentials.adminName);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Testing the all restaurants page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoAllRestaurantsPage(testController);
  await allRestaurantsPage.isDisplayed(testController);
});

test('Testing the all restaurants review modal', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoAllRestaurantsPage(testController);
  await allRestaurantsPage.isDisplayed(testController);
  await allRestaurantsPage.reviewModal(testController, testingData.review);
});

test('Testing the all restaurants sort buttons', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoAllRestaurantsPage(testController);
  await allRestaurantsPage.isDisplayed(testController);
  await allRestaurantsPage.sortAlpha(testController);
  await allRestaurantsPage.sortRating(testController);
});

test('Testing the vendor verification page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoVendorVerificationPage(testController);
  await vendorVerificationPage.isDisplayed(testController);
});

test('Testing the vendor verification remove button', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoVendorVerificationPage(testController);
  await vendorVerificationPage.isDisplayed(testController);
  await vendorVerificationPage.adminRemoveVendor(testController);
});

test('Testing the vendor verification edit form', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoVendorVerificationPage(testController);
  await vendorVerificationPage.isDisplayed(testController);
  await vendorVerificationPage.editRestaurant(testController, testingData.name, testingData.changeHour, testingData.changeReview, testingData.changeAddress, testingData.changeImage, testingData.changeDescription);
});

test('Testing the user profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoCreateProfilePage(testController);
  await userProfilePage.isDisplayed(testController);
  await userProfilePage.userProfile(testController, testingProfileData.name, testingProfileData.changeProfileImage);
});

test('Testing the vendor display page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoAllRestaurantsPage(testController);
  await allRestaurantsPage.isDisplayed(testController);
  await allRestaurantsPage.VendorIsDisplayed(testController);
});

test('Testing that the feeling lucky page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoFeelingLuckyPage(testController);
  await feelingluckyPage.isDisplayed(testController);

});

test('Testing the feeling lucky page view restaurant button', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoFeelingLuckyPage(testController);
  await feelingluckyPage.isDisplayed(testController);
  await feelingluckyPage.VendorIsDisplayed(testController);
});

test('Testing the feeling lucky page review Modal ', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoFeelingLuckyPage(testController);
  await feelingluckyPage.isDisplayed(testController);
  await feelingluckyPage.reviewModal(testController, testingData.review);
});

test('Testing the vendor edit profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, vendorCredentials.username, vendorCredentials.password);
  await navBar.gotoEditVendorProfilePage(testController);
  await vendorProfilePage.isDisplayed(testController);
  await vendorProfilePage.editVendorProfile(testController, testingProfileData.name, testingProfileData.changeProfileImage);
});

test('Testing the vendor create menu page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, vendorCredentials.username, vendorCredentials.password);
  await navBar.gotoCreateMenuPage(testController);
  await vendorMenuPage.isDisplayed(testController);
  await vendorMenuPage.vendorCreateMenu(testController, testingProfileData.name);
});

test('Testing the vendor view menu page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, vendorCredentials.username, vendorCredentials.password);
  await navBar.gotoViewMenuPage(testController);
  await vendorViewMenuPage.isDisplayed(testController);
});

test('Testing the vendor view menu edit button', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, vendorCredentials.username, vendorCredentials.password);
  await navBar.gotoViewMenuPage(testController);
  await vendorViewMenuPage.isDisplayed(testController);
  await vendorViewMenuPage.editMenuItem(testController);
});

test('Testing the vendor view menu remove button', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, vendorCredentials.username, vendorCredentials.password);
  await navBar.gotoViewMenuPage(testController);
  await vendorViewMenuPage.isDisplayed(testController);
  await vendorViewMenuPage.removeMenuItem(testController);
});
