#! /usr/bin/env node

import inquirer from "inquirer";

interface Answers {
    userId: string;
    userPin: number | string; 
    accountType: string;
    transactionType: string;
    amount: number;
}

async function Atm() {
    const answers: Answers = await inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: "Please enter your Id: ",
            validate: function (input) {
                return isValidUserId(input);
            },
        },
        {
            type: "password", 
            name: "userPin",
            message: "Please enter your pin: ",
            mask: "*", // Mask the PIN as the user types it for the security reasons
            validate: function (input) {
                return isValidUserPin(input);
            },
        },
        {
            type: "list",
            name: "accountType",
            choices: ["Current", "Saving"],
            message: "Select your account type: ",
        },
        {
            type: "list",
            name: "transactionType",
            choices: ["Fast Cash", "Withdraw"],
            message: "Please choose a transaction method: ",
            when(answers) {
                return answers.accountType;
            },
        },
        {
            type: "list",
            name: "amount",
            choices: ["500", "1000", "2000", "5000"],
            message: "Please choose an amount: ",
            when(answers) {
                return answers.transactionType === "Fast Cash";
            },
        },
        {
            type: "number",
            name: "amount",
            message: "Enter your amount: ",
            when(answers) {
                return answers.transactionType === "Withdraw";
            },
        },
    ]);

    if (answers.userId && answers.userPin) {

                const balance = Math.floor(Math.random() * 6000);
                console.log("Your current balance is: ", balance);
        
                if (answers.amount !== undefined) {
                    const enteredAmount = answers.amount;
                    const remainingAmount = balance - enteredAmount;
        
                    if (remainingAmount >= 0) {
                        console.log("Transaction successful. Your remaining balance is: ", remainingAmount);
                    } else {
                        console.log("Insufficient balance for this transaction.");
                    }
                }
            }
}

function isValidUserId(userId: string): boolean {
    console.log("  " + "Please enter a valid id")
    return userId !== "" && userId.length >= 4;
    
}

function isValidUserPin(userPin: string): boolean {
    console.log(" " + "Please enter a valid Pin")
    return /^\d{4}$/.test(userPin);
}

Atm();


