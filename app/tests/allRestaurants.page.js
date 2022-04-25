import { Selector } from 'testcafe';

class AllRestaurantsPage {
  constructor() {
    this.pageId = '#all-Restaurants-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const allRestaurantsPage = new AllRestaurantsPage();
