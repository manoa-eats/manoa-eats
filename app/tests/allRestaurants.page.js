import { Selector } from 'testcafe';

class AllRestaurantsPage {
  constructor() {
    this.pageId = '#all-Restaurants-page';
    this.pageSelector = Selector(this.pageId);
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
}

export const allRestaurantsPage = new AllRestaurantsPage();
