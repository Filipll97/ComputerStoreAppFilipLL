import fetchPosts from "./posts.js";
import postsView from "./postsView.js";

// Declaring: Get Loan section dom objects 
const BtnLoanElement = document.getElementById("btn-loan");
const loanTextElement = document.getElementById("loan-text");
const btnPayLoanElement = document.getElementById("btn-repay");
const bankBalanceElement = document.getElementById("bank-balance");
const loanBalanceElement = document.getElementById("loan-balance");

// Declaring: Work section dom objects 
const salaryBalanceElement = document.getElementById("salary-balance");
const btnWorkElement = document.getElementById("btn-work");
const btnBankElement = document.getElementById("btn-bank"); 

// Declaring: Laptop info section dom objects
const selectLaptopElement = document.getElementById("products-laptop");
const laptopFeaturesElement = document.getElementById("laptop-features");
const laptopImgElement = document.getElementById("product-img");
const laptopDescriptionElement = document.getElementById("laptop-description");
const laptopHeadingDescriptionElement = document.getElementById("laptop-heading-description");

// Declaring: Showcase section dom objects
const btnPuyProductElement = document.getElementById("btn-buy-product");
const laptopPriceTextElement = document.getElementById("laptop-price");

/* Bank Logic */
// Setting initial bank balances and initializing max loan limit
let maxLoanLimit; 
bankBalanceElement.textContent = 0;

function toggleDomElements (toggleMode) {
    if (toggleMode == "hide") {
        loanTextElement.classList.add("hidden");
        btnPayLoanElement.classList.add("hidden");
    }
    else if (toggleMode === "add") {
        loanTextElement.classList.remove("hidden");
        btnPayLoanElement.classList.remove("hidden");
    }
}
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
        // Updates the user bank balance
        bankBalanceElement.textContent = (Number(bankBalanceElement.textContent) + Number(loanBalanceElement.textContent));
        
        // Hides the loan balance text and repay loan button if 
        if (Number(loanBalanceElement.textContent) != 0) 
            toggleDomElements("add");
    }
});

/* Work Logic */ 
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
    if (Number(loanBalanceElement.textContent) === 0)
        toggleDomElements("hide");
    
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
            bankBalanceElement.innerHTML = 0
        }
        // Reset variables
        workBalance = 0;
    }
    
    // hide Loan balance and repay button
    if (Number(loanBalanceElement.textContent) === 0) 
        toggleDomElements("hide");
    
});

/* Showcase section logic */
// Buy laptop button logic 
btnPuyProductElement.addEventListener("click", function () { 
    let productPrice = Number(laptopPriceTextElement.innerHTML);
    if (Number(bankBalanceElement.textContent) >= productPrice) {
        bankBalanceElement.textContent = Number(bankBalanceElement.textContent) - productPrice;
        alert("Congratulations on purchases of a new laptop!");
    }
    else {
        alert("Bank balance insufficient for selected product!");
    }
});

/* Laptop info section */
// API logic
const initialPosts = await fetchPosts();
postsView.setPost(initialPosts);
const laptopsData = postsView.getPosts();

// default DOM Element setup when launching the browser
renderSelectOptions();
renderActivePosts(0);

// Add Laptops to select dropdown element 
function renderSelectOptions () {
    for (const laptopI in laptopsData) {
        let newOption = document.createElement("option");
        newOption.value = laptopsData[laptopI].id;
        newOption.text = laptopsData[laptopI].title;
        selectLaptopElement.add(newOption);
    }
}

// Logic for the Select button
selectLaptopElement.addEventListener("change", function () {
    let laptopId = Number(selectLaptopElement.options[selectLaptopElement.selectedIndex].value) - 1;
    renderActivePosts(laptopId);
});

// This function updates all the all the dom elements after the user have selected i laptop on the select button
function renderActivePosts(laptopId) {
    if (!isNaN(laptopId)) {
        laptopFeaturesElement.innerHTML = laptopsData[laptopId].specs;
        laptopHeadingDescriptionElement.innerHTML = laptopsData[laptopId].title 
        laptopDescriptionElement.innerHTML = laptopsData[laptopId].description;
        laptopPriceTextElement.innerHTML = laptopsData[laptopId].price;

        // Checks if the image link is valid, if not it switches file format
        let imgLink = `https://hickory-quilled-actress.glitch.me/${laptopsData[laptopId].image}`;
        laptopImgElement.src = imgLink;
        laptopImgElement.onerror = () => {
            laptopImgElement.src = imgLink.endsWith(".png") ? imgLink.replace(".png", ".jpg") : imgLink.replace(".jpg", ".png"); 
        }      
    }       
}



// TODO: clean this code upp and implement som the select html element select can select title and that title is pair to its id and specs!

// TODO: When the user select a laptop in the select window it should create object with the selected laptop info render it to the screen with function RenderSelectOption. SelectLaptopElement enables the user to select laptop and sends the id of the selected laptop to RenderSelectOption

// TODO: Integrate this function in the renderSelectOption!
// function testAPItoHtml (apiInfo) {
//     let dataInfo = ""; 
//     for (const element of apiInfo) {
//         dataInfo += element; 
//     }
//     return dataInfo;
// }
