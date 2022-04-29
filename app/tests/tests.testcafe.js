import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { allRestaurantsPage } from './allRestaurants.page';
import { vendorVerificationPage } from './VendorVerification.page';
import { signupPage } from './signup.page';
import { userProfilePage } from './UserProfile.page';
import { feelingluckyPage } from './im-feeling-lucky.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const tempCredentials = { username: 'apple@foo.com', userPassword: 'changeme', adminName: 'pear@foo.com', adminPassword: 'changeme' };
const userCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const testingData = {
  review: 'The food was great, however service was slow',
  name: 'TestName',
  changeHour: '7:00pm-12:00am',
  changeReview: '5',
  changeAddress: 'Hamilton Library',
  changeImage: 'https://www.gannett-cdn.com/media/2021/06/03/USATODAY/usatsports/imageForEntry18-8on.jpg?width=2560',
  changeDescription: 'Families own many different dogs, from mixed-breeds to purebreds, but which are the most popular? ' +
    'Purebred dog registry American Kennel Club has listed about 280 breeds on its website, and nearly 200 have made it into ' +
    'the organization’s popularity ranking.',
};
const testingProfileData = {
  name: 'TestName',
  changeProfileImage: 'https://www.gannett-cdn.com/media/2021/06/03/USATODAY/usatsports/imageForEntry18-8on.jpg?width=2560',
};

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.isLoggedIn(testController, userCredentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that user signup work', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, tempCredentials.username, tempCredentials.userPassword);
  await navBar.isLoggedIn(testController, tempCredentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that vendor signup work', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupVendor(testController, tempCredentials.adminName, tempCredentials.adminPassword);
  await navBar.isLoggedIn(testController, tempCredentials.adminName);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Testing the all restaurants page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoAllRestaurantsPage(testController);
  await allRestaurantsPage.isDisplayed(testController);
  await allRestaurantsPage.reviewModal(testController, testingData.review);
});

test('Testing the vendor verification page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoVendorVerificationPage(testController);
  await vendorVerificationPage.isDisplayed(testController);
  await vendorVerificationPage.editRestaurant(testController, testingData.name, testingData.changeHour, testingData.changeReview, testingData.changeAddress, testingData.changeImage, testingData.changeDescription);
});

test('Testing the user Profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoCreateProfilePage(testController);
  await userProfilePage.isDisplayed(testController);
  await userProfilePage.userProfile(testController, testingProfileData.name, testingProfileData.changeProfileImage);
});

test('Testing the vendor review page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoAllRestaurantsPage(testController);
  await allRestaurantsPage.isDisplayed(testController);
  await allRestaurantsPage.VendorIsDisplayed(testController);
});

test('Test that feeling lucky page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.userSignIn(testController, userCredentials.username, userCredentials.password);
  await navBar.gotoFeelingLuckyPage(testController);
  await feelingluckyPage.isDisplayed(testController);
});
