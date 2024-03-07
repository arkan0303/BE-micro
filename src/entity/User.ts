import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vote } from "./Vote";
import { Article } from "./Article";

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

  @Column()
  status: string;

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
