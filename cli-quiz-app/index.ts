#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

interface Question {
    questionText: string;
    choices: string[];
    correctAnswerIndex: number;
}

const quiz: Question[] = [
    {
        questionText: 'What does "TS" stand for in TypeScript?',
        choices: ['TypeScript', 'TypeSafe', 'TypeScriptScript', 'TypeScripting'],
        correctAnswerIndex: 0,
    },
    {
        questionText: 'Which keyword is used to define a variable in TypeScript?',
        choices: ['var', 'let', 'const', 'def'],
        correctAnswerIndex: 2,
    },
    {
        questionText: 'Which data type is used for a collection of values in TypeScript?',
        choices: ['Array', 'Object', 'String', 'Number'],
        correctAnswerIndex: 0,
    },
    {
        questionText: 'What is the purpose of TypeScript?',
        choices: [
            'To enhance JavaScript performance',
            'To add static types to JavaScript',
            'To remove JavaScript features',
            'To replace JavaScript entirely',
        ],
        correctAnswerIndex: 1,
    },
];

function getQuizQuestions(): Question[] {
    return quiz;
}

async function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main() {
    let rainbowStyle = chalkAnimation.rainbow("\n ------------------ Welcome To The Quiz App ------------------ \n");
    await sleep(1000); 
    rainbowStyle.stop();

    let restart = true;

    while (restart) {
        const quizQuestions = getQuizQuestions();
        let score = 0;

        for (const question of quizQuestions) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'userAnswer',
                    message: question.questionText,
                    choices: question.choices,
                },
            ]);

            const userAnswerIndex = question.choices.indexOf(answers.userAnswer);

            if (userAnswerIndex === question.correctAnswerIndex) {
                console.log(chalk.green('Correct!\n'));
                score++;
            } else {
                console.log(chalk.red(`Incorrect. The correct answer is: ${chalk.bold(question.choices[question.correctAnswerIndex])}\n`));
            }
        }

        console.log(chalk.blue(`Quiz completed! Your score: ${score}/${quizQuestions.length}`));

        const restartAnswer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'restart',
                message: 'Do you want to restart the quiz?',
                default: true,
            },
        ]);

        restart = restartAnswer.restart;

        if (restart) {
            console.log('Restarting the quiz! \n');
        }
    }

    console.log('Thanks for attempting the quiz.');
}

main();

