import sequelize from "../config/database";
import User from "./user";
import JournalEntry from "./journalEntry";

const initModels = async () => {
    await sequelize.sync({ force: false })
};

export {
    sequelize,
    User,
    JournalEntry,
    initModels
}