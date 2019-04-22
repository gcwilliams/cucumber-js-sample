import { setDefaultTimeout, setWorldConstructor } from 'cucumber'
import { By, WebElementPromise, Navigation, ActionSequence } from 'selenium-webdriver'
import { element, navigation, actions, screenshot } from './selenium'

type WorldParams = { attach: Function, parameters: {[key: string]: any} }

export class World {

  @navigation()
  private navigation: Navigation

  @actions()
  private actions: ActionSequence

  @screenshot()
  private screenshot: Promise<string>

  @element(By.name('q'))
  private term: WebElementPromise

  @element(By.name('btnK'))
  private searchButton: WebElementPromise

  @element(By.xpath('//a[contains(@href, \'wikipedia\')]'))
  private wiki: WebElementPromise

  @element(By.css('.firstHeading'))
  private wikiHeading: WebElementPromise

  constructor(private params: WorldParams) { }

  async navigate(): Promise<void> {
    await this.navigation.to('https://www.google.co.uk')
  }

  async type(text: string): Promise<void> {
    await this.term.sendKeys(text)
  }

  async search(): Promise<void> {
    await this.searchButton.click()
  }

  async searchTerm(): Promise<string> {
    return await this.term.getAttribute('value')
  }

  async wikipedia(): Promise<string> {
    const el = await this.wiki
    await this.actions.mouseDown(el).click().perform()
    const text = await this.wikiHeading.getText()
    this.params.attach(await this.screenshot, 'image/png')
    return text
  }
}

setWorldConstructor(World)
setDefaultTimeout(20 * 1000)