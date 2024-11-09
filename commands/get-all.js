import { Todo } from "../schemas/todo.js";
import { connect, disconnect } from "../db/connect.js";
import chalk from "chalk";

export default async function getAll() {
  try {
    console.log(chalk.blue("get all command is running!"));

    await connect();

    const list = await Todo.find();

    console.log(chalk.yellow("todos:"));
    list.forEach((todo) => {
      console.log(todo);
    });

    await disconnect();

    console.log(chalk.green("todos retrieved!"));
  } catch (error) {
    console.error(chalk.red("Error getting todos"));
    console.error(error);
  }
}
