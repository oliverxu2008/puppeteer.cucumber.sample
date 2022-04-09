const { Given, When, Then, Before, After } = require('cucumber');

Before(async function() {
    return await this.launchBrowser();
});

After(async function() {
    return await this.closeBrowser();
});

Given(/^I am on the loan calculator webpage$/, async function () {
    return await this.openLandingPage();
});

When(/^I select home loan Application Type as (.+)$/, async function (applyType) {
    return await this.selectLoanApplicationType(applyType);
});

Then(/^I select number of dependants as (.+)$/, async function (dependants) {
    return await this.selectNumberofDependants(dependants);
});

Then(/^I select home loan borrow type as (.+)$/, async function (borrowType) {
    return await this.selectHomeLoanBorrowType(borrowType);
});

Then(/^I set earning \"([^\"]*)\" as (.+)$/, async function (earningType, earning) {
    return await this.setEarnings(earningType, earning);
});

Then(/^I set expense \"([^\"]*)\" as (.+)$/, async function (expenseType, expense) {
    return await this.setExpenses(expenseType, expense);
});

Then(/^I click the button \"([^\"]*)\"$/, async function (btnName) {
    return await this.clickButton(btnName);
});

Then(/^I should see the loan estimate result as (.+)$/, async function (expectedEstimate) {
    return await this.checkLoanEstimateResult(expectedEstimate);
});

Then(/^I can see the page has been reset$/, async function () {
    return await this.checkPageIsReset();
});

