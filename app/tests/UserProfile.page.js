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
    const createUserProfileName = Selector('#uniforms-0000-0000');
    await testController.hover(createUserProfileName);
    await testController.click(createUserProfileName);
    await testController.typeText(createUserProfileName, name);

    const createUserProfileImage = Selector('#uniforms-0000-0001');
    await testController.hover(createUserProfileImage);
    await testController.click(createUserProfileImage);
    await testController.typeText(createUserProfileImage, image);

    const foodSelect = Selector('#PreferredFoodSelections');
    const foodOptions = foodSelect.find('option');
    await testController.click(foodSelect);
    await testController.click(foodOptions.withText('burger'));
    await testController.expect(foodSelect.value).eql('burger');

    await testController.click('#profile-submit');
  }
}

export const userProfilePage = new UserProfilePage();
