#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

const SecretNum = Math.floor(Math.random() * 100) + 1;

const rainbow = chalkAnimation.rainbow('\n --------------- Welcome to Number Guess Game ---------------  \n');
rainbow.start();

function Game() {
    inquirer
        .prompt({
            type: 'input',
            name: 'guess',
            message: 'Guess the secret Number [1-100]: ',
            validate: (input) => {
                const number = parseInt(input);
                if (isNaN(number) || number < 1 || number > 100) {
                    return 'Please enter a number (1-100).';
                }
                return true;
            }
        })
        .then((answers) => {
            const userGuess = parseInt(answers.guess);

            if (userGuess === SecretNum) {
                console.log(chalk.green(`\nCongratulations! You have guessed the Secret Number ${SecretNum}.`));
            } else if (userGuess < SecretNum) {
                console.log(chalk.magenta('Try a higher number.'));
                Game();
            } else {
                console.log(chalk.magenta('Try a lower number.'));
                Game();
            }
        });
}

setTimeout(() => {
    rainbow.stop();
    Game();
}, 2000);
