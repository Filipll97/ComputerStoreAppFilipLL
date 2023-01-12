const bankBtnElement = document.getElementById("btn-loan");
const bankElementBalance = document.getElementById("bank-balance");

// setting initial bank balance
bankElementBalance.textContent = 100;
let loanBalance = 0
let bankBalance = 100;
let maxLoan = bankBalance * 2;

// Get loan button logic
bankBtnElement.addEventListener("click", function() {
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
    
    // Loan constrains 
    if (maxLoan > loan && bankBalance > 0)
    {
        loanBalance += loan;
        bankBalance += loan;
        maxLoan = bankBalance * 2;   
        bankElementBalance.textContent = bankBalance;
    }
    else
        alert("You are not able to take a loan!");
        console.log(`Your loan is: ${loanBalance} and your bank balance is: ${bankBalance} and the maximum amount you can loan is ${maxLoan}`);
    })
    
console.log(`Your loan is: ${loanBalance} and your bank balance is: ${bankBalance} and the maximum amount you can loan is ${maxLoan}`);