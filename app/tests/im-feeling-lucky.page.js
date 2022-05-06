import { Selector } from 'testcafe';

class FeelingLuckyPage {
  constructor() {
    this.pageId = '#im-Feeling-Hungry-page';
    this.pageSelector = Selector(this.pageId);

    this.pageId2 = '#vendor-View-page';
    this.pageSelector2 = Selector(this.pageId2);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Asserts that the view vendor restaurants page is working. */
  async VendorIsDisplayed(testController) {
    const RestNameLink = Selector('#restName');
    await testController.hover(RestNameLink);
    await testController.click(RestNameLink);
    await testController.expect(this.pageSelector2.exists).ok();
  }

  /** Asserts that the modal button works. */
  async reviewModal(testController, review) {
    const reviewButton = Selector('#reviewButton');
    await testController.hover(reviewButton);
    await testController.click(reviewButton);

    const addReview = Selector('#addAReview');
    await testController.hover(addReview);
    await testController.click(addReview);
    await testController.typeText(addReview, review);
    await testController.click('#submitReview');
  }
}

export const feelingluckyPage = new FeelingLuckyPage();
