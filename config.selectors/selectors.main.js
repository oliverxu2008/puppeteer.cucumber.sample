module.exports = {
    homeLoanCalculator: {
        page_url_text: "personal/home-loans/calculators-tools/much-borrow/",
        page_title: "Home loan borrowing power calculator | ANZ",
        selector_ApplicationTypeSingle: "[for='application_type_single']",
        selector_ApplicationTypeJoint: "[for='application_type_joint']",
        selector_DependantsNumber: "[title='Number of dependants']",
        selector_BorrowTypeHome: "[for='borrow_type_home']",
        selector_BorrowTypeInvestment: "[for='borrow_type_investment']",
        selector_AnnualIncome: "[aria-labelledby='q2q1']",
        selector_AnnualOtherIncome: "[aria-labelledby='q2q2']",
        selector_MonthlyLivingExpense: "[aria-labelledby='q3q1']",
        selector_CurrentHomeLoanRepayments: "[aria-labelledby='q3q2']",
        selector_CurrentOtherLoanRepayments: "[aria-labelledby='q3q3']",
        selector_OtherMonthlyCommitments: "[aria-labelledby='q3q4']",
        selector_TotalCreditCardLimits: "[aria-labelledby='q3q5']",
        selector_BtnBorrowCalculator: "#btnBorrowCalculater",
        selector_BtnStartOver: ".start-over",
        selector_LoanEstimateResult: "#borrowResultTextAmount"
    }
}