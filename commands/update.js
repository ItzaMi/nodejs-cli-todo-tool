import { input, select } from "@inquirer/prompts";
import { ObjectId } from "mongodb";
import chalk from "chalk";

import { Todo } from "../schemas/todo.js";
import { connect, disconnect } from "../db/connect.js";

export default async function update() {
  try {
    console.log(chalk.blue("update command is running!"));

    const answer = await input({
      message: "Which todo do you want to update?",
    });

    await connect();

    if (!ObjectId.isValid(answer)) {
      console.log(chalk.red("Invalid ObjectId"));
      await disconnect();
      return;
    }

    const objectId = new ObjectId(answer);

    const todo = await Todo.findOne({
      _id: objectId,
    });

    if (!todo) {
      console.log(chalk.red("Invalid ObjectId"));
      await disconnect();
      return;
    }

    const newStatus = await select({
      message: `Current status: ${todo.status}. What's the new status?`,
      choices: Todo.schema.path("status").enumValues,
    });

    await Todo.findOneAndUpdate(
      {
        _id: objectId,
      },
      {
        status: newStatus,
      },
      {
        new: true,
      }
    );

    await disconnect();

    console.log(chalk.green("Todo updated"));
  } catch (error) {
    console.error(chalk.red("Error updating todo"));
    console.error(error);
  }
}
