import dotenv from "dotenv";
import mongoose from "mongoose";
import chalk from "chalk";

dotenv.config();

export async function connect() {
  try {
    console.log(chalk.magenta("--- Connecting to MongoDB ---"));
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green("Connected to MongoDB"));
  } catch (error) {
    console.error(`${chalk.red("Error connecting to MongoDB")} - ${error}`);
  }
}

export async function disconnect() {
  try {
    console.log(chalk.magenta("--- Disconnecting from MongoDB ---"));
    await mongoose.disconnect();
    console.log(chalk.green("Disconnected from MongoDB"));
  } catch (error) {
    console.error(
      `${chalk.red("Error disconnecting from MongoDB")} - ${error}`
    );
  }
}
