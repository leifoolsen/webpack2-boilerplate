const expect = require('chai').expect;

module.exports = function () {
  this.Given(/^I open the url "([^"]*)"$/, (url) => {
    browser.url(url); // eslint-disable-line no-undef
  });

  this.Then(/^I expect the title of the page to be "([^"]*)"$/, (title) => {
    expect(browser.getTitle()).to.be.eql(title); // eslint-disable-line no-undef
  });
};
