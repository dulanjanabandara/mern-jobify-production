import { readFile } from "fs/promises";
import connectDB from "./db/connect.js";
import Job from "./models/Job.js";
import dotenv from "dotenv";

dotenv.config();

const start = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    );
    await connectDB(DB);
    // await Job.deleteMany();

    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    );
    await Job.create(jsonProducts);
    console.log("Success!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
