#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

class TextAdventureGame {
    private inventory: string[];
    private currentLocation: string;

    constructor() {
        this.inventory = [];
        this.currentLocation = 'cave';
    }

    async start() {
        console.log(chalk.yellow("Welcome to the Text Adventure Game!"));
        console.log(chalk.yellow("You find yourself in a dark cave."));
        await this.promptUser();
    }

    private async promptUser() {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: `You are in the ${this.currentLocation}. What do you want to do?`,
                choices: [
                    'Look around',
                    'Go right',
                    'Go left',
                    'Check inventory',
                    'Quit',
                ],
            },
        ]);

        this.handleUserInput(answer.action.trim().toLowerCase());
    }

    private handleUserInput(input: string) {
        switch (input) {
            case "look around":
                this.lookAround();
                break;
            case "go right":
                this.goRight();
                break;
            case "go left":
                this.goLeft();
                break;
            case "check inventory":
                this.checkInventory();
                break;
            case "quit":
                this.quitGame();
                break;
            default:
                console.log(chalk.red("I don't understand that command."));
                this.promptUser();
                break;
        }
    }

    private lookAround() {
        switch (this.currentLocation) {
            case "cave":
                console.log(chalk.green("You see a glimmering light to your right."));
                console.log(chalk.green("You also hear a faint noise coming from the left."));
                this.randomEvent();
                break;
            case "forest":
                console.log(chalk.green("You are in a dense forest."));
                console.log(chalk.green("Tall trees surround you, and you hear birds chirping."));
                this.randomEvent();
                break;
            case "castle":
                console.log(chalk.green("You stand in front of an ancient castle."));
                console.log(chalk.green("The drawbridge is down, and the gate is open."));
                this.randomEvent();
                break;
            default:
                console.log(chalk.red("You are in an unknown location."));
                this.promptUser();
                break;
        }
    }

    private goRight() {
        switch (this.currentLocation) {
            case "cave":
                this.currentLocation = "castle";
                console.log(chalk.yellow("You follow the light and arrive at the castle."));
                break;
            default:
                console.log(chalk.red("You can't go right from here."));
                break;
        }
        this.promptUser();
    }

    private goLeft() {
        switch (this.currentLocation) {
            case "cave":
                console.log(chalk.cyan("You head left and discover a hidden passage."));
                this.currentLocation = "forest";
                break;
            default:
                console.log(chalk.red("You can't go left from here."));
                break;
        }
        this.promptUser();
    }

    private checkInventory() {
        console.log(chalk.blue("You check your inventory:"));
        if (this.inventory.length === 0) {
            console.log(chalk.blue("Your inventory is empty."));
        } else {
            this.inventory.forEach((item, index) => {
                console.log(chalk.blue(`${index + 1}. ${item}`));
            });
        }
        this.promptUser();
    }

    private randomEvent() {
        const events = [
            "A bat flies by, startling you.",
            "You hear distant footsteps echoing in the cave.",
            "A mysterious voice whispers your name.",
            "You find a shiny gem on the ground and add it to your inventory.",
            "A goblin suddenly appears and demands your valuables!",
        ];

        const randomIndex = Math.floor(Math.random() * events.length);
        const event = events[randomIndex];

        console.log(chalk.gray(event));

        if (event.includes("gem")) {
            this.inventory.push("Shiny Gem");
            console.log(chalk.blue("You added a Shiny Gem to your inventory!"));
        } else if (event.includes("goblin")) {
            console.log(chalk.red("The goblin looks menacing. What will you do?"));
            this.handleGoblinEncounter();
            return; // Prevent the promptUser() call after the encounter
        }

        this.promptUser();
    }

    private handleGoblinEncounter() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Choose your action:',
                    choices: [
                        'Give the goblin your valuables',
                        'Try to fight the goblin',
                        'Run away',
                    ],
                },
            ])
            .then((answer) => {
                switch (answer.action) {
                    case 'Give the goblin your valuables':
                        console.log(chalk.red("You hand over your valuables to the goblin, who nods and disappears."));
                        break;
                    case 'Try to fight the goblin':
                        console.log(chalk.red("You attempt to fight the goblin, but it overpowers you and takes your valuables."));
                        break;
                    case 'Run away':
                        console.log(chalk.green("You quickly turn and run away from the goblin."));
                        break;
                }
                this.promptUser();
            });
    }

    private quitGame() {
        inquirer
            .prompt([
                {
                    type: 'confirm',
                    name: 'quit',
                    message: 'Do you really want to quit the game?',
                    default: true,
                },
            ])
            .then((answer) => {
                if (answer.quit) {
                    console.log(chalk.yellow("Thank you for playing! Goodbye!"));
                    process.exit(0);
                } else {
                    // If the player chooses not to quit, resume the game.
                    this.promptUser();
                }
            });
    }
}

const game = new TextAdventureGame();
game.start();
