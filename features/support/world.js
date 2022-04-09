const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

const config = require('../../lib/config')

// destructuring from the required module
const { click, select, typeText, getText, getValue } = require('../../lib/helpers')

const selectorConf = require('../../config.selectors/index')
var selectConfig = selectorConf.selectors

// asynchronous hooks and steps timeout
setDefaultTimeout(30 * 1000);

class CustomWorld {
    async launchBrowser() {
        this.browser = await puppeteer.launch( { 
            headless: config.isHeadless,
            slowMo : config.slowMo,
            devtools: config.isDevtools
        });
        this.page = await this.browser.newPage()
        await this.page.setDefaultTimeout(config.waitingTimeout)
        await this.page.setDefaultNavigationTimeout(config.navigationTimeout)
    }

    async closeBrowser() {
        this.browser.close()
    }

    async openLandingPage() {
        await this.page.goto(config.baseUrl)
        
        let url = await this.page.url()
        expect(url).contain(selectConfig.homeLoanCalculator.page_url_text)
        
        let title = await this.page.title()
        expect(title).contain(selectConfig.homeLoanCalculator.page_title)

        await this.page.waitFor(selectConfig.homeLoanCalculator.selector_BtnBorrowCalculator)
        await this.page.waitFor(2000)
    }

    async selectLoanApplicationType(applyType) {
        switch (applyType) {
            case "single":
                await click(this.page, selectConfig.homeLoanCalculator.selector_ApplicationTypeSingle)
                break;
            case "joint":
                await click(this.page, selectConfig.homeLoanCalculator.selector_ApplicationTypeJoint)
                break;
        }
        
    }

    async selectNumberofDependants(dependants) {
        await select(this.page, selectConfig.homeLoanCalculator.selector_DependantsNumber, dependants)    
    }

    async selectHomeLoanBorrowType(borrowType) {
        switch (borrowType) {
            case "selfLive":
                await click(this.page, selectConfig.homeLoanCalculator.selector_BorrowTypeHome)
                break;
            case "investment":
                await click(this.page, selectConfig.homeLoanCalculator.selector_BorrowTypeInvestment)
                break;
        }   
    }

    async setEarnings(earningType, earning) {
        switch (earningType) {
            case "annual income":
                await typeText(this.page, selectConfig.homeLoanCalculator.selector_AnnualIncome, earning)
                break;
            case "annual other income":
                await typeText(this.page, selectConfig.homeLoanCalculator.selector_AnnualOtherIncome, earning)
                break;
        }    
    }

    async setExpenses(expenseType, expense) {
        switch (expenseType) {
            case "monthly living expenses":
                await typeText(this.page, selectConfig.homeLoanCalculator.selector_MonthlyLivingExpense, expense)
                break;
            case "current home loan monthly replayments":
                await typeText(this.page, selectConfig.homeLoanCalculator.selector_CurrentHomeLoanRepayments, expense)
                break;
            case "other loan monthly repayments":
                await typeText(this.page, selectConfig.homeLoanCalculator.selector_CurrentOtherLoanRepayments, expense)
                break;
            case "other monthly commitments":
                await typeText(this.page, selectConfig.homeLoanCalculator.selector_OtherMonthlyCommitments, expense)
                break;
            case "total credit card limits":
                await typeText(this.page, selectConfig.homeLoanCalculator.selector_TotalCreditCardLimits, expense)
                break;
        }    
    }

    async clickButton(btnName) {
        switch (btnName) {
            case "Work out how much I could borrow":
                await click(this.page, selectConfig.homeLoanCalculator.selector_BtnBorrowCalculator)
                break;
            case "Start over":
                await click(this.page, selectConfig.homeLoanCalculator.selector_BtnStartOver)
                break;
        } 
           
    }

    async checkLoanEstimateResult(expectedEstimate) {
        await this.page.waitFor(5000) // force wait before checking the result 

        await this.page.waitForSelector(selectConfig.homeLoanCalculator.selector_LoanEstimateResult)
        let loanEstimateResult = await this.page.$eval(selectConfig.homeLoanCalculator.selector_LoanEstimateResult, el => el.textContent)
        expect(loanEstimateResult).to.eql(expectedEstimate)
    }

    async checkPageIsReset() {
        await this.page.waitFor(2000) // force wait before checking the result 

        let annualIncome = await getValue(this.page, '[aria-labelledby="q2q1"]')
        expect(annualIncome).to.eql('0')

        let otherAnnualIncome = await getValue(this.page, '[aria-labelledby="q2q2"]')
        expect(otherAnnualIncome).to.eql('0')

        let loanEstimateResult = await getText(this.page, '#borrowResultTextAmount')
        expect(loanEstimateResult).to.eql('$0')
    }

}

setWorldConstructor(CustomWorld);