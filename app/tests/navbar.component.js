import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  /** Pull down login menu, go to All Restaurants page. */
  async gotoAllRestaurantsPage(testController) {
    await testController.click('#navbar-all-restaurants');
  }

  /** Pull down login menu, go to Vendor Verification page. */
  async gotoVendorVerificationPage(testController) {
    await testController.click('#navbar-vendor-verification');
  }

  /** Pull down login menu, go to Vendor Verification page. */
  async gotoCreateProfilePage(testController) {
    await testController.click('#navbar-edit-profile');
  }

  /** Pull down login menu, go to Vendor Verification page. */
  async gotoFeelingLuckyPage(testController) {
    await testController.click('#navbar-feeling-lucky');
  }
}

export const navBar = new NavBar();
