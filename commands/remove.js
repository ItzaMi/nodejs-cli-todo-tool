import { input } from "@inquirer/prompts";
import { ObjectId } from "mongodb";
import chalk from "chalk";

import { Todo } from "../schemas/todo.js";
import { connect, disconnect } from "../db/connect.js";

export default async function remove() {
  try {
    console.log(chalk.blue("remove command is running!"));

    const answer = await input({
      message: "Which todo do you want to remove?",
    });

    await connect();

    if (!ObjectId.isValid(answer)) {
      console.log(chalk.red("Invalid id provdided"));
      await disconnect();
      return;
    }

    const objectId = new ObjectId(answer);

    const todo = await Todo.findOne({
      _id: objectId,
    });

    if (!todo) {
      console.log(chalk.red("Todo not found"));
      await disconnect();
      return;
    }

    await todo.deleteOne();

    await disconnect();

    console.log(chalk.green("Todo removed"));
  } catch (error) {
    console.error("Error removing todo");
    console.error(error);
  }
}
