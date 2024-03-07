import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Partai } from "./entity/Partai";
import { Candidate } from "./entity/Candidate";
import { Vote } from "./entity/Vote";
import { Article } from "./entity/Article";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "kanul0",
  database: "micro_app",
  synchronize: true,
  logging: false,
  entities: [User, Partai, Candidate, Vote, Article],
  migrations: [],
  subscribers: [],
});
