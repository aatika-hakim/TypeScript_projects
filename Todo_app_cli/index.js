import inquirer from "inquirer";
let todo = [];
let nextId = 1;
async function main() {
    let loop = true;
    while (loop) {
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Choose an action:",
                choices: ["Add task", "View tasks", "Update task", "Delete task", "Exit"],
            },
        ]);
        switch (answers.action) {
            case "Add task":
                await addTodo();
                break;
            case "View tasks":
                viewTodos();
                break;
            case "Update task":
                await updateTodo();
                break;
            case "Delete task":
                await deleteTodo();
                break;
            case "Exit":
                loop = false;
                console.log("Goodbye!");
                break;
        }
    }
}
async function addTodo() {
    const { task } = await inquirer.prompt([
        {
            type: "input",
            name: "task",
            message: "Enter a new task:",
        },
    ]);
    todo.push({ id: nextId++, task });
    console.log(`Added task: ${task}`);
}
function viewTodos() {
    if (todo.length === 0) {
        console.log("No todo found.");
    }
    else {
        console.log("Your Todo List:");
        todo.forEach((todo) => {
            console.log(`${todo.id}. ${todo.task}`);
        });
    }
}
async function updateTodo() {
    if (todo.length === 0) {
        console.log("No todo to update.");
        return;
    }
    const { taskId, newTask } = await inquirer.prompt([
        {
            type: "number",
            name: "taskId",
            message: "Enter the ID of the task you want to update:",
        },
        {
            type: "input",
            name: "newTask",
            message: "Enter the new task description:",
        },
    ]);
    const todoIndex = todo.findIndex((todo) => todo.id === taskId);
    if (todoIndex === -1) {
        console.log(`Task with ID ${taskId} not found.`);
    }
    else {
        todo[todoIndex].task = newTask;
        console.log(`Updated task ${taskId}: ${newTask}`);
    }
}
async function deleteTodo() {
    if (todo.length === 0) {
        console.log("No todo to delete.");
        return;
    }
    const { taskId } = await inquirer.prompt([
        {
            type: "number",
            name: "taskId",
            message: "Enter the ID of the task you want to delete:",
        },
    ]);
    const todoIndex = todo.findIndex((todo) => todo.id === taskId);
    if (todoIndex === -1) {
        console.log(`Task with ID ${taskId} not found.`);
    }
    else {
        const deletedTask = todo.splice(todoIndex, 1)[0];
        console.log(`Deleted task ${taskId}: ${deletedTask.task}`);
    }
}
main();
