Feature: Estimate how much I could borrow
I can access the loan calculator webpage
I can set my income and expenses
I can get a quick estimate on how much I am able to borrow
I can click a button to start over

@SmokeTest
Scenario Outline: Enter existing financial conditions to calculate the loan estimate
    Given I am on the loan calculator webpage
     When I select home loan Application Type as <ApplyType>
     Then I select number of dependants as <Dependants>
     Then I select home loan borrow type as <BorrowType>
     Then I set earning "annual income" as <Income>
     Then I set earning "annual other income" as <OtherIncome>
     Then I set expense "monthly living expenses" as <LivingExpense>
     Then I set expense "current home loan monthly replayments" as <CurrentHomeLoanPayment>
     Then I set expense "other loan monthly repayments" as <OtherLoanPayment>
     Then I set expense "other monthly commitments" as <OtherCommitment>
     Then I set expense "total credit card limits" as <TotalCreditCardLimit>
     Then I click the button "Work out how much I could borrow"
     Then I should see the loan estimate result as <ExpectedEstimate>
     Then I click the button "Start over"
     Then I can see the page has been reset

    Examples: 
      | ApplyType | Dependants | BorrowType   | Income | OtherIncome | LivingExpense | CurrentHomeLoanPayment | OtherLoanPayment | OtherCommitment | TotalCreditCardLimit | ExpectedEstimate |
      | single    | 0          | selfLive     | 80000  | 10000       | 500           | 0                      | 100              | 0               | 10000                | $542,000         |

@SmokeTest
Scenario Outline: Click Start-over to reset the page
    Given I am on the loan calculator webpage
     When I select home loan Application Type as <ApplyType>
     Then I select number of dependants as <Dependants>
     Then I select home loan borrow type as <BorrowType>
     Then I set earning "annual income" as <Income>
     Then I set earning "annual other income" as <OtherIncome>
     Then I click the button "Start over"
     Then I can see the page has been reset

    Examples: 
      | ApplyType | Dependants | BorrowType   | Income | OtherIncome |
      | single    | 0          | selfLive     | 80000  | 10000       |
