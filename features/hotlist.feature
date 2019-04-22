Feature: SeleniumJS
  
  Scenario: Search google for cats
    When I search google for cats
    Then I should see a result from wikipedia about cats

  Scenario: Search google for dogs
    When I search google for dogs
    Then I should see a result from wikipedia about dogs