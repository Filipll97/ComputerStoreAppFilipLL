/* Bank Logic */
// declaring the dom objects 
const BtnLoanElement = document.getElementById("btn-loan");
const loanTextElement = document.getElementById("loan-text");
const bankBalanceElement = document.getElementById("bank-balance");
const loanBalanceElement = document.getElementById("loan-balance");

// setting initial bank balance
bankBalanceElement.textContent = 100;
let loanBalance = 0
let bankBalance = 100;
let maxLoan = bankBalance * 2;

// Get loan button logic
BtnLoanElement.addEventListener("click", function() {
    let loan = prompt("Please enter the amount you wish to loan: ");
    
    // Program so that the user can only enter numbers!
    let validAmount = true;
    while (validAmount) {
        if (!isNaN(Number(loan))) {
            loan = Number(loan);
            validAmount = false;    
        }
        else
            loan = prompt("Invalid amount!, please enter a number you wish to loan: ");
    }
    
    // Loan constrains logic 
    if (maxLoan > loan && bankBalance > 0)
    {
        loanBalance += loan;
        bankBalance += loan;
        maxLoan = bankBalance * 2;   

        // setting the new state of the DOM objects
        bankBalanceElement.textContent = bankBalance;
        loanBalanceElement.textContent = loanBalance;
        loanTextElement.classList.remove("hidden");
    }
    else
        alert(`Loan Invalid! The maximum amount you are able to loan is ${maxLoan}!`);
});
// TODO: add some sort of eventlistener that hide the loan text if balance is zero! 
console.log(`Your loan is: ${loanBalance} and your bank balance is: ${bankBalance} and the maximum amount you can loan is ${maxLoan}`);


/* Work Logic */ 
const salaryBalanceElement = document.getElementById("salary-balance");
const btnWorkElement = document.getElementById("btn-work");
const btnBankElement = document.getElementById("btn-bank"); 

let workBalance = 0;
let paybackAmount = 0;
let salary = 0;
const salaryAmount = 100;
 

// Work button logic
btnWorkElement.addEventListener("click", function () {
    workBalance += salaryAmount;
    salaryBalanceElement.textContent = workBalance;
});

// Bank logic
btnBankElement.addEventListener("click", function () {
    // check if user have a loan
    if (loanBalance != 0) {
        // TODO: Write logic that deduct the rest amount that can aper if the 
        // paybackAmount is bigger the loan!!
        console.log(workBalance);
        paybackAmount = workBalance * 0.1;
        workBalance -= paybackAmount;
        console.log(workBalance); // DEBUG: When clicking on bank two times the 
        // bankBalance get deducted the same amount you added the first time.
        
        // Update DOM
        bankBalanceElement.textContent = (bankBalance + workBalance);
        salaryBalanceElement.textContent = 0;
        workBalance = 0;
    }
})

