import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number; // ID único para la entidad

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

  @Column({ nullable: true, length: 1000 }) // Cambiar minlength y maxlength a length
  aboutCompany: string;

  @Column()
  timeAttention: string;

  @Column()
  focus: string;

  @BeforeInsert() // Hook para encriptar la contraseña antes de insertar
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
} 