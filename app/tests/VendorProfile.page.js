import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#editVendorProfile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async editVendorProfile(testController, name, image) {
    const EditVendorProfileName = Selector('#vendorFormName');
    await testController.hover(EditVendorProfileName);
    await testController.click(EditVendorProfileName);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(EditVendorProfileName, name);

    const editVendorProfileImage = Selector('#vendorFormImage');
    await testController.hover(editVendorProfileImage);
    await testController.click(editVendorProfileImage);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(editVendorProfileImage, image);
    await testController.click('#submitEditVendor');
  }

}

export const vendorProfilePage = new UserProfilePage();
