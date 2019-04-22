import { When, Then, AfterAll, Before } from 'cucumber'
import { World } from './world'
import { expect } from 'chai'
import { webDriver } from './selenium'

Before(async function() {
  const world = this as World
  await world.navigate()  
})

When('I search google for {string}', async function(term: string) {
  const world = this as World
  await world.search(term)
})

Then('I should see a result from wikipedia about {string} with a title of {string}', async function(about: string, title: string) {
  const world = this as World
  const term = await world.searchTerm()
  expect(term).to.equal(about)
  const wiki = await world.wikipedia()
  expect(wiki).to.equal(title)
})

AfterAll(async function() {
  await webDriver.close()
  await webDriver.quit()
})