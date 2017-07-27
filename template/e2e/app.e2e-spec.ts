import { SeednewsPage } from './app.po';

describe('seednews App', () => {
  let page: SeednewsPage;

  beforeEach(() => {
    page = new SeednewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
