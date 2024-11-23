import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
export class CompanySchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  contact: string;

  @Column({ unique: true })
  ceo: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  employees: number;

  @Column({ nullable: true, length: 1000 })
  aboutCompany: string;

  @Column()
  timeAttention: string;

  @Column()
  focus: string;

  @Column()
  logo: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}