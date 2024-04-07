#! /usr/bin/env node

import inquirer from 'inquirer';

type Account = {
  accountNumber: number;
  userID: string;
  balance: number;
};

const accounts: Record<string, Account> = {};

// Create a new account
async function createAccount(): Promise<void> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'accountNumber',
      message: 'Enter Your Account Number:',
    },
    {
      type: 'input',
      name: 'userID',
      message: 'Enter Your Name:',
    },
  ]);

  const { accountNumber, userID } = answers;
  if (accounts[accountNumber]) {
    console.log('Account already exists with this account number.');
  } else {
    accounts[accountNumber] = { accountNumber, userID, balance: 0 };
    console.log(`Account created for ${userID} with account number ${accountNumber}.`);
  }
  showMainMenu();
}

// Deposit into an account
async function deposit(): Promise<void> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'accountNumber',
      message: 'Enter account number:',
    },
    {
      type: 'number',
      name: 'amount',
      message: 'Enter deposit amount:',
    },
  ]);

  const { accountNumber, amount } = answers;
  const account = accounts[accountNumber];
  if (!account) {
    console.log('Account does not exist.');
  } else if (amount <= 0) {
    console.log('Invalid amount for deposit.');
  } else {
    account.balance += amount;
    console.log(`Deposited $${amount} into account ${accountNumber}. New balance: $${account.balance}`);
  }
  showMainMenu();
}

// Withdraw amount
async function withdraw(): Promise<void> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'accountNumber',
      message: 'Enter account number:',
    },
    {
      type: 'number',
      name: 'amount',
      message: 'Enter withdrawal amount:',
    },
  ]);

  const { accountNumber, amount } = answers;
  const account = accounts[accountNumber];
  if (!account) {
    console.log('Account not exists.');
  } else if (amount <= 0 || amount > account.balance) {
    console.log('Invalid amount for withdrawal or insufficient balance.');
  } else {
    account.balance -= amount;
    console.log(`Withdrawn $${amount} from the account ${accountNumber}. New balance: $${account.balance}`);
  }
  showMainMenu();
}

// Check account balance
async function checkBalance(): Promise<void> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'accountNumber',
      message: 'Enter account number:',
    },
  ]);

  const { accountNumber } = answers;
  const account = accounts[accountNumber];
  if (!account) {
    console.log('Account does not exist.');
  } else {
    console.log(`Account balance for ${account.userID}: $${account.balance}`);
  }
  showMainMenu();
}

// Show the main menu
function showMainMenu(): void {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Choose an action:',
        choices: ['Create Account', 'Deposit', 'Withdraw', 'Check Balance', 'Exit'],
      },
    ])
    .then((answers) => {
      const { choice } = answers;
      switch (choice) {
        case 'Create Account':
          createAccount();
          break;
        case 'Deposit':
          deposit();
          break;
        case 'Withdraw':
          withdraw();
          break;
        case 'Check Balance':
          checkBalance();
          break;
        case 'Exit':
          console.log('Exiting App');
          process.exit(0);
          break;
        default:
          console.log('Invalid choice. Please select from given choices.');
          showMainMenu();
          break;
      }
    });
}

function startApp(): void {
  console.log('Welcome to MyBank Console App');
  showMainMenu();
}

startApp();
