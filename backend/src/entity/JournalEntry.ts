import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class JounalEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    category: string;

    @Column()
    date: Date

    @ManyToOne(() => User, (user) => user.id)
    user: User
}