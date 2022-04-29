import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#userProfile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async userProfile(testController, name, image) {
    const createUserProfileName = Selector('#userFormName');
    await testController.hover(createUserProfileName);
    await testController.click(createUserProfileName);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(createUserProfileName, name);

    const createUserProfileImage = Selector('#userFormImage');
    await testController.hover(createUserProfileImage);
    await testController.click(createUserProfileImage);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(createUserProfileImage, image);
    await testController.click('#profile-submit');
  }
}

export const userProfilePage = new UserProfilePage();
