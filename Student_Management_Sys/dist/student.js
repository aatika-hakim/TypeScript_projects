import chalk from "chalk";
export class Student {
    name;
    static nextStudentId = 1000;
    _studentId;
    balance = 0;
    courses = [];
    constructor(name) {
        this.name = name;
        this.generateStudentId();
    }
    generateStudentId() {
        this._studentId = `STD${Student.nextStudentId++}`;
    }
    get studentId() {
        return this._studentId;
    }
    enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        return this.balance;
    }
    addBalance(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(chalk.green(`$${amount} added to your balance. New balance: $${this.balance}`));
        }
        else {
            console.log(chalk.red("Invalid amount. Please enter a positive value."));
        }
    }
    payTuitionFee(amount) {
        if (amount > 0) {
            if (amount <= this.balance) {
                this.balance -= amount;
                console.log(chalk.green(`$${amount} paid for tuition. New balance: $${this.balance}`));
            }
            else {
                console.log(chalk.red("Insufficient balance. Please add more funds to your balance."));
            }
        }
        else {
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
    courseExists(course) {
        return this.courses.some((c) => c.getName() === course.getName());
    }
}
