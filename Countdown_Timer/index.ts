#! /usr/bin/env node

import inquirer from 'inquirer';

class CountdownTimer {
    private intervalId: NodeJS.Timeout | null = null;

    start(minutes: number): void {
        const seconds = minutes * 60;
        let remainingSeconds = seconds;

        this.displayTime(remainingSeconds);

        this.intervalId = setInterval(() => {
            remainingSeconds--;

            if (remainingSeconds < 0) {
                clearInterval(this.intervalId as NodeJS.Timeout);
                console.log("Countdown timer has finished!");
                process.exit(0);
            } else {
                this.displayTime(remainingSeconds);
            }
        }, 1000);
    }

    private displayTime(seconds: number): void {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`Time Remaining: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`);
    }
}

const timer = new CountdownTimer();
inquirer.prompt([
        {
            type: 'input',
            name: 'minutes',
            message: 'Enter the countdown time in minutes:',
            validate: (input) => {
                const minutes = parseInt(input, 10);
                if (isNaN(minutes) || minutes <= 0) {
                    return 'Invalid input. Please enter a valid number of minutes.';
                }
                return true;
            },
        },
    ])
    .then((answers) => {
        const minutes = parseInt(answers.minutes, 10);
        timer.start(minutes);
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });



