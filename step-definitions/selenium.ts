import { Builder, WebDriver, WebElementCondition, By, WebElementPromise, Navigation, ActionSequence, promise } from 'selenium-webdriver'

export const webDriver: WebDriver = new Builder().forBrowser('chrome').build()

export function navigation() {
  return (target: any, propertyKey: string): any => ({ get: (): Navigation => webDriver.navigate() })
}

export function actions() {
  return (target: any, propertyKey: string): any => ({ get: (): ActionSequence => webDriver.actions() })
}

export function element(by: By, condition?: WebElementCondition) {
  return (target: any, propertyKey: string): any => ({
    get: (): WebElementPromise => webDriver.wait(condition || createDefaultCondition(propertyKey, by), 5000)
  })
}

export function screenshot() {
  return (target: any, propertyKey: string): any => ({ get: (): promise.Promise<string> => webDriver.takeScreenshot() })
}

function createDefaultCondition(name: string, by: By) {
  return new WebElementCondition(name, async (driver: WebDriver) => {
    try {
      const el = await driver.findElement(by)
      const displayed = await el.isDisplayed()
      const isReady = displayed && await el.isEnabled()
      return isReady ? el : null
    } catch (err) {
      return null
    }
  })
}