import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);

    this.pageId2 = '#vendor-View-page';
    this.pageSelector2 = Selector(this.pageId2);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async displayRest(testController) {
    const reviewButton = Selector('#landing-view-Rest-button');
    await testController.hover(reviewButton);
    await testController.click(reviewButton);
    await testController.wait(10000).expect(this.pageSelector2.exists).ok();
  }
}

export const landingPage = new LandingPage();
