import fetchComputers from "./fetchComputers";
import computerView from "./computerView";

// Declaring: Get Loan section dom objects 
const btnLoanElement = document.getElementById("btn-loan");
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

// initializing variables
let maxLoanLimit;
let workBalance = 0;
let paybackAmount = 0;
const salaryAmount = 100;

// Setting initial values for balances
bankBalanceElement.textContent = 0;
salaryBalanceElement.textContent = 0;

// API logic
const initialComputers = await fetchComputers();
computerView.setPost(initialComputers);
const laptopsData = computerView.getPosts();

// Default DOM Element setup when launching the browser
renderSelectOptions();
renderActivePosts(0);

/* Functions*/
// This function shows/hides the repay button and loan balance text
function toggleDomElements(toggleMode) {
    if (toggleMode === "hide") {
        loanTextElement.classList.add("hidden");
        btnPayLoanElement.classList.add("hidden");
    }
    else if (toggleMode === "add") {
        loanTextElement.classList.remove("hidden");
        btnPayLoanElement.classList.remove("hidden");
    }
}

// This function add Laptops to the select dropdown element 
function renderSelectOptions() {
    for (const laptopI in laptopsData) {
        let newOption = document.createElement("option");
        newOption.value = laptopsData[laptopI].id;
        newOption.text = laptopsData[laptopI].title;
        selectLaptopElement.add(newOption);
    }
}

//This function creating the list items elements, to display features about the selected laptop 
function createLaptopFeatureSection(laptopId) {
    laptopsData[laptopId].specs.forEach(element => {
        let newListElement = document.createElement("li");
        newListElement.innerHTML = element;
        laptopFeaturesElement.appendChild(newListElement);
    });
}

// This function updates all the all the dom elements after the user have selected i laptop on the select button
function renderActivePosts(laptopId) {
    if (!isNaN(laptopId)) {
        // Reset the list of features
        laptopFeaturesElement.innerHTML = ""
        createLaptopFeatureSection(laptopId);
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

/* EventListeners */
// Get loan button logic
btnLoanElement.addEventListener("click", function () {
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
        while (validAmount) {
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
        if (Number(loanBalanceElement.textContent) !== 0)
            toggleDomElements("add");
    }
});

// Work button logic
btnWorkElement.addEventListener("click", function () {
    workBalance += salaryAmount;
    salaryBalanceElement.textContent = Number(salaryBalanceElement.textContent) + salaryAmount;
});

// Bank button logic
btnBankElement.addEventListener("click", function () {
    // check if user have a loan
    if (loanBalanceElement.textContent !== 0) {
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
    if (loanBalanceElement.textContent !== 0) {
        // Update DOM
        salaryBalanceElement.textContent = 0;

        // if the payback amount is larger then the loan amount the rest goes to balance!
        if (workBalance > Number(loanBalanceElement.textContent)) {
            bankBalanceElement.textContent = Number(bankBalanceElement.textContent) + (workBalance - Number(loanBalanceElement.textContent));
            loanBalanceElement.textContent = 0
        }
        else {
            loanBalanceElement.textContent = Number(loanBalanceElement.textContent) - workBalance;
        }
        // Reset variables
        workBalance = 0;
    }

    // hide Loan balance and repay button
    if (Number(loanBalanceElement.textContent) === 0)
        toggleDomElements("hide");

});

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

// Logic for the Select button
selectLaptopElement.addEventListener("change", function () {
    let laptopId = Number(selectLaptopElement.options[selectLaptopElement.selectedIndex].value) - 1;
    renderActivePosts(laptopId);
});
