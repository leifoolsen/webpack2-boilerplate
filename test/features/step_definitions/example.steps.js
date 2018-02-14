/*eslint no-undef: "error"*/
/*eslint-env browser*/

import {defineSupportCode} from 'cucumber';
import {expect} from 'chai';

defineSupportCode(function({Given, Then, When}) {
  Given(/^I open the url "([^"]*)"$/, (url) => {
    browser.url(url); // eslint-disable-line no-undef
  });

  Then(/^I expect the title of the page to be "([^"]*)"$/, (title) => {
    expect(browser.getTitle()).to.be.eql(title); // eslint-disable-line no-undef
  });

  When(/^I click the Ping button$/, () => {
    browser.click('#btn-ping');
  });

  Then(/^I expect the response to be "([^"]*)"$/, (response) => {
    browser.waitUntil(() => {
      return browser.getText('#ping-response').indexOf(response) >= 0;
    }, 5000, 'expected ping to return pong');
  });
});
