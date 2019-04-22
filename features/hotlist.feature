Feature: SeleniumJS
  
  Scenario: Search google for cats
    When I search google for 'cats'
    Then I should see a result from wikipedia about 'cats' with a title of 'Cat'

  Scenario: Search google for dogs
    When I search google for 'dogs'
    Then I should see a result from wikipedia about 'dogs' with a title of 'Dog'