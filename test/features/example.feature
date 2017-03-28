Feature: Title check
  I should be able to use Cucumber with WDIO

  Scenario: Get the title of webpage
    Given I open the url "http://localhost:8082/"
    Then I expect the title of the page to be "Webpack2 Boilerplate"

  Scenario: Click the Ping button
    Given I open the url "http://localhost:8082/"
    When I click the Ping button
    Then I expect the response to be "pong!"
