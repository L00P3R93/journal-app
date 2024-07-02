import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { JounalEntry } from "./entity/JournalEntry";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "journal_db",
    synchronize: true,
    logging: false,
    entities: [User, JounalEntry],
    migrations: [],
    subscribers: [],
})