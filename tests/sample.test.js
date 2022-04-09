// Same test automation scenario, however with integration to configuration, helper, etc

const puppeteer = require('puppeteer')
const expect = require('chai').expect
const config = require('../lib/config')

// destructuring from the required module
const { click, typeText, select, getText, getValue } = require('../lib/helpers')

describe('Home Loan Calculator Web Test', () => {
    let browser
    let page
    const baseUrl = config.baseUrl

    before(async function() {
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            defaultViewport: config.defaultViewport
        })

        page = await browser.newPage()       
        await page.setDefaultTimeout(config.waitingTimeout)
        await page.setDefaultNavigationTimeout(config.navigationTimeout)
    })

    after(async function() {
        await browser.close()
    })

    

    it('Test 1 - Calculate Home Loan', async function() {
        await page.goto(baseUrl)
        let url = await page.url()

        // verify landing page is loaded successfully
        expect(url).contain('personal/home-loans/calculators-tools/much-borrow/')
        
        let title = await page.title()
        expect(title).contain('Home loan borrowing power calculator | ANZ')

        await page.waitFor("#btnBorrowCalculater")

        await page.waitFor(2000)

        // application type - single or joint
        await page.waitForSelector("[for='application_type_single']")
        await click(page, "[for='application_type_single']")

        // borrow type - home or investment
        await select(page, "[title='Number of dependants']", '0')
        await click(page, "[for='borrow_type_home']")

        // annual income
        await typeText(page, "[aria-labelledby='q2q1']", '80000')

        // annual other income
        await typeText(page, "[aria-labelledby='q2q2']", '10000')

        // monthly living expense
        await typeText(page, "[aria-labelledby='q3q1']", '500')

        // current home loan monthly repayments
        await typeText(page, "[aria-labelledby='q3q2']", '0')

        // other loan monthly repayments
        await typeText(page, "[aria-labelledby='q3q3']", '100')

        // other monthly commitments
        await typeText(page, "[aria-labelledby='q3q4']", '0')

        // total credit card limits
        await typeText(page, "[aria-labelledby='q3q5']", '10000')

        // click the submit button
        await click(page, "#btnBorrowCalculater")

        // force pause, otherwise we'll not able to get valid result
        await page.waitFor(5000)

        // Check the loan estimate result
        await page.waitForSelector("#borrowResultTextAmount")
        let loanEstimateResult = await page.$eval("#borrowResultTextAmount", el => el.textContent)
        expect(loanEstimateResult).to.eql('$542,000')

    })

    it('Test 2 - click Start over to reset the page', async function() {
        
        // click "start-over" button
        await click(page, ".start-over")

        // verify page has been reset
        await page.waitFor(2000)

        let annualIncome = await getValue(page, "[aria-labelledby='q2q1']")
        expect(annualIncome).to.eql('0')

        let otherAnnualIncome = await getValue(page, "[aria-labelledby='q2q2']")
        expect(otherAnnualIncome).to.eql('0')

        let loanEstimateResult = await getText(page, "#borrowResultTextAmount")
        expect(loanEstimateResult).to.eql('$0')
        
    })


})