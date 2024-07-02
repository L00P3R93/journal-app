import { DataType, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

interface JournalEntryAttributes {
    id: number;
    title: string;
    content: string;
    category: string;
    date: Date;
    userId: number;
}

interface JournalEntryCreationAttributes extends Optional<JournalEntryAttributes, 'id'> {}

class JournalEntry extends Model<JournalEntryAttributes, JournalEntryCreationAttributes> implements JournalEntryAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public category!: string;
    public date!: Date;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

JournalEntry.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'journalEntries',
    }
);

JournalEntry.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(JournalEntry, { foreignKey: 'userId' });

export default JournalEntry;