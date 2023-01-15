import fetchPosts from "./posts.js";
import postsView from "./postsView.js";
/* Bank Logic */
// Declaring the dom objects 
const BtnLoanElement = document.getElementById("btn-loan");
const loanTextElement = document.getElementById("loan-text");
const btnPayLoanElement = document.getElementById("btn-repay");
let bankBalanceElement = document.getElementById("bank-balance");
let loanBalanceElement = document.getElementById("loan-balance");
let maxLoanLimit; 

// Setting initial bank balances
bankBalanceElement.textContent = 0;

// Get loan button logic
BtnLoanElement.addEventListener("click", function() {
    if (Number(loanBalanceElement.textContent) > 0)
        alert(`You have to repay the current loan before applying for a new loan!`);
    else {
        loanBalanceElement.textContent = prompt("Please enter the amount you wish to loan:");

        // Setting maxLoanLimit
        if (Number(bankBalanceElement.textContent) === 0) {
            maxLoanLimit = 200;
        }
        else {
            maxLoanLimit = Number(bankBalanceElement.textContent) * 2; 
        }

        // Ensures that the user only input numbers and valid amount  
        let validAmount = true;
        while (validAmount) 
        {
            if (!isNaN(Number(loanBalanceElement.textContent)) && maxLoanLimit >= Number(loanBalanceElement.textContent)) 
                validAmount = false;   
            else if (isNaN(Number(loanBalanceElement.textContent)))
                loanBalanceElement.textContent = prompt("Invalid amount, needs to be a number! Amount: ");
            else
                loanBalanceElement.textContent = prompt(`Loan Invalid! The maximum loan limit is ${maxLoanLimit}! Enter a lower amount: `);
        }
        
        bankBalanceElement.textContent = (Number(bankBalanceElement.textContent) + Number(loanBalanceElement.textContent));
        
        
        if (Number(loanBalanceElement.textContent) != 0) 
            loanTextElement.classList.remove("hidden");
            btnPayLoanElement.classList.remove("hidden");
    }
});

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
    
    // hide Loan balance and repay button
    if (Number(loanBalanceElement.textContent) === 0) {
        loanTextElement.classList.add("hidden");
        btnPayLoanElement.classList.add("hidden");
    }
});

// Repay button logic 
btnPayLoanElement.addEventListener("click", function () {
    if (loanBalanceElement.textContent != 0) {
        // Update DOM
        salaryBalanceElement.textContent = 0; 
        
        // if the payback amount is larger then the loan amount the rest goes to balance!
        if (workBalance > Number(loanBalanceElement.textContent)) {
            bankBalanceElement.textContent = Number(bankBalanceElement.textContent) + (workBalance - Number(loanBalanceElement.textContent));
            loanBalanceElement.textContent = 0
        }
        else {
            loanBalanceElement.textContent = Number(loanBalanceElement.textContent) - workBalance;
            bankBalanceElement.textContent = Number(bankBalanceElement.textContent) - workBalance;
        }
        // Reset variables
        workBalance = 0;
    }
    
    // hide Loan balance and repay button
    if (Number(loanBalanceElement.textContent) === 0) {
        loanTextElement.classList.add("hidden");
        btnPayLoanElement.classList.add("hidden");
    }
});



/* Showcase section logic */
const btnPuyProductElement = document.getElementById("btn-buy-product");

// Buy laptop button logic 
btnPuyProductElement.addEventListener("click", function () {
    // TODO: add logic to prevent user to buy products that user cant afford! 
    // And integrate the Web API, to get the right product price!
    let productPrice = 100;
    if (Number(bankBalanceElement.textContent) >= productPrice) {
        bankBalanceElement.textContent = Number(bankBalanceElement.textContent) - 100;
        alert("Congratulations on purchases of a new laptop!");
    }
    else {
        alert("Bank balance insufficient for selected product!");
    }
});


/* Laptop info section */
// API logic
const testApiData = document.getElementById("test-API-Data");

const initialPosts = await fetchPosts();
postsView.setPost(initialPosts);

renderActivePosts();

function renderActivePosts() {
    const activePosts = postsView.getPosts();
    let laptopSpecs;
    console.log(activePosts)

    for (const activePost of activePosts) {
        // TODO: clean this code upp and implement som the select html element select can select title and that tilte is pair to its id and specs!
        testApiData.textContent = laptopSpecs;
        laptopSpecs = testAPItoHtml(activePost.specs);
    }
    console.log(laptopSpecs);

}

console.log(initialPosts);
function testAPItoHtml (apiInfo) {
    let dataInfo = ""; 
    for (const element of apiInfo) {
        dataInfo += element + "\n"; 
    }
    return dataInfo;
}
