import { Module2Page } from './app.po';

describe('module2 App', function() {
  let page: Module2Page;

  beforeEach(() => {
    page = new Module2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
