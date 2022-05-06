import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#ViewMenuItem-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that edit restaurants is working. */
  async editMenuItem(testController) {
    const clickEdit = Selector('#editMenuItem');
    await testController.hover(clickEdit);
    await testController.click(clickEdit);

    const addMenuItemName = Selector('#editMenuFoodName');
    await testController.hover(addMenuItemName);
    await testController.click(addMenuItemName);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(addMenuItemName, 'changeName');

    const addMenuItemPrice = Selector('#editMenuFoodPrice');
    await testController.hover(addMenuItemPrice);
    await testController.click(addMenuItemPrice);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(addMenuItemPrice, '3', { paste: true });

    await testController.click('#submitNewMenuVendor');
  }

  async removeMenuItem(testController) {
    const clickEdit = Selector('#removeMenuItem');
    await testController.hover(clickEdit);
    await testController.click(clickEdit);
  }
}

export const vendorViewMenuPage = new UserProfilePage();
