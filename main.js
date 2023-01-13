/* Bank Logic */

// Declaring the dom objects 
const BtnLoanElement = document.getElementById("btn-loan");
const loanTextElement = document.getElementById("loan-text");
let bankBalanceElement = document.getElementById("bank-balance");
let loanBalanceElement = document.getElementById("loan-balance");

// Setting initial bank balance and max loan limit
bankBalanceElement.textContent = 100;
let maxLoanLimit = Number(bankBalanceElement.textContent) * 2; 

// Get loan button logic
BtnLoanElement.addEventListener("click", function() {
    if (Number(loanBalanceElement.textContent) > 0)
        alert(`You have to repay the current loan before applying for a new loan!`);
    else {
        loanBalanceElement.textContent = prompt("Please enter the amount you wish to loan:");
        // Ensures that the user only input numbers and valid amount  
        let validAmount = true;
        while (validAmount) 
        {
            if (!isNaN(Number(loanBalanceElement.textContent)) && maxLoanLimit > Number(loanBalanceElement.textContent)) 
                validAmount = false;   
            else if (isNaN(Number(loanBalanceElement.textContent)))
                loanBalanceElement.textContent = prompt("Invalid amount, needs to be a number! Amount: ");
            else
                loanBalanceElement.textContent = prompt(`Loan Invalid! The maximum loan limit is ${maxLoanLimit}! Enter a lower amount: `);
        }
        
        bankBalanceElement.textContent = (Number(bankBalanceElement.textContent) + Number(loanBalanceElement.textContent));
        // Setting new maxLoanLimit
        maxLoanLimit = Number(bankBalanceElement.textContent) * 2; 
        
        if (Number(loanBalanceElement.textContent) != 0) 
            loanTextElement.classList.remove("hidden");
    }
});

// TODO: add some sort of eventlistener that hide the loan text if balance is zero! 
console.log(`Your loan is: ${loanBalanceElement.textContent} and your bank balance is: ${bankBalanceElement.textContent} and the maximum amount you can loan is ${maxLoanLimit}`);


/* Work Logic */ 

const salaryBalanceElement = document.getElementById("salary-balance");
const btnWorkElement = document.getElementById("btn-work");
const btnBankElement = document.getElementById("btn-bank"); 

// Setting initial balance
salaryBalanceElement.textContent = 0;
let workBalance = 0;
let paybackAmount = 0;
const salaryAmount = 100;
 

// Work button logic
btnWorkElement.addEventListener("click", function () {
    workBalance += salaryAmount;
    salaryBalanceElement.textContent = Number(salaryBalanceElement.textContent) + salaryAmount;
});

// Bank button logic
btnBankElement.addEventListener("click", function () {
    // check if user have a loan
    if (loanBalanceElement.textContent != 0) {
        paybackAmount = workBalance * 0.1;
        workBalance -= paybackAmount;
        
        // Update DOM
        bankBalanceElement.textContent = Number(bankBalanceElement.textContent) + workBalance;
        salaryBalanceElement.textContent = 0; 
        
        // if the payback amount is larger then the loan amount the rest goes to balance!
        if (paybackAmount > Number(loanBalanceElement.textContent)) {
            bankBalanceElement.textContent = Number(bankBalanceElement.textContent) + (paybackAmount - Number(loanBalanceElement.textContent));
            loanBalanceElement.textContent = 0
        }
        else {
            loanBalanceElement.textContent = Number(loanBalanceElement.textContent) - paybackAmount;
        }
        
        // Reset variables
        workBalance = 0;
        paybackAmount = 0;
    }
    else {
        bankBalanceElement.textContent = Number(bankBalanceElement.textContent) + workBalance;
        salaryBalanceElement.textContent = 0;
        workBalance = 0;
    }
})




/*
/* Work Logic  
const salaryBalanceElement = document.getElementById("salary-balance");
const btnWorkElement = document.getElementById("btn-work");
const btnBankElement = document.getElementById("btn-bank"); 

// Setting initial balance
salaryBalanceElement.textContent = 0;
let workBalance = 0;
let paybackAmount = 0;
const salaryAmount = 100;
 

// Work button logic
btnWorkElement.addEventListener("click", function () {
    workBalance += salaryAmount;
    salaryBalanceElement.textContent = Number(salaryBalanceElement.textContent) + salaryAmount;
});

// Bank logic
btnBankElement.addEventListener("click", function () {
    // check if user have a loan
    if (loanBalanceElement.textContent != 0) {
        paybackAmount = workBalance * 0.1;
        workBalance -= paybackAmount;
        
        // Update DOM
        bankBalanceElement.textContent = Number(bankBalanceElement.textContent) + workBalance;
        salaryBalanceElement.textContent = 0; 
        
        // if the payback amount is larger then the loan amount the rest goes to balance!
        if (paybackAmount > Number(loanBalanceElement.textContent)) {
            bankBalanceElement.textContent = Number(bankBalanceElement.textContent) + (paybackAmount - Number(loanBalanceElement.textContent));
            loanBalanceElement.textContent = 0
        }
        else {
            loanBalanceElement.textContent = Number(loanBalanceElement.textContent) - paybackAmount;
        }
        
        // Reset variables
        workBalance = 0;
        paybackAmount = 0;
    }
    else {
        bankBalanceElement.textContent = Number(bankBalanceElement.textContent) + workBalance;
        salaryBalanceElement.textContent = 0;
        workBalance = 0;
    }
})



*/