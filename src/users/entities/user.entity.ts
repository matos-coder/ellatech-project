import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid') // Auto-incrementing primary key, uses UUID
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;
}
