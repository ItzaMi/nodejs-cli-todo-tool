#!/usr/bin/env node
import { Command } from "commander";

import create from "./commands/create.js";
import remove from "./commands/remove.js";
import getAll from "./commands/get-all.js";
import update from "./commands/update.js";

const program = new Command();

program
  .name("cli-todo")
  .description("To-do list in your cli!")
  .version("1.0.0");

program.command("create").description("Create a new todo.").action(create);
program.command("getAll").description("Reads all the todos.").action(getAll);
program.command("update").description("Updates a todo.").action(update);
program.command("remove").description("Removes a todo.").action(remove);
program.parse();
