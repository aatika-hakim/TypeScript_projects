#! /usr/bin/env node 

import inquirer from "inquirer";
import { Course } from "./course.js";
import { Student } from "./student.js";
import chalk from "chalk";

const courses: Course[] = [];
const students: Student[] = [];

function addStudent() { inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: (chalk.yellow("Enter student Name:")),
            },
        ])
        .then((answers) => {
            const student = new Student(answers.name);
            students.push(student);
            console.log(chalk.green(`Student added. ID: ${student.studentId}`));
            showMenu();
        });
}

function enrollStudent() {
    inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Enter student ID:",
            },
            {
                type: "list",
                name: "courseName",
                message: "Select a course to enroll:",
                choices: courses.map((course) => course.getName()),
            },
        ])
        .then((answers) => {
            const student = students.find((s) => s.studentId === answers.id);
            if (student) {
                const selectedCourse = courses.find((course) => course.getName() === answers.courseName);
                if (selectedCourse) {
                    if (!student.courseExists(selectedCourse)) {
                        student.enroll(selectedCourse);
                        console.log(chalk.green(`Enrolled in ${answers.courseName}`));
                    } else {
                        console.log(chalk.yellow(`Already enrolled in ${answers.courseName}`));
                    }
                } else {
                    console.log(chalk.red("Course not found."));
                }
            } else {
                console.log(chalk.red("Student not found."));
            }
            showMenu();
        });
}

function viewStudentStatus() {
    inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Enter student ID:",
            },
        ])
        .then((answers) => {
            const student = students.find((s) => s.studentId === answers.id);
            if (student) {
                student.showStatus();
            } else {
                console.log(chalk.red("Student not found."));
            }
            showMenu();
        });
}

function addBalance() {
    inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Enter student ID:",
            },
            {
                type: "input",
                name: "amount",
                message: "Enter the amount to add to your balance:",
            },
        ])
        .then((answers) => {
            const student = students.find((s) => s.studentId === answers.id);
            if (student) {
                student.addBalance(parseFloat(answers.amount));
            } else {
                console.log(chalk.red("Student not found."));
            }
            showMenu();
        });
}

function payTuitionFee() {
    inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Enter student ID:",
            },
            {
                type: "input",
                name: "amount",
                message: "Enter the amount to pay for tuition:",
            },
        ])
        .then((answers) => {
            const student = students.find((s) => s.studentId === answers.id);
            if (student) {
                student.payTuitionFee(parseFloat(answers.amount));
            } else {
                console.log(chalk.red("Student not found."));
            }
            showMenu();
        });
}

function showMenu() {
    inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Menu:",
                choices: ["Add Student", "Enroll Student", "View Student Status", "Add Balance", "Pay Tuition", "Quit"],
            },
        ])
        .then((answers) => {
            switch (answers.choice) {
                case "Add Student":
                    addStudent();
                    break;
                case "Enroll Student":
                    enrollStudent();
                    break;
                case "View Student Status":
                    viewStudentStatus();
                    break;
                case "Add Balance":
                    addBalance();
                    break;
                case "Pay Tuition":
                    payTuitionFee();
                    break;
                case "Quit":
                    break;
                default:
                    console.log(chalk.red("Invalid choice. Try again."));
                    showMenu();
                    break;
            }
        });
}

courses.push(new Course("Math"));
courses.push(new Course("Computer Science"));
courses.push(new Course("History"));
courses.push(new Course("Physics"));
courses.push(new Course("Psychology"));
courses.push(new Course("Biology"));

console.log(chalk.blue("Welcome to the Student Management System!"));
showMenu();
