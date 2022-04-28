import { Selector } from 'testcafe';

class VendorVerification {
  constructor() {
    this.pageId = '#vendor-Verification-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that edit restaurants is working. */
  async editRestaurant(testController, changeName, changeHour, changeReview, changeAddress, changeImage, changeDescription) {
    const adminEditRestaurantButton = Selector('#editRestaurantButton');
    await testController.hover(adminEditRestaurantButton);
    await testController.click(adminEditRestaurantButton);

    const adminEditRestaurantName = Selector('#uniforms-0000-0000');
    await testController.hover(adminEditRestaurantName);
    await testController.click(adminEditRestaurantName);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(adminEditRestaurantName, changeName);

    const adminEditRestaurantImage = Selector('#uniforms-0000-0001');
    await testController.hover(adminEditRestaurantImage);
    await testController.click(adminEditRestaurantImage);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(adminEditRestaurantImage, changeImage);

    const adminEditRestaurantAddress = Selector('#uniforms-0000-0002');
    await testController.hover(adminEditRestaurantAddress);
    await testController.click(adminEditRestaurantAddress);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(adminEditRestaurantAddress, changeAddress);

    const adminEditRestaurantDescription = Selector('#uniforms-0000-0003');
    await testController.hover(adminEditRestaurantDescription);
    await testController.click(adminEditRestaurantDescription);
    await testController.pressKey('ctrl+a delete');
    await testController.typeText(adminEditRestaurantDescription, changeDescription);
    await testController.click('#submitNewRestaurantInformation');

    // const adminEditRestaurantHour = Selector('#uniforms-0000-0001');
    // await testController.hover(adminEditRestaurantHour);
    // await testController.click(adminEditRestaurantHour);
    // await testController.pressKey('ctrl+a delete');
    // await testController.typeText(adminEditRestaurantHour, changeHour);
    //
    // const adminEditRestaurantReview = Selector('#uniforms-0000-0002');
    // await testController.hover(adminEditRestaurantReview);
    // await testController.click(adminEditRestaurantReview);
    // await testController.pressKey('ctrl+a delete');
    // await testController.typeText(adminEditRestaurantReview, changeReview);

  }
}

export const vendorVerificationPage = new VendorVerification();
