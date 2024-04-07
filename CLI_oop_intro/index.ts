#! /usr/bin/env node
import inquirer from 'inquirer';

class Person {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

async function promptForPersonData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age:',
            validate: (input: string) => {
                const age = parseInt(input);
                if (isNaN(age)) {
                    return 'Please enter a valid age (a number).';
                }
                return true;
            },
        },
    ]);
}

async function main() {
    console.log('Welcome to the OOP TypeScript App!');

    const personData = await promptForPersonData();

    const person = new Person(personData.name, parseInt(personData.age));

    console.log('\nYour information:');
    person.sayHello();
}

main();
