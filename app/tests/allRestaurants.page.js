import { Selector } from 'testcafe';

class AllRestaurantsPage {
  constructor() {
    this.pageId = '#all-Restaurants-page';
    this.pageSelector = Selector(this.pageId);

    this.pageId2 = '#vendor-View-page';
    this.pageSelector2 = Selector(this.pageId2);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that review modal is working. */
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

  /** Asserts that this page is currently displayed. */
  async VendorIsDisplayed(testController) {
    const RestNameLink = Selector('#restName');
    await testController.hover(RestNameLink);
    await testController.click(RestNameLink);
    await testController.expect(this.pageSelector2.exists).ok();
  }

  async sortAlpha(testController) {
    const RestNameLink = Selector('#sort-alpha');
    await testController.hover(RestNameLink);
    await testController.click(RestNameLink);
  }

  async sortRating(testController) {
    const RestNameLink = Selector('#sort-rating');
    await testController.hover(RestNameLink);
    await testController.click(RestNameLink);
  }
}

export const allRestaurantsPage = new AllRestaurantsPage();
