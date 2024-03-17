import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vote } from "./Vote";
import { Article } from "./Article";

export enum UserStatus {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  alamat: string;

  @Column()
  jenisKelamin: string;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.USER }) // Gunakan enum di sini
  status: UserStatus;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany((type) => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => Article, (article) => article.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  article: Article[];
}
