import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#AddMenuItem-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async vendorCreateMenu(testController, name) {
    const addMenuItemName = Selector('#menuFoodName');
    await testController.hover(addMenuItemName);
    await testController.click(addMenuItemName);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(addMenuItemName, name);

    const addMenuItemPrice = Selector('#menuFoodPrice');
    await testController.hover(addMenuItemPrice);
    await testController.click(addMenuItemPrice);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(addMenuItemPrice, '5', { paste: true });

    await testController.click('#submitMenuVendor');
  }
}

export const vendorMenuPage = new UserProfilePage();
