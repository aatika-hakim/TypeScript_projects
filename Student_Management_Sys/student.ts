import chalk from "chalk";
import { Course } from "./course.js";


export class Student {
    private static nextStudentId: number = 1000;
    private _studentId!: string;
    private balance: number = 0;
    private courses: Course[] = [];

    constructor(private name: string) {
        this.generateStudentId();
    }

    private generateStudentId() {
        this._studentId = `STD${Student.nextStudentId++}`;
    }

    get studentId() {
        return this._studentId;
    }

    enroll(course: Course): void {
        this.courses.push(course);
    }

    viewBalance(): number {
        return this.balance;
    }

    addBalance(amount: number) {
        if (amount > 0) {
            this.balance += amount;
            console.log(chalk.green(`$${amount} added to your balance. New balance: $${this.balance}`));
        } else {
            console.log(chalk.red("Invalid amount. Please enter a positive value."));
        }
    }

    payTuitionFee(amount: number) {
        if (amount > 0) {
            if (amount <= this.balance) {
                this.balance -= amount;
                console.log(chalk.green(`$${amount} paid for tuition. New balance: $${this.balance}`));
            } else {
                console.log(chalk.red("Insufficient balance. Please add more funds to your balance."));
            }
        } else {
            console.log(chalk.red("Invalid amount. Please enter a positive value."));
        }
    }

    showStatus() {
        console.log(chalk.blue("Student Details:"));
        console.log(chalk.blue(`ID: ${this.studentId}`));
        console.log(chalk.blue(`Name: ${this.name}`));
        console.log(chalk.yellow("Courses Enrolled:"));
        this.courses.forEach((course) => console.log(chalk.yellow(`- ${course.getName()}`)));
        console.log(chalk.green(`Balance: $${this.balance}`));
    }

    courseExists(course: Course): boolean {
        return this.courses.some((c) => c.getName() === course.getName());
    }
}
