/* eslint-disable no-undef */

const expect = require('chai').expect;

module.exports = function () {
  this.Given(/^I open the url "([^"]*)"$/, (url) => {
    browser.url(url); // eslint-disable-line no-undef
  });

  this.Then(/^I expect the title of the page to be "([^"]*)"$/, (title) => {
    expect(browser.getTitle()).to.be.eql(title); // eslint-disable-line no-undef
  });

  this.When(/^I click the Ping button$/, () => {
    browser.click('#btn-ping');
  });

  this.Then(/^I expect the response to be "([^"]*)"$/, (response) => {

    browser.waitUntil(() => {
      return browser.getText('#ping-response').indexOf(response) >= 0;
    }, 5000, 'expected ping to return pong');

  });
};
