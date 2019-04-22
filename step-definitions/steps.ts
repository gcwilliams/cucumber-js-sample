import { When, Then, AfterAll } from 'cucumber'
import { World } from './world'
import { expect } from 'chai'
import { webDriver } from './selenium';

When('I search google for cats', async function() {
  const world = this as World
  await world.navigate()
  await world.type('cats')
  await world.search()
})

Then('I should see a result from wikipedia about cats', async function() {
  const world = this as World
  const term = await world.searchTerm()
  expect(term).to.equal('cats')
  const wiki = await world.wikipedia()
  expect(wiki).to.equal('Cat')
})

When('I search google for dogs', async function() {
  const world = this as World
  await world.navigate()
  await world.type('dogs')
  await world.search()
})

Then('I should see a result from wikipedia about dogs', async function() {
  const world = this as World
  const term = await world.searchTerm()
  expect(term).to.equal('dogs')
  const wiki = await world.wikipedia()
  expect(wiki).to.equal('Dog')
})

AfterAll(async function() {
  await webDriver.close()
  await webDriver.quit()
})