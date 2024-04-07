#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const answers = await inquirer.prompt([
    {
        type: "input",
        name: "Sentences",
        message: chalk.magentaBright("Enter a sentence for count the words: ")
    }
]);
const wordsCount = answers.Sentences.trim().split(" ");
console.log(`Your words are ${wordsCount.length}`);
