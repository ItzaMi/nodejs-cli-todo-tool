import { input, select } from "@inquirer/prompts";
import chalk from "chalk";

import { Todo } from "../schemas/todo.js";
import { connect, disconnect } from "../db/connect.js";

export default async function create() {
  try {
    console.log("create command");
    console.log(chalk.blue("create command is running!"));

    const answers = {
      title: await input({ message: "What's the task?" }),
      status: await select({
        message: "What's the status?",
        choices: Todo.schema.path("status").enumValues,
      }),
    };

    await connect();

    const todo = new Todo(answers);

    await todo.save();

    await disconnect();

    console.log(chalk.green("todo created!"));
  } catch (error) {
    console.error(chalk.red("Error creating todos"));
    console.error(error);
  }
}
