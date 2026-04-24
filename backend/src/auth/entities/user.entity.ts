// src/auth/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // Demo olduğu için düz metin

  @Column({
    type: 'text',
    default: UserRole.USER,
  })
  role: UserRole;
}