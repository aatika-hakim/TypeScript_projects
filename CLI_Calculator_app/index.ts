#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation'

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    console.log(chalk.redBright("Division by zero is not allowed."));
  }
  return a / b;
}

const sleep = () => {
  return new Promise((response) => {
      setTimeout(response, 1000)
  })
}

async function main() {
  let rainbowStyle = chalkAnimation.rainbow("\n -------------------o Welcome to Calculator App o------------------- \n")
    await sleep();
    rainbowStyle.stop();

  while (true) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'num1',
        message: chalk.yellowBright('Enter the first number:'),
        validate: (input) => {
          const isNumeric = parseFloat(input);
          return isNumeric ? true : 'Please enter a valid number.';
  }},
      {
        type: 'input',
        name: 'num2',
        message: chalk.yellowBright('Enter the second number:'),
        validate: (input) => {
          const isNumeric = parseFloat(input);
          return isNumeric ? true : 'Please enter a valid number.';
  }},
      {
        type: 'list',
        name: 'operation',
        message: chalk.yellow('Select an operation:'),
        choices: ['Add', 'Subtract', 'Multiply', 'Divide'],
      }
    ]);

    let result;
        const { num1, num2, operation } = answers;

        switch (operation){
      case 'Add':
        result = add(num1, num2);
        break;
      case 'Subtract':
        result = subtract(num1, num2);
        break;
      case 'Multiply':
        result = multiply(num1, num2);
        break;
      case 'Divide':
        result = divide(num1, num2);
        break;
      default:
        result = chalk.red('Invalid operation');
    }

    console.log(`Result: ${result}\n`);

    const newCalculation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: chalk.bold.green('Do you want to perform another calculation?'),
        default: false,
      }
    ])
    if (!newCalculation.continue) {
      console.log(chalk.italic.magenta('\n Thank you for using the calculator!'));
      break;
    }
  }
}

main();
